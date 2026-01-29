"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { TrendingUp, Wallet, ArrowLeftRight, BarChart3, Sparkles, Zap, Shield, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create particles on mouse move (occasionally)
      if (Math.random() > 0.95) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 2000 + 1000,
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, newParticle.duration);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animated stars background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = [];
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
          ctx.fillStyle = `rgba(99, 102, 241, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }

          star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.3 + 0.4;
        });

        requestAnimationFrame(animate);
      }

      animate();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated stars canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-60" style={{ zIndex: 1 }} />

      {/* Animated grid background */}
      <div className="fixed inset-0 grid-pattern opacity-30" style={{ zIndex: 0 }}></div>

      {/* Floating orbs with enhanced animation */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl"
          style={{
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite, pulse 4s ease-in-out infinite',
          }}
        ></div>
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/25 to-pink-500/25 blur-3xl"
          style={{
            bottom: '10%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse, pulse 5s ease-in-out infinite',
          }}
        ></div>
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-500/20 to-indigo-500/20 blur-3xl"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'float 30s ease-in-out infinite, pulse 6s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* Mouse particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            animation: `fadeOut ${particle.duration}ms ease-out forwards, float-up ${particle.duration}ms ease-out forwards`,
            zIndex: 100,
          }}
        />
      ))}

      {/* Enhanced mouse follower glow with ripple effect */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
          zIndex: 2,
        }}
      ></div>

      <div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none opacity-30 blur-2xl transition-all duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          left: `${mousePosition.x - 200}px`,
          top: `${mousePosition.y - 200}px`,
          zIndex: 2,
        }}
      ></div>

      <nav className="container mx-auto px-4 py-6 relative z-10">
        <div className={`flex items-center justify-between glass-strong rounded-2xl px-6 py-4 transform transition-all duration-1000 hover:scale-[1.02] ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <TrendingUp className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-30">
                <TrendingUp className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:tracking-wider transition-all">
              FinanceFlow
            </span>
          </div>
          <div className="flex gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="glass hover:glass-strong hover:glow-primary relative overflow-hidden group">
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className={`text-center space-y-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-2 mb-4 hover:scale-105 transition-transform cursor-pointer group">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm text-indigo-300 group-hover:text-indigo-200 transition-colors">AI-Powered Financial Intelligence</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight animate-gradient">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Track All Your Finances in{" "}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                One Place
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            </span>
          </h1>

          <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed hover:text-indigo-100 transition-colors">
            Connect your bank accounts, payment platforms, and track income and expenses automatically.
            Get real-time insights into your financial health.
          </p>

          <div className="flex gap-4 justify-center pt-8 flex-wrap">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 glow-primary border-0 px-8 py-6 group relative overflow-hidden hover:scale-105 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="h-5 w-5 group-hover:animate-pulse" />
                    Start Tracking for Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  </div>
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 glow-primary border-0 px-8 py-6 hover:scale-105 transition-all group"
                >
                  <span className="flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </Link>
            </SignedIn>
            <Button
              size="lg"
              variant="outline"
              className="text-lg glass-strong hover:glass border-indigo-500/30 px-8 py-6 hover:scale-105 transition-all group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Watch Demo
                <Star className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Button>
          </div>

          {/* Enhanced Stats with animation */}
          <div className="flex justify-center gap-8 pt-12 flex-wrap">
            {[
              { value: '10K+', label: 'Active Users', delay: 0 },
              { value: '$2M+', label: 'Tracked', delay: 100 },
              { value: '99.9%', label: 'Uptime', delay: 200 },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group cursor-pointer hover:scale-110 transition-transform"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-indigo-300/60 group-hover:text-indigo-300 transition-colors">{stat.label}</div>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto transition-all duration-300 rounded-full mt-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 mt-32 max-w-6xl mx-auto transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            {
              icon: Wallet,
              title: 'Connect Accounts',
              description: 'Link your bank accounts, Stripe, and other platforms securely using military-grade encryption and Plaid integration.',
              gradient: 'from-indigo-500 to-purple-500',
              glow: 'glow-primary',
              color: 'indigo',
            },
            {
              icon: ArrowLeftRight,
              title: 'Auto-sync Transactions',
              description: 'Automatically import and categorize all your income and expenses from connected accounts in real-time.',
              gradient: 'from-purple-500 to-pink-500',
              glow: 'glow-secondary',
              color: 'purple',
            },
            {
              icon: BarChart3,
              title: 'View Analytics',
              description: 'Get AI-powered insights with interactive charts and reports to understand your spending patterns and income sources.',
              gradient: 'from-pink-500 to-indigo-500',
              glow: 'glow-primary',
              color: 'pink',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="glass-strong rounded-2xl p-8 hover:glow-primary group cursor-pointer transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all ${feature.glow} relative`}>
                <feature.icon className="h-7 w-7 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 animate-ping"></div>
              </div>

              <h3 className="font-bold text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all">
                {feature.title}
              </h3>

              <p className="text-indigo-200/70 leading-relaxed group-hover:text-indigo-100 transition-colors">
                {feature.description}
              </p>

              <div className={`mt-4 inline-flex items-center text-${feature.color}-400 text-sm group-hover:gap-2 transition-all`}>
                Learn more
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-2 transition-transform" />
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-border-flow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section with enhanced animation */}
        <div className={`mt-32 glass-strong rounded-3xl p-12 max-w-4xl mx-auto transform transition-all duration-1000 delay-700 hover:scale-105 hover:glow-primary group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-indigo-400 group-hover:scale-110 group-hover:rotate-12 transition-all" />
            <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all">
              Bank-Level Security
            </h2>
          </div>
          <p className="text-center text-indigo-200/70 max-w-2xl mx-auto mb-8 group-hover:text-indigo-100 transition-colors">
            Your financial data is encrypted with AES-256 encryption and stored securely.
            We never store your banking credentials and are SOC 2 Type II certified.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {['🔒 256-bit Encryption', '✓ SOC 2 Certified', '🛡️ GDPR Compliant'].map((badge, index) => (
              <div
                key={badge}
                className="glass rounded-lg px-6 py-3 text-sm text-indigo-300 hover:scale-110 hover:glass-strong hover:text-indigo-200 transition-all cursor-pointer group/badge"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {badge}
                <div className="h-0.5 w-0 group-hover/badge:w-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 rounded-full mt-1 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes border-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-border-flow {
          animation: border-flow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
