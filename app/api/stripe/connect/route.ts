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

    // In a real implementation, you would use Stripe Connect OAuth
    // For now, we'll simulate saving the Stripe account with a placeholder token
    const simulatedAccountId = `acct_${Date.now()}`;

    const { error: integrationError } = await supabase
      .from('integrations')
      .insert({
        user_id: userId,
        provider: 'stripe',
        access_token: simulatedAccountId,
        metadata: {},
      });

    if (integrationError) {
      return NextResponse.json(
        { error: 'Failed to save integration' },
        { status: 500 }
      );
    }

    // Create an account entry for Stripe
    const { error: accountError } = await supabase.from('accounts').insert({
      user_id: userId,
      name: 'Stripe Account',
      type: 'stripe',
      institution: 'Stripe',
      balance: 0,
      currency: 'USD',
    });

    if (accountError) {
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error connecting Stripe:', error);
    return NextResponse.json(
      { error: 'Failed to connect Stripe' },
      { status: 500 }
    );
  }
}
