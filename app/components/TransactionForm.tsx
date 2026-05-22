"use client";

import { FormEvent, useState } from "react";
import { Transaction } from "@/lib/transactionModel";

const categories = [
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
] as const;

const accounts = ["Cash", "Credit Card", "Debit Card", "Other"];

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<typeof categories[number]>("Delivery");
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Add Manual Transaction</h2>
        <p className="text-sm text-gray-600 mt-2">Capture a new spend or income item and keep your budget updated.</p>
      </div>
      <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Merchant</span>
          <input
            value={merchant}
            onChange={(event) => setMerchant(event.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. Carrefour"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Amount</span>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="AED 0.00"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as typeof categories[number])}
            className="w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Account</span>
          <select
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            className="w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {accounts.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="lg:col-span-2 space-y-2">
          <span className="text-sm font-medium text-gray-700">Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Optional notes"
          />
        </label>

        {error ? (
          <div className="lg:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="lg:col-span-2 inline-flex justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Save transaction
        </button>
      </form>
    </div>
  );
}
