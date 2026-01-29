"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { TrendingUp, Wallet, ArrowLeftRight, BarChart3, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 grid-pattern opacity-30"></div>

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        ></div>
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse"
          style={{
            bottom: '10%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        ></div>
      </div>

      {/* Mouse follower glow */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      ></div>

      <nav className="container mx-auto px-4 py-6 relative z-10">
        <div className={`flex items-center justify-between glass-strong rounded-2xl px-6 py-4 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-2">
            <div className="relative">
              <TrendingUp className="h-6 w-6 text-indigo-400" />
              <div className="absolute inset-0 animate-ping">
                <TrendingUp className="h-6 w-6 text-indigo-400 opacity-30" />
              </div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              FinanceFlow
            </span>
          </div>
          <div className="flex gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="glass hover:glass-strong hover:glow-primary">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className={`text-center space-y-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span className="text-sm text-indigo-300">AI-Powered Financial Intelligence</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Track All Your Finances in{" "}
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              One Place
            </span>
          </h1>

          <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed">
            Connect your bank accounts, payment platforms, and track income and expenses automatically.
            Get real-time insights into your financial health.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0 px-8 py-6 group"
                >
                  <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Start Tracking for Free
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0 px-8 py-6"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            <Button
              size="lg"
              variant="outline"
              className="text-lg glass-strong hover:glass border-indigo-500/30 px-8 py-6"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-indigo-300/60">Active Users</div>
            </div>
            <div className="w-px bg-indigo-500/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">$2M+</div>
              <div className="text-sm text-indigo-300/60">Tracked</div>
            </div>
            <div className="w-px bg-indigo-500/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">99.9%</div>
              <div className="text-sm text-indigo-300/60">Uptime</div>
            </div>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 mt-32 max-w-6xl mx-auto transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="glass-strong rounded-2xl p-8 hover:glow-primary group cursor-pointer transform hover:-translate-y-2 transition-all">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-primary">
              <Wallet className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Connect Accounts</h3>
            <p className="text-indigo-200/70 leading-relaxed">
              Link your bank accounts, Stripe, and other platforms securely using military-grade encryption and Plaid integration.
            </p>
            <div className="mt-4 inline-flex items-center text-indigo-400 text-sm group-hover:gap-2 transition-all">
              Learn more
              <ArrowLeftRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-8 hover:glow-secondary group cursor-pointer transform hover:-translate-y-2 transition-all">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-secondary">
              <ArrowLeftRight className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">Auto-sync Transactions</h3>
            <p className="text-indigo-200/70 leading-relaxed">
              Automatically import and categorize all your income and expenses from connected accounts in real-time.
            </p>
            <div className="mt-4 inline-flex items-center text-purple-400 text-sm group-hover:gap-2 transition-all">
              Learn more
              <ArrowLeftRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-8 hover:glow-primary group cursor-pointer transform hover:-translate-y-2 transition-all">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-primary">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-white">View Analytics</h3>
            <p className="text-indigo-200/70 leading-relaxed">
              Get AI-powered insights with interactive charts and reports to understand your spending patterns and income sources.
            </p>
            <div className="mt-4 inline-flex items-center text-pink-400 text-sm group-hover:gap-2 transition-all">
              Learn more
              <ArrowLeftRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className={`mt-32 glass-strong rounded-3xl p-12 max-w-4xl mx-auto transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-indigo-400" />
            <h2 className="text-3xl font-bold text-white">Bank-Level Security</h2>
          </div>
          <p className="text-center text-indigo-200/70 max-w-2xl mx-auto mb-8">
            Your financial data is encrypted with AES-256 encryption and stored securely.
            We never store your banking credentials and are SOC 2 Type II certified.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="glass rounded-lg px-6 py-3 text-sm text-indigo-300">🔒 256-bit Encryption</div>
            <div className="glass rounded-lg px-6 py-3 text-sm text-indigo-300">✓ SOC 2 Certified</div>
            <div className="glass rounded-lg px-6 py-3 text-sm text-indigo-300">🛡️ GDPR Compliant</div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
