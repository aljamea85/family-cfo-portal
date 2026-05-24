"use client";

import { useEffect, useState } from "react";
import { recentTransactions } from "@/lib/mockData";
import { loadStoredTransactions } from "@/lib/transactionStorage";
import { calculateBudgetMonthStats, DEFAULT_MONTHLY_BUDGET } from "@/lib/budgetEngine";
import { Transaction } from "@/lib/transactionModel";

interface SpendingMetricsProps {
  transactions?: Transaction[];
}

export default function SpendingMetrics({ transactions: externalTransactions }: SpendingMetricsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(externalTransactions ?? []);
  const [hasLoaded, setHasLoaded] = useState(Boolean(externalTransactions));

  useEffect(() => {
    if (externalTransactions) {
      setTransactions(externalTransactions);
      setHasLoaded(true);
      return;
    }

    const stored = loadStoredTransactions();
    setTransactions(stored.length ? stored : recentTransactions);
    setHasLoaded(true);
  }, [externalTransactions]);

  const resolvedTransactions = externalTransactions ?? transactions;

  const {
    monthlyBudget,
    actualSpent,
    daysElapsed,
    daysInMonth,
    dailyAllowedSpend,
    actualDailyBurn,
    projectedMonthEndSpend,
    projectedOverspend,
    remainingSafeToSpend,
  } = hasLoaded
    ? calculateBudgetMonthStats(resolvedTransactions, DEFAULT_MONTHLY_BUDGET)
    : {
        monthlyBudget: DEFAULT_MONTHLY_BUDGET,
        actualSpent: 0,
        daysElapsed: 0,
        daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
        dailyAllowedSpend: 0,
        actualDailyBurn: 0,
        projectedMonthEndSpend: 0,
        projectedOverspend: 0,
        remainingSafeToSpend: DEFAULT_MONTHLY_BUDGET,
      };

  const budgetVariance = monthlyBudget - actualSpent;
  const statusTone = budgetVariance >= 0
    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
    : "border-rose-400/30 bg-rose-400/10 text-rose-100";

  return (
    <div className="space-y-5">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Budget operating brief</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50">Budget control</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
              Current spend velocity, reserve capacity, and projected month-end posture are presented in one executive view.
            </p>
          </div>
          <span className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold ${statusTone}`}>
            {budgetVariance >= 0 ? "Healthy" : "Under pressure"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-400">Monthly budget</p>
            <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-slate-50">AED {monthlyBudget.toLocaleString()}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-400">Actual spend</p>
            <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-slate-50">AED {actualSpent.toLocaleString()}</p>
          </div>
          <div className={`rounded-[22px] border p-4 ${budgetVariance >= 0 ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-100">Budget variance</p>
            <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-slate-50">
              {budgetVariance >= 0 ? "+" : "-"}AED {Math.abs(budgetVariance).toLocaleString()}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-400">Days elapsed</p>
            <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-slate-50">{daysElapsed}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(13,18,28,0.96))] p-5">
          <p className="text-sm text-slate-300">Daily allowed spend</p>
          <p className="mt-3 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {dailyAllowedSpend.toFixed(0)}</p>
          <p className="mt-2 text-sm text-slate-400">Remaining days: {Math.max(0, daysInMonth - daysElapsed)}</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(13,18,28,0.96))] p-5">
          <p className="text-sm text-slate-300">Actual daily burn</p>
          <p className="mt-3 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {actualDailyBurn.toFixed(0)}</p>
          <p className="mt-2 text-sm text-slate-400">Based on current pace</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(13,18,28,0.96))] p-5">
          <p className="text-sm text-slate-300">Projected month-end spend</p>
          <p className="mt-3 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {projectedMonthEndSpend.toFixed(0)}</p>
          <p className="mt-2 text-sm text-slate-400">Projected {projectedOverspend >= 0 ? "overspend" : "underspend"}</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(13,18,28,0.96))] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Projection</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Month-end posture</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Current spend velocity drives the remaining budget envelope and the reserve posture for the remainder of the month.
            </p>
          </div>
          <span className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${projectedOverspend > 0 ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"}`}>
            {projectedOverspend > 0 ? "Over budget" : "On track"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-300">Projected overspend</p>
            <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">AED {projectedOverspend.toFixed(0)}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-300">Safe-to-spend</p>
            <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">AED {remainingSafeToSpend.toFixed(0)}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-300">Days left</p>
            <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">{Math.max(0, daysInMonth - daysElapsed)}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-300">Monthly budget pace</p>
            <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">AED {(monthlyBudget / daysInMonth).toFixed(0)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
