"use client";

import { useEffect, useState } from "react";
import { recentTransactions } from "@/lib/mockData";
import { loadStoredTransactions } from "@/lib/transactionStorage";
import { calculateBudgetMonthStats, DEFAULT_MONTHLY_BUDGET } from "@/lib/budgetEngine";
import { Transaction } from "@/lib/transactionModel";

export default function SpendingMetrics() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = loadStoredTransactions();
    setTransactions(stored.length ? stored : recentTransactions);
    setHasLoaded(true);
  }, []);

  const {
    monthlyBudget,
    actualSpent,
    remainingBudget,
    daysElapsed,
    daysInMonth,
    dailyAllowedSpend,
    actualDailyBurn,
    projectedMonthEndSpend,
    projectedOverspend,
    remainingSafeToSpend,
  } = hasLoaded
    ? calculateBudgetMonthStats(transactions, DEFAULT_MONTHLY_BUDGET)
    : {
        monthlyBudget: DEFAULT_MONTHLY_BUDGET,
        actualSpent: 0,
        remainingBudget: DEFAULT_MONTHLY_BUDGET,
        daysElapsed: 0,
        daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
        dailyAllowedSpend: 0,
        actualDailyBurn: 0,
        projectedMonthEndSpend: 0,
        projectedOverspend: 0,
        remainingSafeToSpend: DEFAULT_MONTHLY_BUDGET,
      };

  // Unified budget variance logic
  const budgetVariance = monthlyBudget - actualSpent;
  const isUnderOrOnBudget = budgetVariance >= 0;
  const varianceColor = isUnderOrOnBudget ? "text-green-700" : "text-red-700";
  const varianceBg = isUnderOrOnBudget ? "bg-green-100" : "bg-red-100";
  const varianceSign = budgetVariance > 0 ? "+" : budgetVariance < 0 ? "-" : "";
  const absVariance = Math.abs(budgetVariance);

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Within Month</h1>
            <p className="text-sm text-gray-600 mt-2">Monthly budget health based on current spend velocity.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="text-xs uppercase tracking-wide text-slate-500">Budget</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">AED {monthlyBudget.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="text-xs uppercase tracking-wide text-slate-500">Spent</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">AED {actualSpent.toLocaleString()}</p>
            </div>
            <div className={`rounded-2xl p-4 text-sm font-semibold ${varianceBg} ${varianceColor}`}>
              <p className="text-xs uppercase tracking-wide">Budget Variance</p>
              <p className="mt-2 text-xl">
                {varianceSign}AED {absVariance.toLocaleString()}
              </p>
              <p className="text-xs mt-1">
                {isUnderOrOnBudget ? "Under budget" : "Over budget"}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="text-xs uppercase tracking-wide text-slate-500">Days elapsed</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{daysElapsed}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-700">Daily allowed spend</p>
          <p className="mt-4 text-3xl font-semibold text-gray-900">AED {dailyAllowedSpend.toFixed(0)}</p>
          <p className="text-sm text-gray-500 mt-2">Remaining days: {Math.max(0, 31 - daysElapsed)}</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-700">Actual daily burn</p>
          <p className="mt-4 text-3xl font-semibold text-gray-900">AED {actualDailyBurn.toFixed(0)}</p>
          <p className="text-sm text-gray-500 mt-2">Based on current pace</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-700">Projected month-end spend</p>
          <p className="mt-4 text-3xl font-semibold text-gray-900">AED {projectedMonthEndSpend.toFixed(0)}</p>
          <p className="text-sm text-gray-500 mt-2">Projected {projectedOverspend >= 0 ? "overspend" : "underspend"}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Projected budget outcome</h2>
            <p className="text-sm text-gray-600 mt-1">Review how current spend velocity affects the rest of the month.</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${projectedOverspend > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {projectedOverspend > 0 ? "Over budget" : "On track"}
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Projected overspend</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">AED {projectedOverspend.toFixed(0)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Safe-to-spend</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">AED {remainingSafeToSpend.toFixed(0)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Days left</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">{Math.max(0, daysInMonth - daysElapsed)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Monthly budget pace</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">AED {(monthlyBudget / daysInMonth).toFixed(0)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
