"use client";

import useTransactions from "@/app/hooks/useTransactions";
import { getMonthlySpendingTrend } from "@/lib/transactionEngine";
import { Transaction } from "@/lib/transactionModel";

interface SpendingTrendChartProps {
  transactions?: Transaction[];
}

export default function SpendingTrendChart({ transactions: externalTransactions }: SpendingTrendChartProps) {
  const { transactions: hookTransactions } = useTransactions();
  const transactions = externalTransactions ?? hookTransactions;
  const monthlySpendingTrend = getMonthlySpendingTrend(transactions, 12);
  const minValue = monthlySpendingTrend.length ? Math.min(...monthlySpendingTrend.map((d) => d.amount)) : 0;
  const maxValue = monthlySpendingTrend.length ? Math.max(...monthlySpendingTrend.map((d) => d.amount)) : 0;
  const range = Math.max(1, maxValue - minValue);

  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Analytics</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Monthly spending trend</h2>
        </div>
        <p className="text-sm text-slate-300">
          Avg. AED {(monthlySpendingTrend.reduce((sum, d) => sum + d.amount, 0) / monthlySpendingTrend.length).toFixed(0)}
        </p>
      </div>

      <div className="mt-6 flex h-64 items-end justify-between gap-2">
        {monthlySpendingTrend.map((data, index) => {
          const heightPercent = ((data.amount - minValue) / range) * 100;
          const isCurrentMonth = index === monthlySpendingTrend.length - 1;

          return (
            <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex h-full w-full items-end justify-center group">
                <div
                  className={`w-full rounded-t-[12px] transition-colors duration-200 ${
                    isCurrentMonth ? "bg-slate-100" : "bg-slate-700 hover:bg-slate-500"
                  }`}
                  style={{ height: `${Math.max(heightPercent, 6)}%` }}
                >
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-md bg-slate-950 px-2 py-1 text-[11px] text-slate-50">
                    AED {data.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="hidden text-center text-xs text-slate-400 lg:block">{data.month.split(" ")[0]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
