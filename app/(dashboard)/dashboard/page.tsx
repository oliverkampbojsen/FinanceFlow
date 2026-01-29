"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet, ArrowRight, Link as LinkIcon, Receipt } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Real data from Supabase - shows $0.00 until accounts are connected
  const stats = {
    totalBalance: 0.00,
    totalIncome: 0.00,
    totalExpenses: 0.00,
    accountsCount: 0,
  };

  const netIncome = stats.totalIncome - stats.totalExpenses;

  const statCards = [
    {
      id: "balance",
      title: "Total Balance",
      value: stats.totalBalance,
      prefix: "$",
      suffix: "",
      icon: DollarSign,
      gradient: "from-indigo-500 to-purple-500",
      glowColor: "rgba(99, 102, 241, 0.5)",
      description: `Across ${stats.accountsCount} accounts`,
    },
    {
      id: "income",
      title: "Total Income",
      value: stats.totalIncome,
      prefix: "+$",
      suffix: "",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      glowColor: "rgba(34, 197, 94, 0.5)",
      description: "This month",
    },
    {
      id: "expenses",
      title: "Total Expenses",
      value: stats.totalExpenses,
      prefix: "-$",
      suffix: "",
      icon: TrendingDown,
      gradient: "from-red-500 to-rose-500",
      glowColor: "rgba(239, 68, 68, 0.5)",
      description: "This month",
    },
    {
      id: "net",
      title: "Net Income",
      value: netIncome,
      prefix: netIncome >= 0 ? "+$" : "-$",
      suffix: "",
      icon: Wallet,
      gradient: netIncome >= 0 ? "from-purple-500 to-pink-500" : "from-orange-500 to-red-500",
      glowColor: netIncome >= 0 ? "rgba(139, 92, 246, 0.5)" : "rgba(249, 115, 22, 0.5)",
      description: "This month",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with gradient text */}
      <div className="relative">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-indigo-300/80 mt-2">
          Overview of your financial accounts and recent activity
        </p>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={card.id}
            className="relative group"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card with glassmorphism */}
            <div className="glass-strong rounded-2xl p-6 relative overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                boxShadow: hoveredCard === card.id ? `0 20px 60px ${card.glowColor}` : 'none'
              }}
            >
              {/* Animated border on hover */}
              {hoveredCard === card.id && (
                <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-border-flow"></div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-indigo-200/80">{card.title}</p>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} transition-all duration-300 ${hoveredCard === card.id ? 'scale-110 rotate-12' : ''}`}
                  style={{
                    boxShadow: hoveredCard === card.id ? `0 0 20px ${card.glowColor}` : 'none'
                  }}
                >
                  <card.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Value with gradient */}
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent transition-all duration-300 ${hoveredCard === card.id ? 'scale-110' : ''}`}>
                {card.prefix}{Math.abs(card.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>

              {/* Description */}
              <p className="text-xs text-indigo-300/60">{card.description}</p>

              {/* Hover glow effect */}
              {hoveredCard === card.id && (
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 rounded-2xl transition-opacity pointer-events-none`}></div>
              )}

              {/* Background decoration */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section - Empty States */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Transactions */}
        <div
          className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          onMouseEnter={() => setHoveredCard('transactions')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
            <Receipt className="h-5 w-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
          </div>

          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
              <ArrowRight className="h-8 w-8 text-indigo-400" />
            </div>
            <p className="text-indigo-200 mb-2">No transactions yet</p>
            <p className="text-sm text-indigo-300/60 mb-6">Connect your accounts to start tracking transactions</p>

            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:scale-105 transition-all duration-300 glow-primary group/button"
            >
              <span>Connect Account</span>
              <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Animated border on hover */}
          {hoveredCard === 'transactions' && (
            <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-border-flow"></div>
            </div>
          )}

          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Connected Accounts */}
        <div
          className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          onMouseEnter={() => setHoveredCard('accounts')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Connected Accounts</h2>
            <LinkIcon className="h-5 w-5 text-purple-400 group-hover:rotate-12 transition-transform" />
          </div>

          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform">
              <LinkIcon className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-indigo-200 mb-2">No accounts connected</p>
            <p className="text-sm text-indigo-300/60 mb-6">Go to Integrations to connect your first account</p>

            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:scale-105 transition-all duration-300 glow-secondary group/button"
            >
              <span>Go to Integrations</span>
              <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Animated border on hover */}
          {hoveredCard === 'accounts' && (
            <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-border-flow"></div>
            </div>
          )}

          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
