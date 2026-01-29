"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, CreditCard, DollarSign, TrendingUp } from "lucide-react";

export default function AccountsPage() {
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
        return <Wallet className="h-5 w-5" />;
      case "credit_card":
        return <CreditCard className="h-5 w-5" />;
      case "stripe":
      case "paypal":
        return <DollarSign className="h-5 w-5" />;
      case "investment":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "bank":
        return "bg-blue-100 text-blue-700";
      case "credit_card":
        return "bg-purple-100 text-purple-700";
      case "stripe":
        return "bg-indigo-100 text-indigo-700";
      case "paypal":
        return "bg-cyan-100 text-cyan-700";
      case "cash":
        return "bg-green-100 text-green-700";
      case "investment":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your connected financial accounts
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Across {accounts.length} accounts
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="text-center py-12">
              <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No accounts connected</p>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your first account to start tracking your finances
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Connect Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${getAccountTypeColor(account.type)} flex items-center justify-center`}>
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      {account.institution && (
                        <p className="text-sm text-muted-foreground">{account.institution}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {account.type.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Balance</span>
                    <span className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : ''}`}>
                      ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Transactions
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Sync
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
