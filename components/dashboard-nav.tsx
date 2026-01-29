"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Link as LinkIcon,
  TrendingUp,
  BarChart3,
  Sparkles,
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "from-indigo-500 to-purple-500" },
  { name: "Accounts", href: "/accounts", icon: Wallet, color: "from-purple-500 to-pink-500" },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight, color: "from-pink-500 to-rose-500" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, color: "from-rose-500 to-orange-500" },
  { name: "Integrations", href: "/integrations", icon: LinkIcon, color: "from-orange-500 to-yellow-500" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 glass-strong border-r border-indigo-500/20">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-indigo-500/20">
          <div className="relative group">
            <TrendingUp className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-30">
              <TrendingUp className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            FinanceFlow
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {/* Home Link */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl glass hover:glass-strong transition-all group relative overflow-hidden"
            onMouseEnter={() => setHoveredItem("home")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform">
                <Home className="h-4 w-4 text-indigo-300" />
              </div>
              <span className="text-sm font-medium text-indigo-200 group-hover:text-white transition-colors">
                Home
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>

          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent my-4"></div>

          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                  isActive
                    ? "glass-strong glow-primary"
                    : "glass hover:glass-strong"
                )}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div className={cn(
                    "p-2 rounded-lg transition-all",
                    isActive
                      ? `bg-gradient-to-br ${item.color} glow-primary group-hover:scale-110 group-hover:rotate-12`
                      : "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110"
                  )}>
                    <item.icon className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-white" : "text-indigo-300"
                    )} />
                  </div>
                  <span className={cn(
                    "text-sm font-medium transition-colors flex-1",
                    isActive ? "text-white" : "text-indigo-200 group-hover:text-white"
                  )}>
                    {item.name}
                  </span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-indigo-300 animate-pulse" />
                  )}
                </div>

                {/* Hover background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r transition-transform duration-300",
                  `${item.color} opacity-10`,
                  hoveredItem === item.name ? "translate-x-0" : "translate-x-full"
                )}></div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 rounded-r-full animate-pulse"></div>
                )}

                {/* Animated border on hover */}
                {hoveredItem === item.name && (
                  <div className="absolute inset-0 rounded-xl opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-border-flow"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section - User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-500/20">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass-strong group hover:glow-primary transition-all cursor-pointer">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10 ring-2 ring-indigo-400/50 group-hover:ring-indigo-400 transition-all group-hover:scale-110"
                }
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Your Account</p>
              <p className="text-xs text-indigo-300/60">Manage settings</p>
            </div>
            <Sparkles className="h-4 w-4 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>
      </aside>

      {/* Top Bar for Mobile */}
      <div className="fixed top-0 left-0 right-0 z-30 md:hidden h-16 glass-strong border-b border-indigo-500/20 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-400" />
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            FinanceFlow
          </span>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
