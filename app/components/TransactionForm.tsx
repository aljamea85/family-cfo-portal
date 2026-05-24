"use client";

import { useState } from "react";
import { Transaction } from "@/lib/transactionModel";

const categoriesByType: Record<Transaction["transactionType"], Transaction["category"][]> = {
  expense: [
    "Delivery",
    "Restaurants",
    "Cafés",
    "Groceries",
    "Fuel",
    "Shopping",
    "Family",
    "Charity",
    "Health",
    "Miscellaneous",
  ],
  income: [
    "Salary",
    "Bonus",
    "Family Transfer In",
    "Reimbursement",
    "Other Income",
  ],
  transfer: [
    "Internal Transfer",
    "Sinking Fund Transfer",
    "Bank Transfer",
    "Cash Movement",
  ],
  investment: [
    "Retirement Contribution",
    "Children Fund Contribution",
    "SPUS",
    "Gold",
    "Bitcoin",
    "Other Investment",
  ],
  refund: [
    "Delivery Refund",
    "Retail Refund",
    "Bank Reversal",
    "Other Refund",
  ],
};

const accounts = ["Cash", "Credit Card", "Debit Card", "Other"];

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState<Transaction["transactionType"]>("expense");
  const [category, setCategory] = useState<Transaction["category"]>(categoriesByType.expense[0]);
  const [account, setAccount] = useState(accounts[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!date || !merchant || !amount || Number.isNaN(Number(amount))) {
      setError("Please enter date, merchant, amount, category, and account.");
      return;
    }

    const transaction: Transaction = {
      id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date,
      merchant: merchant.trim(),
      amount: Number(amount),
      account,
      transactionType,
      category: category as Transaction["category"],
      subcategory: "",
      notes: notes.trim(),
      description: notes.trim() || merchant.trim(),
      confidence: 100,
      tags: [],
    };

    onAddTransaction(transaction);
    setMerchant("");
    setAmount("");
    setNotes("");
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6 sm:p-7">
      <div className="mb-6">
        <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Add entry</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50">Manual transaction entry</h2>
        <p className="mt-2 text-sm leading-7 text-slate-300">
          Capture new spend or income and keep the operating view aligned in real time.
        </p>
      </div>

      <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 outline-none transition focus:border-slate-400"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Merchant</span>
          <input
            value={merchant}
            onChange={(event) => setMerchant(event.target.value)}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-slate-400"
            placeholder="e.g. Carrefour"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Amount</span>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-slate-400"
            placeholder="AED 0.00"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Transaction["category"])}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 outline-none transition focus:border-slate-400"
          >
            {categoriesByType[transactionType].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Account</span>
          <select
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 outline-none transition focus:border-slate-400"
          >
            {accounts.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Transaction Type</span>
          <select
            value={transactionType}
            onChange={(e) => {
              const nextType = e.target.value as Transaction["transactionType"];
              setTransactionType(nextType);
              setCategory(categoriesByType[nextType][0] as Transaction["category"]);
            }}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 outline-none transition focus:border-slate-400"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="transfer">Transfer</option>
            <option value="investment">Investment</option>
            <option value="refund">Refund</option>
          </select>
        </label>

        <label className="lg:col-span-2 space-y-2">
          <span className="text-sm font-medium text-slate-200">Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-slate-400"
            rows={3}
            placeholder="Optional notes"
          />
        </label>

        {error ? (
          <div className="lg:col-span-2 rounded-[18px] border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="lg:col-span-2 inline-flex justify-center rounded-[18px] border border-slate-200/10 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
        >
          Save transaction
        </button>
      </form>
    </div>
  );
}
