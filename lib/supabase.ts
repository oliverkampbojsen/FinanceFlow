import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Export a function to create a new client (for client-side usage)
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'bank' | 'credit_card' | 'cash' | 'investment' | 'stripe' | 'paypal';
          institution: string | null;
          plaid_account_id: string | null;
          stripe_account_id: string | null;
          balance: number;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['accounts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['accounts']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          account_id: string;
          type: 'income' | 'expense';
          amount: number;
          currency: string;
          category: string;
          description: string;
          date: string;
          plaid_transaction_id: string | null;
          stripe_transaction_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
      integrations: {
        Row: {
          id: string;
          user_id: string;
          provider: 'plaid' | 'stripe' | 'paypal';
          access_token: string;
          metadata: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['integrations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['integrations']['Insert']>;
      };
    };
  };
};
