import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Stripe integration for this user
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'stripe')
      .eq('is_active', true)
      .single();

    if (integrationError || !integration) {
      return NextResponse.json(
        { error: 'Stripe not connected' },
        { status: 400 }
      );
    }

    // Get Stripe account from database
    const { data: account } = await supabase
      .from('accounts')
      .select('id, stripe_account_id')
      .eq('user_id', userId)
      .eq('type', 'stripe')
      .single();

    if (!account) {
      return NextResponse.json(
        { error: 'Stripe account not found' },
        { status: 404 }
      );
    }

    // Fetch charges from Stripe (last 30 days)
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

    const charges = await stripe.charges.list({
      created: { gte: thirtyDaysAgo },
      limit: 100,
    });

    let transactionsSynced = 0;

    for (const charge of charges.data) {
      if (charge.status !== 'succeeded') continue;

      // Check if transaction already exists
      const { data: existing } = await supabase
        .from('transactions')
        .select('id')
        .eq('stripe_transaction_id', charge.id)
        .single();

      if (!existing) {
        await supabase.from('transactions').insert({
          user_id: userId,
          account_id: account.id,
          type: 'income',
          amount: charge.amount / 100, // Convert from cents
          currency: charge.currency.toUpperCase(),
          category: 'Payment',
          description: charge.description || `Stripe Charge ${charge.id}`,
          date: new Date(charge.created * 1000).toISOString().split('T')[0],
          stripe_transaction_id: charge.id,
        });

        transactionsSynced++;
      }
    }

    // Update account balance
    const balance = await stripe.balance.retrieve();
    const availableBalance = balance.available[0]?.amount || 0;

    await supabase
      .from('accounts')
      .update({ balance: availableBalance / 100 })
      .eq('id', account.id);

    // Update last synced timestamp
    await supabase
      .from('integrations')
      .update({ last_synced: new Date().toISOString() })
      .eq('id', integration.id);

    return NextResponse.json({
      success: true,
      transactionsSynced,
    });
  } catch (error) {
    console.error('Error syncing Stripe transactions:', error);
    return NextResponse.json(
      { error: 'Failed to sync transactions' },
      { status: 500 }
    );
  }
}
