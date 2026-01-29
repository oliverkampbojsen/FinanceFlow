"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, CheckCircle2, XCircle, Wallet, CreditCard } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase";

export default function IntegrationsPage() {
  const { user } = useUser();
  const [integrations, setIntegrations] = useState([
    {
      id: "plaid",
      name: "Plaid",
      description: "Connect your bank accounts and automatically sync transactions",
      icon: Wallet,
      color: "bg-blue-100 text-blue-600",
      isConnected: false,
      connectedAccounts: 0,
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Track your Stripe payments and revenues automatically",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
      isConnected: false,
      connectedAccounts: 0,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Import PayPal transactions for both income and expenses",
      icon: CreditCard,
      color: "bg-cyan-100 text-cyan-600",
      isConnected: false,
      connectedAccounts: 0,
    },
  ]);
  const [loading, setLoading] = useState<string | null>(null);

  // Load integration status from Supabase
  useEffect(() => {
    if (!user) return;

    const loadIntegrations = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('integrations')
        .select('provider, access_token')
        .eq('user_id', user.id);

      if (!error && data) {
        setIntegrations((prev) =>
          prev.map((integration) => {
            const connected = data.find((d) => d.provider === integration.id);
            return {
              ...integration,
              isConnected: !!connected,
            };
          })
        );
      }
    };

    loadIntegrations();
  }, [user]);

  const handlePlaidConnect = async () => {
    setLoading("plaid");
    try {
      // Create link token
      const response = await fetch("/api/plaid/create-link-token", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to create link token");

      const { link_token } = await response.json();

      // Load Plaid Link script if not already loaded
      if (!(window as any).Plaid) {
        const script = document.createElement("script");
        script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }

      // Open Plaid Link
      const handler = (window as any).Plaid.create({
        token: link_token,
        onSuccess: async (public_token: string, metadata: any) => {
          // Exchange public token for access token
          const exchangeResponse = await fetch("/api/plaid/exchange-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_token, metadata }),
          });

          if (exchangeResponse.ok) {
            // Update integration status
            setIntegrations((prev) =>
              prev.map((int) =>
                int.id === "plaid" ? { ...int, isConnected: true } : int
              )
            );
            alert("Bank account connected successfully!");
          }
        },
        onExit: () => {
          setLoading(null);
        },
      });

      handler.open();
    } catch (error) {
      console.error("Plaid connection error:", error);
      alert("Failed to connect to Plaid. Check console for details.");
    } finally {
      setLoading(null);
    }
  };

  const handleStripeConnect = async () => {
    setLoading("stripe");
    try {
      const response = await fetch("/api/stripe/connect", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to connect Stripe");

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe OAuth
        window.location.href = url;
      } else {
        // Update integration status
        setIntegrations((prev) =>
          prev.map((int) =>
            int.id === "stripe" ? { ...int, isConnected: true } : int
          )
        );
        alert("Stripe connected successfully!");
      }
    } catch (error) {
      console.error("Stripe connection error:", error);
      alert("Failed to connect to Stripe. Check console for details.");
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    if (!user) return;

    const confirmDisconnect = confirm(
      `Are you sure you want to disconnect ${integrationId.toUpperCase()}? This will remove all connected accounts and stop syncing transactions.`
    );

    if (!confirmDisconnect) return;

    setLoading(integrationId);
    try {
      const supabase = createClient();

      // Delete integration
      await supabase
        .from('integrations')
        .delete()
        .eq('user_id', user.id)
        .eq('provider', integrationId);

      // Delete related accounts
      await supabase
        .from('accounts')
        .delete()
        .eq('user_id', user.id)
        .eq('type', integrationId);

      // Update state
      setIntegrations((prev) =>
        prev.map((int) =>
          int.id === integrationId
            ? { ...int, isConnected: false, connectedAccounts: 0 }
            : int
        )
      );

      alert(`${integrationId.toUpperCase()} disconnected successfully!`);
    } catch (error) {
      console.error("Disconnect error:", error);
      alert("Failed to disconnect. Check console for details.");
    } finally {
      setLoading(null);
    }
  };

  const handleSync = async (integrationId: string) => {
    setLoading(integrationId);
    try {
      const endpoint =
        integrationId === "plaid"
          ? "/api/plaid/sync-transactions"
          : "/api/stripe/sync-transactions";

      const response = await fetch(endpoint, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Sync failed");

      const data = await response.json();
      alert(`Synced ${data.count || 0} transactions successfully!`);
    } catch (error) {
      console.error("Sync error:", error);
      alert("Failed to sync transactions. Check console for details.");
    } finally {
      setLoading(null);
    }
  };

  const handleConnect = (integrationId: string) => {
    if (integrationId === "plaid") {
      handlePlaidConnect();
    } else if (integrationId === "stripe") {
      handleStripeConnect();
    } else {
      alert("PayPal integration coming soon!");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect your financial accounts and platforms to automatically sync transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            <CardTitle>Connected Services</CardTitle>
          </div>
          <CardDescription>
            {integrations.filter((i) => i.isConnected).length} of {integrations.length} integrations active
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg ${integration.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{integration.name}</h3>
                        {integration.isConnected ? (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {integration.description}
                      </p>
                      {integration.isConnected && integration.connectedAccounts > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {integration.connectedAccounts} account{integration.connectedAccounts > 1 ? 's' : ''} connected
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {integration.isConnected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSync(integration.id)}
                          disabled={loading === integration.id}
                        >
                          {loading === integration.id ? "Syncing..." : "Sync Now"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                          disabled={loading === integration.id}
                        >
                          {loading === integration.id ? "Disconnecting..." : "Disconnect"}
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleConnect(integration.id)}
                        disabled={loading === integration.id}
                      >
                        {loading === integration.id ? "Connecting..." : "Connect"}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How Integrations Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium">Connect Your Account</p>
                  <p className="text-muted-foreground">
                    Securely link your financial accounts through our trusted partners
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium">Auto-Sync Transactions</p>
                  <p className="text-muted-foreground">
                    Transactions are automatically imported and categorized
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium">Track & Analyze</p>
                  <p className="text-muted-foreground">
                    View all your finances in one place with real-time insights
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Bank-level encryption</p>
                  <p className="text-muted-foreground">
                    All data is encrypted in transit and at rest
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">No credential storage</p>
                  <p className="text-muted-foreground">
                    We never store your banking passwords
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Read-only access</p>
                  <p className="text-muted-foreground">
                    We can only view transactions, never move money
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
