"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/lib/transactionModel";
import { loadStoredTransactions, saveStoredTransactions } from "@/lib/transactionStorage";
import { recentTransactions } from "@/lib/mockData";

export default function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = loadStoredTransactions();
    setTransactions(stored.length ? stored : recentTransactions);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveStoredTransactions(transactions);
  }, [transactions, loaded]);

  const addTransaction = (txn: Transaction) => {
    setTransactions((current) => {
      const next = [txn, ...current];
      return next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  return { transactions, addTransaction } as const;
}
