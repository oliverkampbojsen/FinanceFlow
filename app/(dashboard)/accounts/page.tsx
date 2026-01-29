"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, CreditCard, DollarSign, TrendingUp, ArrowRight, RefreshCw, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AccountsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Real data from Supabase - empty until accounts are connected
  const accounts: Array<{
    id: string;
    name: string;
    type: string;
    institution: string | null;
    balance: number;
    currency: string;
  }> = [];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "bank":
        return Wallet;
      case "credit_card":
        return CreditCard;
      case "stripe":
      case "paypal":
        return DollarSign;
      case "investment":
        return TrendingUp;
      default:
        return Wallet;
    }
  };

  const getAccountTypeGradient = (type: string) => {
    switch (type) {
      case "bank":
        return "from-blue-500 to-cyan-500";
      case "credit_card":
        return "from-purple-500 to-pink-500";
      case "stripe":
        return "from-indigo-500 to-purple-500";
      case "paypal":
        return "from-cyan-500 to-blue-500";
      case "cash":
        return "from-green-500 to-emerald-500";
      case "investment":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getAccountTypeGlow = (type: string) => {
    switch (type) {
      case "bank":
        return "rgba(59, 130, 246, 0.5)";
      case "credit_card":
        return "rgba(168, 85, 247, 0.5)";
      case "stripe":
        return "rgba(99, 102, 241, 0.5)";
      case "paypal":
        return "rgba(6, 182, 212, 0.5)";
      case "cash":
        return "rgba(34, 197, 94, 0.5)";
      case "investment":
        return "rgba(249, 115, 22, 0.5)";
      default:
        return "rgba(107, 114, 128, 0.5)";
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Accounts
          </h1>
          <p className="text-indigo-300/80 mt-2">
            Manage your connected financial accounts
          </p>
        </div>
        <Link href="/integrations">
          <button className="glass-strong px-6 py-3 rounded-xl font-medium text-white hover:scale-105 transition-all duration-300 glow-primary flex items-center gap-2 group">
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            <span>Add Account</span>
          </button>
        </Link>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Total Balance Card */}
      <div
        className="glass-strong rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
        onMouseEnter={() => setHoveredCard('total')}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          boxShadow: hoveredCard === 'total' ? '0 20px 60px rgba(139, 92, 246, 0.5)' : 'none'
        }}
      >
        {/* Animated border on hover */}
        {hoveredCard === 'total' && (
          <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-border-flow"></div>
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Total Balance</h2>
          </div>
          <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-indigo-300/60">
            Across {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'}
          </p>
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {accounts.length === 0 ? (
          <div
            className="col-span-2 glass-strong rounded-2xl p-12 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
            onMouseEnter={() => setHoveredCard('empty')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="text-center relative z-10">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No accounts connected</h3>
              <p className="text-indigo-300/80 mb-8">
                Connect your first account to start tracking your finances
              </p>
              <Link href="/integrations">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:scale-105 transition-all duration-300 glow-secondary group/button">
                  <Plus className="h-5 w-5 group-hover/button:rotate-90 transition-transform" />
                  <span>Connect Account</span>
                  <ArrowRight className="h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Animated border on hover */}
            {hoveredCard === 'empty' && (
              <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-border-flow"></div>
              </div>
            )}

            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
          </div>
        ) : (
          accounts.map((account) => {
            const Icon = getAccountIcon(account.type);
            const gradient = getAccountTypeGradient(account.type);
            const glowColor = getAccountTypeGlow(account.type);

            return (
              <div
                key={account.id}
                className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                onMouseEnter={() => setHoveredCard(account.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  boxShadow: hoveredCard === account.id ? `0 20px 60px ${glowColor}` : 'none'
                }}
              >
                {/* Animated border on hover */}
                {hoveredCard === account.id && (
                  <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-border-flow"></div>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} transition-all duration-300 ${hoveredCard === account.id ? 'scale-110 rotate-12' : ''}`}
                      style={{
                        boxShadow: hoveredCard === account.id ? `0 0 20px ${glowColor}` : 'none'
                      }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{account.name}</h3>
                      {account.institution && (
                        <p className="text-sm text-indigo-300/60">{account.institution}</p>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg glass capitalize text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {account.type.replace('_', ' ')}
                  </div>
                </div>

                {/* Balance */}
                <div className="mb-6">
                  <p className="text-sm text-indigo-300/60 mb-2">Balance</p>
                  <div className={`text-3xl font-bold transition-all duration-300 ${hoveredCard === account.id ? 'scale-110' : ''} ${account.balance < 0 ? 'text-red-400' : `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}`}>
                    ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 glass px-4 py-2 rounded-lg text-sm font-medium text-white hover:glass-strong transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    <span>View</span>
                  </button>
                  <button className="flex-1 glass px-4 py-2 rounded-lg text-sm font-medium text-white hover:glass-strong transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <RefreshCw className="h-4 w-4 group-hover/btn:rotate-180 transition-transform" />
                    <span>Sync</span>
                  </button>
                </div>

                {/* Hover glow effect */}
                {hoveredCard === account.id && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 rounded-2xl transition-opacity pointer-events-none`}></div>
                )}

                {/* Background decoration */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
