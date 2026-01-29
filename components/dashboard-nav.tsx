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
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useSidebar } from "./sidebar-provider";

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
  const { isCollapsed, setIsCollapsed } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen glass-strong border-r border-indigo-500/20 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}>
        {/* Logo */}
        <div className={cn(
          "flex h-16 items-center border-b border-indigo-500/20 relative transition-all duration-300",
          isCollapsed ? "justify-center px-4" : "gap-2 px-6"
        )}>
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="glass-strong p-3 rounded-xl hover:scale-110 transition-all duration-300 group hover:glow-primary"
            >
              <ChevronRight className="h-5 w-5 text-indigo-400 group-hover:text-white transition-colors" />
            </button>
          ) : (
            <>
              <div className="relative group">
                <TrendingUp className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-30">
                  <TrendingUp className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex-1">
                FinanceFlow
              </span>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="glass-strong p-2 rounded-lg hover:scale-110 transition-all duration-300 group hover:glow-primary"
              >
                <ChevronLeft className="h-4 w-4 text-indigo-400 group-hover:text-white transition-colors" />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn(
          "space-y-1 p-4",
          isCollapsed && "flex flex-col items-center"
        )}>
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              "flex items-center rounded-xl glass hover:glass-strong transition-all group relative overflow-hidden",
              isCollapsed ? "justify-center p-3 w-12 h-12" : "gap-3 px-4 py-3"
            )}
            onMouseEnter={() => setHoveredItem("home")}
            onMouseLeave={() => setHoveredItem(null)}
            title={isCollapsed ? "Home" : ""}
          >
            <div className={cn(
              "relative z-10 flex items-center w-full",
              isCollapsed ? "justify-center" : "gap-3"
            )}>
              <div className={cn(
                "rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform",
                isCollapsed ? "p-2" : "p-2"
              )}>
                <Home className="h-4 w-4 text-indigo-300" />
              </div>
              {!isCollapsed && (
                <span className="text-sm font-medium text-indigo-200 group-hover:text-white transition-colors">
                  Home
                </span>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>

          <div className={cn(
            "bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent my-4",
            isCollapsed ? "h-px w-8" : "h-px"
          )}></div>

          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-xl transition-all group relative overflow-hidden",
                  isCollapsed ? "justify-center p-3 w-12 h-12" : "gap-3 px-4 py-3",
                  isActive
                    ? "glass-strong glow-primary"
                    : "glass hover:glass-strong"
                )}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                title={isCollapsed ? item.name : ""}
              >
                <div className={cn(
                  "relative z-10 flex items-center w-full",
                  isCollapsed ? "justify-center" : "gap-3"
                )}>
                  <div className={cn(
                    "rounded-lg transition-all",
                    isCollapsed ? "p-2" : "p-2",
                    isActive
                      ? `bg-gradient-to-br ${item.color} glow-primary group-hover:scale-110 group-hover:rotate-12`
                      : "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110"
                  )}>
                    <item.icon className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-white" : "text-indigo-300"
                    )} />
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className={cn(
                        "text-sm font-medium transition-colors flex-1",
                        isActive ? "text-white" : "text-indigo-200 group-hover:text-white"
                      )}>
                        {item.name}
                      </span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-indigo-300 animate-pulse" />
                      )}
                    </>
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
        <div className={cn(
          "absolute bottom-0 left-0 right-0 border-t border-indigo-500/20",
          isCollapsed ? "p-2 flex justify-center" : "p-4"
        )}>
          <div className={cn(
            "flex items-center rounded-xl glass-strong group hover:glow-primary transition-all",
            isCollapsed ? "justify-center p-2 w-12 h-12" : "gap-3 px-4 py-3"
          )}>
            <div className="flex items-center gap-3 w-full">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: cn(
                      "ring-2 ring-indigo-400/50 hover:ring-indigo-400 transition-all hover:scale-110 cursor-pointer",
                      isCollapsed ? "h-8 w-8" : "h-10 w-10"
                    ),
                    userButtonPopoverCard: "glass-strong border border-indigo-500/20",
                    userButtonPopoverActionButton: "text-white hover:glass-strong",
                    userButtonPopoverActionButtonText: "text-white",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Your Account</p>
                    <p className="text-xs text-indigo-300/60">Click to manage</p>
                  </div>
                  <Sparkles className="h-4 w-4 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </div>
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
