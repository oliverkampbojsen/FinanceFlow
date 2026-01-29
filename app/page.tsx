import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { TrendingUp, Wallet, ArrowLeftRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FinanceFlow</span>
          </div>
          <div className="flex gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Track All Your Finances in{" "}
            <span className="text-primary">One Place</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect your bank accounts, payment platforms, and track income and expenses automatically. Get insights into your financial health.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="text-lg">
                  Start Tracking for Free
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Connect Accounts</h3>
            <p className="text-muted-foreground">
              Link your bank accounts, Stripe, and other platforms securely using Plaid integration.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <ArrowLeftRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Auto-sync Transactions</h3>
            <p className="text-muted-foreground">
              Automatically import and categorize all your income and expenses from connected accounts.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">View Analytics</h3>
            <p className="text-muted-foreground">
              Get insights with charts and reports to understand your spending patterns and income sources.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
