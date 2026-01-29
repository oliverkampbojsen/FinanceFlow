# Setup Checklist

Copy this checklist and check off each item as you complete it!

## Phase 1: Essential Setup (Required to use the app)

### ☐ Step 1: Set Up Clerk (Authentication)
- [ ] Go to [clerk.com](https://clerk.com) and create an account
- [ ] Click "Create Application"
- [ ] Name it "FinanceFlow"
- [ ] Copy the **Publishable Key** (starts with `pk_test_`)
- [ ] Copy the **Secret Key** (starts with `sk_test_`)
- [ ] Open `.env.local` in VSCode
- [ ] Replace `your_clerk_publishable_key_here` with your Publishable Key
- [ ] Replace `your_clerk_secret_key_here` with your Secret Key
- [ ] Save the file (Cmd+S or Ctrl+S)

### ☐ Step 2: Set Up Supabase (Database)
- [ ] Go to [supabase.com](https://supabase.com) and create an account
- [ ] Click "New Project"
- [ ] Name it "FinanceFlow"
- [ ] Create a database password (SAVE IT SOMEWHERE!)
- [ ] Wait 2-3 minutes for setup
- [ ] Go to Settings → API
- [ ] Copy the **Project URL** (starts with `https://`)
- [ ] Copy the **anon public** key (long string starting with `eyJ`)
- [ ] Open `.env.local` in VSCode
- [ ] Replace `your_supabase_url_here` with your Project URL
- [ ] Replace `your_supabase_anon_key_here` with your anon key
- [ ] Save the file

### ☐ Step 3: Create Database Tables
- [ ] In Supabase, click "SQL Editor" in the left sidebar
- [ ] Click "New Query"
- [ ] In VSCode, open `supabase-schema.sql`
- [ ] Copy ALL the text from that file (Cmd+A then Cmd+C)
- [ ] Paste it in Supabase SQL Editor
- [ ] Click "Run" button
- [ ] Verify you see "Success. No rows returned"

### ☐ Step 4: Restart Your Dev Server
- [ ] In VSCode, find the Terminal at the bottom
- [ ] Press Ctrl+C (or Cmd+C on Mac) to stop the server
- [ ] Type `npm run dev` and press Enter
- [ ] Wait for "✓ Ready" message

### ☐ Step 5: Test Basic Functionality
- [ ] Open http://localhost:3000 in your browser
- [ ] Click "Get Started" button
- [ ] Sign up with a test email
- [ ] Verify you're redirected to the dashboard
- [ ] See the dashboard with mock data

**✨ Congratulations!** If you completed Phase 1, your app is working! You can now:
- Create user accounts
- View the dashboard
- Navigate between pages

---

## Phase 2: Bank Integration (Optional - Add Plaid)

### ☐ Step 6: Set Up Plaid (Connect Banks)
- [ ] Go to [plaid.com](https://plaid.com)
- [ ] Click "Get API Keys" and sign up
- [ ] Complete the signup form
- [ ] Go to Team Settings → Keys
- [ ] Copy your **client_id**
- [ ] Copy your **sandbox secret**
- [ ] Open `.env.local` in VSCode
- [ ] Replace `your_plaid_client_id_here` with your client_id
- [ ] Replace `your_plaid_secret_here` with your sandbox secret
- [ ] Verify `PLAID_ENV=sandbox` is set
- [ ] Save the file
- [ ] Restart dev server (Ctrl+C, then `npm run dev`)

### ☐ Step 7: Test Plaid Integration
- [ ] Go to http://localhost:3000/integrations
- [ ] Click "Connect" on Plaid
- [ ] Select "Chase" (or any test bank)
- [ ] Use credentials: `user_good` / `pass_good`
- [ ] Select an account
- [ ] Verify it shows as connected

---

## Phase 3: Payment Integration (Optional - Add Stripe)

### ☐ Step 8: Set Up Stripe (Track Payments)
- [ ] Go to [stripe.com](https://stripe.com)
- [ ] Sign up or sign in
- [ ] Toggle "Test Mode" ON (top right)
- [ ] Click "Developers" → "API keys"
- [ ] Copy the **Publishable key** (starts with `pk_test_`)
- [ ] Reveal and copy the **Secret key** (starts with `sk_test_`)
- [ ] Open `.env.local` in VSCode
- [ ] Replace `your_stripe_secret_key_here` with your Secret key
- [ ] Replace `your_stripe_publishable_key_here` with your Publishable key
- [ ] Save the file
- [ ] Restart dev server (Ctrl+C, then `npm run dev`)

### ☐ Step 9: Test Stripe Integration
- [ ] Go to http://localhost:3000/integrations
- [ ] Click "Connect" on Stripe
- [ ] Enter your Stripe account info
- [ ] Verify it shows as connected
- [ ] Try syncing transactions

---

## Phase 4: Customization (Make it yours!)

### ☐ Step 10: Customize Branding
- [ ] Open `app/layout.tsx`
- [ ] Change the app name from "FinanceFlow" to your name
- [ ] Open `app/page.tsx`
- [ ] Update the landing page copy
- [ ] Change colors in `app/globals.css` if desired

### ☐ Step 11: Test All Features
- [ ] Create a test account
- [ ] Add a manual transaction
- [ ] View analytics page
- [ ] Check all navigation links work
- [ ] Test on mobile browser (optional)

---

## Troubleshooting Checklist

If something isn't working, check these:

### Server Issues
- [ ] Is the dev server running? (Should see "✓ Ready" in terminal)
- [ ] Did you save `.env.local` after adding keys?
- [ ] Did you restart the server after changing `.env.local`?
- [ ] Are there any error messages in the terminal?

### Login Issues
- [ ] Are Clerk keys added to `.env.local`?
- [ ] Did you copy the full key (no spaces cut off)?
- [ ] Is there a space or quote accidentally added around the key?

### Database Issues
- [ ] Did you run the SQL schema in Supabase?
- [ ] Are Supabase keys added to `.env.local`?
- [ ] Is your Supabase project still active? (Check supabase.com)

### Integration Issues
- [ ] For Plaid: Did you use sandbox keys?
- [ ] For Stripe: Is Test Mode enabled?
- [ ] Did you restart the server after adding integration keys?

---

## Quick Commands Reference

```bash
# Start the development server
npm run dev

# Stop the server
Ctrl+C (or Cmd+C on Mac)

# Install dependencies (if you get "module not found" errors)
npm install

# Build for production (when ready to deploy)
npm run build
```

---

## What's Next?

After completing this checklist:

1. **Add Real Data**: Start adding your actual accounts and transactions
2. **Invite Users**: Share the app with friends/family to test
3. **Deploy Online**: Consider deploying to Vercel or similar (see deployment guide)
4. **Add Features**: Customize with budgets, goals, or recurring transactions

---

## Need Help?

- **Quick answers**: See [QUICKSTART.md](./QUICKSTART.md)
- **Detailed setup**: See [SETUP.md](./SETUP.md)
- **Technical details**: See [README.md](./README.md)
- **Stuck?**: Read the error message in the terminal - it usually tells you what's wrong!

---

**Pro Tip:** Don't try to set everything up at once! Complete Phase 1 first, test it, then move to Phase 2 when you're ready.
