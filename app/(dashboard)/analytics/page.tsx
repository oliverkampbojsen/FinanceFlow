"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart3, Percent } from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Real data from Supabase - empty until transactions are synced
  const monthlyData: Array<{ month: string; income: number; expenses: number }> = [];
  const categoryData: Array<{ name: string; value: number; color: string }> = [];
  const incomeSourcesData: Array<{ name: string; value: number; color: string }> = [];

  const totalIncome = 0;
  const totalExpenses = 0;
  const savingsRate = "0.0";

  const statCards = [
    {
      id: "savings",
      title: "Savings Rate",
      value: `${savingsRate}%`,
      icon: Percent,
      gradient: "from-green-500 to-emerald-500",
      glowColor: "rgba(34, 197, 94, 0.5)",
      description: "This month",
    },
    {
      id: "income",
      title: "Avg. Monthly Income",
      value: "$0",
      icon: TrendingUp,
      gradient: "from-indigo-500 to-purple-500",
      glowColor: "rgba(99, 102, 241, 0.5)",
      description: "Last 6 months",
    },
    {
      id: "expenses",
      title: "Avg. Monthly Expenses",
      value: "$0",
      icon: TrendingDown,
      gradient: "from-red-500 to-rose-500",
      glowColor: "rgba(239, 68, 68, 0.5)",
      description: "Last 6 months",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-indigo-300/80 mt-2">
          Insights into your income, expenses, and spending patterns
        </p>
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
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent transition-all duration-300 ${hoveredCard === card.id ? 'scale-110' : ''}`}>
                {card.value}
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

      {/* Income vs Expenses Trend */}
      <div
        className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300"
        onMouseEnter={() => setHoveredCard('trend')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Income vs Expenses Trend</h2>
          <BarChart3 className="h-5 w-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
        </div>

        {monthlyData.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-12 w-12 text-indigo-400" />
            </div>
            <p className="text-xl font-bold text-white mb-2">No data available</p>
            <p className="text-indigo-300/80">Start adding transactions to see trends</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(224, 231, 255, 0.5)" />
              <YAxis stroke="rgba(224, 231, 255, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 10, 15, 0.95)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '12px',
                  color: '#e0e7ff'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="#10b981"
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="#ef4444"
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* Animated border on hover */}
        {hoveredCard === 'trend' && (
          <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-border-flow"></div>
          </div>
        )}

        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Expenses by Category */}
        <div
          className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          onMouseEnter={() => setHoveredCard('category')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Expenses by Category</h2>
            <PieChartIcon className="h-5 w-5 text-purple-400 group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {categoryData.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 group-hover:scale-110 transition-transform">
                <PieChartIcon className="h-12 w-12 text-purple-400" />
              </div>
              <p className="text-lg font-bold text-white mb-2">No expense data</p>
              <p className="text-indigo-300/80">Add expenses to see category breakdown</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 10, 15, 0.95)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      color: '#e0e7ff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm glass p-3 rounded-lg group/item hover:glass-strong transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full group-hover/item:scale-125 transition-transform" style={{ backgroundColor: cat.color }} />
                      <span className="text-white">{cat.name}</span>
                    </div>
                    <span className="font-medium text-indigo-200">${cat.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Animated border on hover */}
          {hoveredCard === 'category' && (
            <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-border-flow"></div>
            </div>
          )}

          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Income Sources */}
        <div
          className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          onMouseEnter={() => setHoveredCard('income-sources')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Income Sources</h2>
            <TrendingUp className="h-5 w-5 text-green-400 group-hover:scale-125 transition-transform" />
          </div>

          {incomeSourcesData.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-12 w-12 text-green-400" />
              </div>
              <p className="text-lg font-bold text-white mb-2">No income data</p>
              <p className="text-indigo-300/80">Add income to see sources breakdown</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeSourcesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
                  <XAxis dataKey="name" stroke="rgba(224, 231, 255, 0.5)" />
                  <YAxis stroke="rgba(224, 231, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 10, 15, 0.95)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      color: '#e0e7ff'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {incomeSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {incomeSourcesData.map((source) => (
                  <div key={source.name} className="flex items-center justify-between text-sm glass p-3 rounded-lg group/item hover:glass-strong transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full group-hover/item:scale-125 transition-transform" style={{ backgroundColor: source.color }} />
                      <span className="text-white">{source.name}</span>
                    </div>
                    <span className="font-medium text-indigo-200">${source.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Animated border on hover */}
          {hoveredCard === 'income-sources' && (
            <div className="absolute inset-0 rounded-2xl opacity-100 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-border-flow"></div>
            </div>
          )}

          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
