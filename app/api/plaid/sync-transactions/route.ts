import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { supabase } from '@/lib/supabase';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all Plaid integrations for this user
    const { data: integrations, error: integrationsError } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'plaid')
      .eq('is_active', true);

    if (integrationsError || !integrations) {
      return NextResponse.json(
        { error: 'Failed to fetch integrations' },
        { status: 500 }
      );
    }

    let totalTransactionsSynced = 0;

    for (const integration of integrations) {
      // Get transactions from Plaid
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const transactionsResponse = await plaidClient.transactionsGet({
        access_token: integration.access_token,
        start_date: thirtyDaysAgo.toISOString().split('T')[0],
        end_date: now.toISOString().split('T')[0],
      });

      // Get account mappings
      const { data: accounts } = await supabase
        .from('accounts')
        .select('id, plaid_account_id')
        .eq('user_id', userId);

      const accountMap = new Map(
        accounts?.map((acc) => [acc.plaid_account_id, acc.id]) || []
      );

      // Store transactions in Supabase
      for (const transaction of transactionsResponse.data.transactions) {
        const accountId = accountMap.get(transaction.account_id);

        if (!accountId) continue;

        // Check if transaction already exists
        const { data: existing } = await supabase
          .from('transactions')
          .select('id')
          .eq('plaid_transaction_id', transaction.transaction_id)
          .single();

        if (!existing) {
          await supabase.from('transactions').insert({
            user_id: userId,
            account_id: accountId,
            type: transaction.amount > 0 ? 'expense' : 'income',
            amount: Math.abs(transaction.amount),
            currency: transaction.iso_currency_code || 'USD',
            category: transaction.category?.[0] || 'Other',
            description: transaction.name,
            date: transaction.date,
            plaid_transaction_id: transaction.transaction_id,
          });

          totalTransactionsSynced++;
        }
      }

      // Update last synced timestamp
      await supabase
        .from('integrations')
        .update({ last_synced: new Date().toISOString() })
        .eq('id', integration.id);
    }

    return NextResponse.json({
      success: true,
      transactionsSynced: totalTransactionsSynced,
    });
  } catch (error) {
    console.error('Error syncing Plaid transactions:', error);
    return NextResponse.json(
      { error: 'Failed to sync transactions' },
      { status: 500 }
    );
  }
}
