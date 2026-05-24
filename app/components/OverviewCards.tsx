"use client";

import { getTotalSpend } from "@/lib/transactionEngine";
import { DEFAULT_MONTHLY_BUDGET } from "@/lib/budgetEngine";
import { Transaction } from "@/lib/transactionModel";
import { financialSummary } from "@/lib/mockData";

interface OverviewCardsProps {
  transactions: Transaction[];
}

export default function OverviewCards({ transactions }: OverviewCardsProps) {
  const actualSpend = getTotalSpend(transactions);
  const budgetVariance = DEFAULT_MONTHLY_BUDGET - actualSpend;
  const isUnderOrOnBudget = budgetVariance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(13,18,28,0.96))] p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-400">Monthly lifestyle budget</p>
        <p className="mt-4 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {DEFAULT_MONTHLY_BUDGET.toLocaleString()}</p>
        <p className="mt-2 text-sm text-slate-300">Q2 2026 allocation</p>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(13,18,28,0.96))] p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-400">Actual lifestyle spend</p>
        <p className="mt-4 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {actualSpend.toLocaleString()}</p>
        <p className="mt-2 text-sm text-slate-300">This month</p>
      </div>

      <div className={`rounded-[24px] border p-5 ${isUnderOrOnBudget ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}>
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-slate-50">Budget variance</p>
        <p className="mt-4 text-[1.8rem] font-semibold tracking-tight text-slate-50">
          {budgetVariance >= 0 ? "+" : "-"}AED {Math.abs(budgetVariance).toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-slate-100">{isUnderOrOnBudget ? "Under budget" : "Over budget"}</p>
      </div>

      <div className="rounded-[24px] border border-sky-400/20 bg-sky-400/10 p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sky-100">Retirement portfolio</p>
        <p className="mt-4 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {financialSummary.retirementPortfolioValue.toLocaleString()}</p>
        <p className="mt-2 text-sm text-sky-100">Current value</p>
      </div>

      <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-100">Children fund</p>
        <p className="mt-4 text-[1.8rem] font-semibold tracking-tight text-slate-50">AED {financialSummary.childrenFundValue.toLocaleString()}</p>
        <p className="mt-2 text-sm text-emerald-100">Current value</p>
      </div>
    </div>
  );
}
