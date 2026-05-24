"use client";

import { useEffect, useState } from "react";
import OverviewCards from "@/app/components/OverviewCards";
import RecentTransactionsTable from "@/app/components/RecentTransactionsTable";
import TransactionForm from "@/app/components/TransactionForm";
import { recentTransactions } from "@/lib/mockData";
import { loadStoredTransactions, saveStoredTransactions } from "@/lib/transactionStorage";
import { Transaction } from "@/lib/transactionModel";

export default function DashboardMetrics() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = loadStoredTransactions();
    setTransactions(stored.length ? stored : recentTransactions);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }
    saveStoredTransactions(transactions);
  }, [transactions, hasLoaded]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((current) => {
      const next = [transaction, ...current];
      return next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  return (
    <div className="space-y-8">
      {/* TransactionForm removed from dashboard/home for premium landing */}
      <OverviewCards transactions={transactions} />
      <RecentTransactionsTable transactions={transactions} />
    </div>
  );
}
