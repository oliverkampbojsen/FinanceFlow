# Quick Start Guide - For Complete Beginners

## What You're Looking At

Your project is already running at **http://localhost:3000** - but it needs API keys to work properly.

## Where to Put API Keys - Visual Guide

### Finding the .env.local File

```
business-site/                    <- Your project folder
├── app/                          <- Don't touch these yet
├── components/
├── lib/
├── .env.local                    <- ⭐ THIS IS THE FILE YOU NEED! ⭐
├── package.json
├── README.md
└── SETUP.md
```

### How to Edit .env.local in VSCode

1. **Look at the left sidebar** - this is called the "Explorer"
2. **Find `.env.local`** - it's at the same level as README.md
3. **Click on it** - it will open in the editor
4. **You'll see lines like this:**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```
5. **Replace the part after `=`** with your actual key
6. **Save the file** - Press `Cmd+S` (Mac) or `Ctrl+S` (Windows)

## Example - Before and After

### BEFORE (what you see now):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

### AFTER (what it should look like with real keys):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuaW5zcGlyZWQucGVhY29jay03NC5sY2wuZGV2JA
CLERK_SECRET_KEY=sk_test_abcdef123456GHIJKL789012mnopQRSTUV345678wxyz901234ABCD
```

**Key Points:**
- ✅ NO spaces around the `=` sign
- ✅ NO quotes around the value
- ✅ The key goes directly after the `=`
- ❌ DON'T delete the setting names (the part before `=`)
- ❌ DON'T share this file with anyone

## The 4 Services You Need

Here's what each service does and where to sign up:

### 1. 🔐 Clerk (Required First - User Logins)
- **What it does:** Handles user sign-up and login
- **Sign up:** [clerk.com](https://clerk.com)
- **Keys needed:** 2 keys (Publishable + Secret)
- **Cost:** Free for up to 10,000 users/month

### 2. 🗄️ Supabase (Required Second - Database)
- **What it does:** Stores all your accounts and transactions
- **Sign up:** [supabase.com](https://supabase.com)
- **Keys needed:** 2 keys (URL + Anon Key)
- **Cost:** Free for 2 projects
- **EXTRA STEP:** You need to run SQL code to create tables (see SETUP.md)

### 3. 🏦 Plaid (Optional - Bank Connections)
- **What it does:** Lets users connect their bank accounts
- **Sign up:** [plaid.com](https://plaid.com)
- **Keys needed:** 2 keys (Client ID + Secret)
- **Cost:** Free in "sandbox" mode (test mode)

### 4. 💳 Stripe (Optional - Payment Tracking)
- **What it does:** Tracks payments if you accept money online
- **Sign up:** [stripe.com](https://stripe.com)
- **Keys needed:** 2 keys (Publishable + Secret)
- **Cost:** Free to set up, only pay when processing real payments

## Minimum Setup to See Dashboard

You can start with just **Clerk** and **Supabase**:

1. ✅ Set up Clerk - enables login
2. ✅ Set up Supabase - stores data
3. ⏭️ Skip Plaid for now - manual transactions work fine
4. ⏭️ Skip Stripe for now - can add later

## Step-by-Step: First 15 Minutes

### Minute 0-5: Clerk Setup
1. Go to clerk.com → Sign Up
2. Create Application → Copy 2 keys
3. Paste in `.env.local` → Save file

### Minute 5-10: Supabase Setup
1. Go to supabase.com → Sign Up
2. Create Project → Wait 2 minutes
3. Go to Settings → API → Copy 2 keys
4. Paste in `.env.local` → Save file

### Minute 10-12: Create Database Tables
1. In Supabase → Click "SQL Editor"
2. In VSCode → Open `supabase-schema.sql`
3. Copy all the SQL code
4. Paste in Supabase SQL Editor → Click Run

### Minute 12-15: Test It!
1. In VSCode Terminal → Press `Ctrl+C` to stop server
2. Type: `npm run dev` → Press Enter
3. Open browser → Go to http://localhost:3000
4. Click "Get Started" → Create test account
5. 🎉 You should see your dashboard!

## Troubleshooting

### "I can't find .env.local"
- In VSCode, press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
- Type: `.env.local`
- Press Enter - it will open!

### "The server won't start after adding keys"
- Did you save `.env.local`? (Look for the dot next to filename)
- Are there any extra spaces around the `=` signs?
- Did you restart the server? (Stop with Ctrl+C, then `npm run dev`)

### "I see errors in the terminal"
- Copy the error message
- Most common: "Module not found" → Solution: Run `npm install`

### "Sign up button doesn't work"
- Make sure Clerk keys are added to `.env.local`
- Make sure you restarted the dev server after adding keys
- Check that keys don't have extra spaces or quotes

## Need More Help?

- **Detailed setup instructions:** See [SETUP.md](./SETUP.md)
- **What the app does:** See [README.md](./README.md)
- **Still stuck?** Check the terminal for error messages

## What Happens After Setup?

Once you have Clerk + Supabase working:
- ✅ Users can sign up and log in
- ✅ Dashboard shows mock data
- ✅ You can manually add accounts and transactions
- ✅ Analytics charts work with your data

Add Plaid later to:
- 🏦 Let users connect real bank accounts
- 🔄 Auto-sync transactions

Add Stripe later to:
- 💰 Track online payment income
- 📊 See revenue in your dashboard

---

**Remember:** You're running on **http://localhost:3000** right now. That URL only works on your computer. When you're ready to share with others, you'll need to deploy it (but that's for later!).
