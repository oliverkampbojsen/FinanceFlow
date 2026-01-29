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

    const { public_token, metadata } = await req.json();

    // Exchange public token for access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // Store the access token in Supabase
    const { error: integrationError } = await supabase
      .from('integrations')
      .insert({
        user_id: userId,
        provider: 'plaid',
        access_token: accessToken,
        metadata: { item_id: itemId },
      });

    if (integrationError) {
      console.error('Error saving integration:', integrationError);
      return NextResponse.json(
        { error: 'Failed to save integration' },
        { status: 500 }
      );
    }

    // Get account information
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    // Store accounts in Supabase
    for (const account of accountsResponse.data.accounts) {
      await supabase.from('accounts').insert({
        user_id: userId,
        name: account.name,
        type: account.type === 'credit' ? 'credit_card' : 'bank',
        institution: accountsResponse.data.item.institution_id || null,
        plaid_account_id: account.account_id,
        balance: account.balances.current || 0,
        currency: account.balances.iso_currency_code || 'USD',
      });
    }

    return NextResponse.json({
      success: true,
      accountsCount: accountsResponse.data.accounts.length,
    });
  } catch (error) {
    console.error('Error exchanging Plaid token:', error);
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    );
  }
}
