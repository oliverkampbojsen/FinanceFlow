# FinanceFlow Setup Guide

Welcome to FinanceFlow! This guide will help you set up your financial tracking platform.

## What You've Built

A complete financial dashboard that allows users to:
- Connect bank accounts via Plaid
- Link Stripe for payment tracking
- View all transactions in one place
- Analyze income vs expenses with charts
- Manage multiple financial accounts
- Automatic transaction syncing

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui with Tailwind CSS
- **Integrations**: Plaid (banking), Stripe (payments)
- **Charts**: Recharts

## Setup Steps

### 1. Understanding Environment Variables (.env.local file)

Your API keys need to go in a special file called `.env.local`. This file is already created in your project folder. Here's how to edit it:

**Step-by-step:**
1. In VSCode, look at the left sidebar (file explorer)
2. Find the file named `.env.local` in the root folder (same level as README.md)
3. Click on it to open it
4. You'll see lines that look like: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here`
5. Replace the text after the `=` sign with your actual keys (no quotes needed!)

**IMPORTANT RULES:**
- No spaces around the `=` sign
- No quotes around the values
- Each key on its own line
- Never share this file or commit it to git (it's already in .gitignore)

### 2. Set Up Clerk Authentication (User Login System)

**What is Clerk?** It handles user sign-up, login, and authentication for your app.

**Steps:**
1. Go to [clerk.com](https://clerk.com) in your browser
2. Click "Sign Up" and create a free account
3. Once logged in, click "Create Application"
4. Give it a name like "FinanceFlow"
5. Choose how users can sign in (Email is easiest to start)
6. Click "Create Application"

**Getting Your Keys:**
1. After creating the app, you'll see a "Quick Start" page
2. Look for a section showing your API keys
3. You'll see two keys:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)

**Adding Keys to Your Project:**
1. Open the `.env.local` file in VSCode
2. Find this line: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here`
3. Replace `your_clerk_publishable_key_here` with your actual publishable key
4. Find this line: `CLERK_SECRET_KEY=your_clerk_secret_key_here`
5. Replace `your_clerk_secret_key_here` with your actual secret key

**Example (with fake keys):**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abc123xyz789example
CLERK_SECRET_KEY=sk_test_def456uvw012example
```

**SAVE THE FILE!** (Cmd+S on Mac, Ctrl+S on Windows)

### 3. Set Up Supabase Database

**What is Supabase?** It's your database where all account and transaction data is stored.

**Steps:**
1. Go to [supabase.com](https://supabase.com) in your browser
2. Click "Start your project" and sign up (you can use GitHub to sign in)
3. Click "New Project"
4. Fill in:
   - **Name**: FinanceFlow (or any name you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose one closest to you
   - **Pricing Plan**: Free tier is perfect to start
5. Click "Create new project"
6. Wait 2-3 minutes while it sets up

**Getting Your Keys:**
1. Once the project is ready, click on "Settings" (gear icon in the sidebar)
2. Click on "API" in the Settings menu
3. You'll see:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

**Adding Keys to Your Project:**
1. Open `.env.local` in VSCode
2. Find: `NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here`
3. Replace with your Project URL
4. Find: `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here`
5. Replace with your anon public key

**Example (with fake keys):**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example...
```

**Creating Your Database Tables:**
1. In Supabase, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. In VSCode, open the file `supabase-schema.sql`
4. Copy ALL the text from that file (Cmd+A then Cmd+C)
5. Go back to Supabase and paste it in the SQL Editor
6. Click "Run" at the bottom
7. You should see "Success. No rows returned" - that's good!

**SAVE THE .env.local FILE!**

### 4. Set Up Plaid Integration (Bank Connections)

**What is Plaid?** It lets users securely connect their bank accounts to your app.

**Steps:**
1. Go to [plaid.com](https://plaid.com) in your browser
2. Click "Get API Keys" in the top right
3. Fill out the sign-up form (use your real email)
4. For "Company name": put "FinanceFlow" or your name
5. Select "I'm an individual" if you're building this for yourself
6. Complete the sign-up

**Getting Your Keys:**
1. After signing up, you'll see the Dashboard
2. On the left sidebar, click "Team Settings" then "Keys"
3. You'll see:
   - **client_id** (looks like: 5f8a9b2c3d4e...)
   - **sandbox secret** (looks like: 6a7b8c9d0e1f...)

**Adding Keys to Your Project:**
1. Open `.env.local` in VSCode
2. Find: `PLAID_CLIENT_ID=your_plaid_client_id_here`
3. Replace with your client_id
4. Find: `PLAID_SECRET=your_plaid_secret_here`
5. Replace with your sandbox secret
6. Find: `PLAID_ENV=sandbox`
7. This line is already correct! Leave it as "sandbox"

**Example (with fake keys):**
```
PLAID_CLIENT_ID=5f8a9b2c3d4e5f6a7b8c9d0e
PLAID_SECRET=6a7b8c9d0e1f2a3b4c5d6e7f
PLAID_ENV=sandbox
```

**NOTE:** "sandbox" means test mode - you can test with fake bank accounts. Don't worry about production mode yet!

**SAVE THE .env.local FILE!**

### 5. Set Up Stripe Integration (Payment Tracking)

**What is Stripe?** If you accept payments online, Stripe can be connected to track that income.

**Steps:**
1. Go to [stripe.com](https://stripe.com) in your browser
2. Click "Sign in" (or "Start now" if new)
3. Create an account with your email
4. Fill in your business details (you can skip some parts for testing)
5. You'll land on the Stripe Dashboard

**Getting Your Keys:**
1. In the top right corner, make sure you see "Test mode" toggle - turn it ON (should show a "TEST MODE" banner)
2. Click on "Developers" in the top right
3. Click "API keys" in the menu
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - click "Reveal test key" to see it

**Adding Keys to Your Project:**
1. Open `.env.local` in VSCode
2. Find: `STRIPE_SECRET_KEY=your_stripe_secret_key_here`
3. Replace with your Secret key
4. Find: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here`
5. Replace with your Publishable key

**Example (with fake keys):**
```
STRIPE_SECRET_KEY=sk_test_51Abc123def456GhI789jkl012Mno345pqr678Stu901vwx234Yz567
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc123def456GhI789jkl012Mno345pqr678
```

**SAVE THE .env.local FILE!**

### 6. Final Check - Your .env.local File

After adding all keys, your `.env.local` file should look something like this (with YOUR actual keys):

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abc123xyz789
CLERK_SECRET_KEY=sk_test_def456uvw012
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example...
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Plaid
PLAID_CLIENT_ID=5f8a9b2c3d4e5f6a7b8c9d0e
PLAID_SECRET=6a7b8c9d0e1f2a3b4c5d6e7f
PLAID_ENV=sandbox

# Stripe
STRIPE_SECRET_KEY=sk_test_51Abc123def456...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc123def456...
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

**Lines you can ignore for now:**
- `SUPABASE_SERVICE_ROLE_KEY` - only needed for admin operations
- `STRIPE_WEBHOOK_SECRET` - only needed for real-time Stripe events

### 7. Restart Your Development Server

**IMPORTANT:** After changing `.env.local`, you MUST restart the server!

1. In VSCode, look at the bottom panel (Terminal)
2. Press `Ctrl+C` (or `Cmd+C` on Mac) to stop the current server
3. Wait for it to stop (you'll see the command prompt again)
4. Type: `npm run dev` and press Enter
5. Wait for "✓ Ready" message

**If you see errors about missing modules:**
```bash
npm install
```
Then try `npm run dev` again.

### 8. Test Your App!

Visit [http://localhost:3000](http://localhost:3000) in your browser.

**What you should see:**
1. A landing page with "FinanceFlow" branding
2. "Sign In" and "Get Started" buttons (from Clerk)
3. Click "Get Started" to test sign-up
4. Create a test account
5. You should be redirected to the dashboard!

**Common Issues:**

**"Module not found" errors:**
- Solution: Run `npm install` in the terminal

**"Invalid API key" from Clerk:**
- Solution: Double-check your Clerk keys in `.env.local` have no extra spaces
- Make sure you saved the file
- Restart the dev server

**White screen or nothing loads:**
- Solution: Check the terminal for error messages
- Make sure `.env.local` has all required keys
- Try refreshing the browser (Cmd+Shift+R or Ctrl+Shift+R)

## Features Overview

### Dashboard (`/dashboard`)
- Overview of total balance, income, expenses, and net income
- Recent transactions summary
- Connected accounts display

### Accounts (`/accounts`)
- View all connected financial accounts
- See individual account balances
- Add new accounts
- Sync account data

### Transactions (`/transactions`)
- Complete list of all transactions
- Filter by type (income/expense), category, date
- Add manual transactions
- Import from connected accounts

### Analytics (`/analytics`)
- Income vs Expenses trend chart
- Expense breakdown by category (pie chart)
- Income sources visualization (bar chart)
- Savings rate calculation

### Integrations (`/integrations`)
- Connect Plaid for bank account linking
- Connect Stripe for payment tracking
- Manage connected services
- Auto-sync transactions

## API Routes Created

- **Plaid**:
  - `POST /api/plaid/create-link-token` - Create Plaid Link token
  - `POST /api/plaid/exchange-token` - Exchange public token for access token
  - `POST /api/plaid/sync-transactions` - Sync bank transactions

- **Stripe**:
  - `POST /api/stripe/connect` - Connect Stripe account
  - `POST /api/stripe/sync-transactions` - Sync Stripe payments

## Database Schema

Three main tables:

1. **accounts** - Stores connected financial accounts
2. **transactions** - Stores all income and expense transactions
3. **integrations** - Stores API tokens for Plaid, Stripe, etc.

See `supabase-schema.sql` for complete schema definition.

## Next Steps

1. **Configure Clerk**: Set up your authentication flow
2. **Set up Supabase**: Run the schema SQL and configure RLS
3. **Add Plaid credentials**: Get sandbox keys for testing
4. **Test integrations**: Connect a test bank account via Plaid
5. **Customize**: Update branding, colors, and copy to match your vision

## Development Tips

- Use sandbox mode for Plaid during development
- Stripe test mode is already enabled by default
- Mock data is currently displayed - replace with real Supabase queries
- All routes under `/dashboard` are protected by Clerk authentication

## Production Checklist

Before deploying to production:

- [ ] Update Plaid from sandbox to production environment
- [ ] Add proper error handling and logging
- [ ] Set up Stripe webhooks for real-time updates
- [ ] Configure proper RLS policies in Supabase
- [ ] Add rate limiting to API routes
- [ ] Set up monitoring and alerting
- [ ] Add data backup strategy
- [ ] Review security settings in Clerk and Supabase

## Support

For questions or issues:
- Plaid: [plaid.com/docs](https://plaid.com/docs)
- Stripe: [stripe.com/docs](https://stripe.com/docs)
- Clerk: [clerk.com/docs](https://clerk.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

Happy building! 🚀
