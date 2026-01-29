"use client";

import { DashboardNav } from "@/components/dashboard-nav";
import { SidebarProvider, useSidebar } from "@/components/sidebar-provider";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <>
      <DashboardNav />

      {/* Main content with sidebar offset */}
      <main className={`ml-0 p-4 md:p-8 relative z-10 min-h-screen pt-20 md:pt-8 transition-all duration-300 ${
        isCollapsed ? "md:ml-20" : "md:ml-64"
      }`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen relative">
        {/* Animated background for dashboard */}
        <div className="fixed inset-0 grid-pattern opacity-20" style={{ zIndex: 0 }}></div>

        {/* Floating orbs in background */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl animate-pulse"
            style={{
              top: '20%',
              right: '10%',
              animation: 'float 25s ease-in-out infinite',
            }}
          ></div>
          <div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse"
            style={{
              bottom: '20%',
              left: '30%',
              animation: 'float 30s ease-in-out infinite reverse',
            }}
          ></div>
        </div>

        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
}
