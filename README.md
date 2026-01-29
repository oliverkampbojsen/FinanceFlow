# FinanceFlow

A modern financial tracking platform that connects all your income and expense sources in one place. Track bank accounts, payment platforms, and get real-time insights into your financial health.

## Features

- **Multi-Account Management** - Connect and manage multiple bank accounts, credit cards, and payment platforms
- **Automatic Transaction Sync** - Automatically import transactions from connected accounts via Plaid and Stripe
- **Visual Analytics** - View income vs expenses trends, category breakdowns, and spending patterns with interactive charts
- **Real-time Dashboard** - Get an overview of your total balance, monthly income, expenses, and savings rate
- **Secure Authentication** - Protected by Clerk authentication with support for multiple sign-in methods
- **Category Tracking** - Automatically categorize transactions and track spending by category

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Integrations**:
  - Plaid for bank account connections
  - Stripe for payment tracking
- **Charts**: Recharts
- **Styling**: Tailwind CSS with custom theming

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Accounts for:
  - [Clerk](https://clerk.com) (authentication)
  - [Supabase](https://supabase.com) (database)
  - [Plaid](https://plaid.com) (bank connections)
  - [Stripe](https://stripe.com) (payment tracking)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables by copying `.env.local` and adding your keys:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
PLAID_CLIENT_ID=
PLAID_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

3. Set up your Supabase database by running the SQL in `supabase-schema.sql`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard page
│   │   ├── accounts/         # Accounts management
│   │   ├── transactions/     # Transaction list
│   │   ├── analytics/        # Charts and analytics
│   │   └── integrations/     # Connect services
│   ├── api/                  # API routes
│   │   ├── plaid/           # Plaid integration endpoints
│   │   └── stripe/          # Stripe integration endpoints
│   ├── layout.tsx           # Root layout with Clerk provider
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── dashboard-nav.tsx    # Dashboard navigation
├── lib/
│   ├── supabase.ts         # Supabase client and types
│   └── utils.ts            # Utility functions
└── middleware.ts           # Clerk authentication middleware
```

## Pages

- `/` - Landing page with feature overview
- `/dashboard` - Main dashboard with financial overview
- `/accounts` - View and manage connected accounts
- `/transactions` - Complete transaction history with filtering
- `/analytics` - Visual charts and spending insights
- `/integrations` - Connect and manage Plaid, Stripe, and other services

## API Routes

### Plaid
- `POST /api/plaid/create-link-token` - Generate Plaid Link token
- `POST /api/plaid/exchange-token` - Exchange public token for access token
- `POST /api/plaid/sync-transactions` - Sync bank transactions

### Stripe
- `POST /api/stripe/connect` - Connect Stripe account
- `POST /api/stripe/sync-transactions` - Sync Stripe payments

## Database Schema

See `supabase-schema.sql` for the complete database structure including:
- `accounts` - Connected financial accounts
- `transactions` - Income and expense records
- `integrations` - API tokens and connection details

## Setup Guide

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## Development

The app uses:
- TypeScript for type safety
- Tailwind CSS for styling
- Server Components by default
- Client Components where needed (marked with 'use client')

## Security

- All routes under `/dashboard` are protected by Clerk authentication
- Database access controlled by Supabase Row Level Security (RLS)
- API keys and secrets stored in environment variables
- Plaid and Stripe use secure OAuth flows

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
