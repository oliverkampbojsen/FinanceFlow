"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowUpRight, ArrowDownLeft, Filter, TrendingUp, TrendingDown, Receipt } from "lucide-react";
import { useState } from "react";

export default function TransactionsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Real data from Supabase - empty until accounts are connected
  const transactions: Array<{
    id: string;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date: string;
    account: string;
  }> = [];

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const statCards = [
    {
      id: "income",
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      glowColor: "rgba(34, 197, 94, 0.5)",
      prefix: "+$",
    },
    {
      id: "expenses",
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      gradient: "from-red-500 to-rose-500",
      glowColor: "rgba(239, 68, 68, 0.5)",
      prefix: "-$",
    },
    {
      id: "total",
      title: "Total Transactions",
      value: transactions.length,
      icon: Receipt,
      gradient: "from-indigo-500 to-purple-500",
      glowColor: "rgba(99, 102, 241, 0.5)",
      prefix: "",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Transactions
          </h1>
          <p className="text-indigo-300/80 mt-2">
            View and manage all your financial transactions
          </p>
        </div>
        <div className="flex gap-3">
          <button className="glass px-4 py-2 rounded-xl font-medium text-white hover:glass-strong transition-all duration-300 flex items-center gap-2 group">
            <Filter className="h-4 w-4 group-hover:rotate-180 transition-transform" />
            <span>Filter</span>
          </button>
          <button className="glass-strong px-6 py-3 rounded-xl font-medium text-white hover:scale-105 transition-all duration-300 glow-primary flex items-center gap-2 group">
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            <span>Add Transaction</span>
          </button>
        </div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
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
              <div className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent transition-all duration-300 ${hoveredCard === card.id ? 'scale-110' : ''}`}>
                {card.prefix}{typeof card.value === 'number' && card.prefix ? card.value.toLocaleString('en-US', { minimumFractionDigits: 2 }) : card.value}
              </div>

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

      {/* Transactions Table */}
      <div
        className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300"
        onMouseEnter={() => setHoveredCard('table')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          <Receipt className="h-5 w-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-6 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="h-12 w-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No transactions yet</h3>
            <p className="text-indigo-300/80 mb-8">
              Connect your accounts or add manual transactions to get started
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:scale-105 transition-all duration-300 glow-primary group/button">
              <Plus className="h-5 w-5 group-hover/button:rotate-90 transition-transform" />
              <span>Add Transaction</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-indigo-500/20 hover:bg-transparent">
                  <TableHead className="text-indigo-300/80">Date</TableHead>
                  <TableHead className="text-indigo-300/80">Description</TableHead>
                  <TableHead className="text-indigo-300/80">Category</TableHead>
                  <TableHead className="text-indigo-300/80">Account</TableHead>
                  <TableHead className="text-right text-indigo-300/80">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-indigo-500/20 hover:bg-white/5 transition-colors group/row"
                  >
                    <TableCell className="font-medium text-white">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          transaction.type === "income"
                            ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                            : "bg-gradient-to-br from-red-500/20 to-rose-500/20"
                        } group-hover/row:scale-110`}>
                          {transaction.type === "income" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <span className="text-white">{transaction.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="glass px-3 py-1 rounded-lg inline-block text-sm text-indigo-200">
                        {transaction.category}
                      </div>
                    </TableCell>
                    <TableCell className="text-indigo-300/60">
                      {transaction.account}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold text-lg ${
                        transaction.type === "income"
                          ? "bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Animated border on hover */}
        {hoveredCard === 'table' && (
          <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-border-flow"></div>
          </div>
        )}

        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
