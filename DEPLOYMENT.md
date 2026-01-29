# Deployment Guide - FinanceFlow

This guide will help you deploy your FinanceFlow app to the internet with a custom domain like `www.financeflow.com`.

## Step 1: Push Code to GitHub

1. **Create a GitHub repository**:
   - Go to [github.com](https://github.com)
   - Click the "+" icon → "New repository"
   - Name it "financeflow" or "business-site"
   - Click "Create repository"

2. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/financeflow.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Deploy to Vercel (Free)

1. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Sign up with GitHub (easiest option)

2. **Import your project**:
   - Click "Add New Project"
   - Select your GitHub repository ("financeflow")
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**:
   Before deploying, add all your `.env.local` variables:

   - Click "Environment Variables"
   - Add each variable from your `.env.local` file:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
     CLERK_SECRET_KEY=sk_test_...
     NEXT_PUBLIC_SUPABASE_URL=https://...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
     PLAID_CLIENT_ID=...
     PLAID_SECRET=...
     PLAID_ENV=sandbox
     STRIPE_SECRET_KEY=sk_test_...
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `https://financeflow-xyz.vercel.app`

## Step 3: Buy a Custom Domain (Optional)

### Option A: Buy through Vercel (Easiest)

1. In your Vercel project → **Settings** → **Domains**
2. Click "Buy a domain"
3. Search for "financeflow.com"
4. Purchase it (~$15/year)
5. Vercel automatically connects it - done!

### Option B: Buy from a Domain Registrar

1. **Buy the domain**:
   - Go to [namecheap.com](https://namecheap.com) or [godaddy.com](https://godaddy.com)
   - Search for "financeflow.com"
   - Purchase it (~$10-15/year)

2. **Connect to Vercel**:
   - In Vercel: Go to **Settings** → **Domains**
   - Add your domain: `financeflow.com`
   - Vercel will show you DNS settings to add

3. **Update DNS settings** (in Namecheap/GoDaddy):
   - Add an A record pointing to Vercel's IP: `76.76.21.21`
   - Add a CNAME record for `www` pointing to `cname.vercel-dns.com`

4. **Wait for DNS propagation** (10 minutes - 24 hours)

## Step 4: Update Clerk & Supabase URLs

After deployment, you need to whitelist your new domain:

### Update Clerk:
1. Go to [clerk.com](https://clerk.com) → Your app
2. Go to **Settings** → **URLs**
3. Add your domain:
   - Production: `https://financeflow.com`
   - Allowed redirect URLs: `https://financeflow.com/*`

### Update Supabase:
1. Go to [supabase.com](https://supabase.com) → Your project
2. Go to **Settings** → **API**
3. Under "Site URL", add: `https://financeflow.com`

## Step 5: Test Your Live Site

1. Visit `https://www.financeflow.com` (or your Vercel URL)
2. Test sign-up and login
3. Try connecting Plaid or Stripe
4. Verify everything works!

## Continuous Deployment

From now on, whenever you push changes to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically:
- Rebuild your site
- Deploy the new version
- Update your live site (in ~2 minutes)

## Troubleshooting

### Build Errors
- Check Vercel build logs
- Make sure all environment variables are added
- Verify all dependencies are in `package.json`

### Domain Not Working
- DNS can take up to 24 hours to propagate
- Check DNS settings are correct
- Try visiting without `www`: `https://financeflow.com`

### Auth Issues
- Make sure Clerk URLs are updated
- Verify environment variables are set in Vercel
- Check Supabase Site URL is correct

## Cost Breakdown

**Free:**
- Vercel hosting (forever, with generous limits)
- GitHub repository (public or private)

**Paid:**
- Domain name: ~$10-15/year (financeflow.com)
- Clerk: Free up to 10,000 users/month
- Supabase: Free tier (2 projects)
- Plaid: Free in sandbox mode
- Stripe: Free (only pay when processing payments)

**Total ongoing cost: ~$1/month** (just the domain)

## Next Steps

1. **Get the domain** - The domain "financeflow.com" might already be taken. Have backup names ready!
2. **Set up monitoring** - Vercel shows analytics for your site
3. **Add custom email** - Use your domain for email (optional)
4. **Share with users** - Your app is now live!

---

**Questions?** Check Vercel's documentation at [vercel.com/docs](https://vercel.com/docs)
