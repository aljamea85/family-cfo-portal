"use client";

import { useMemo } from "react";
import { DEFAULT_MONTHLY_BUDGET } from "@/lib/budgetEngine";
import { financialSummary, monthlyBreakdown } from "@/lib/mockData";

function getBudgetNarrative() {
  const variance = DEFAULT_MONTHLY_BUDGET - financialSummary.actualLifestyleSpend;
  if (variance > 0) {
    return `Budget remains within the current monthly envelope, with ${Math.abs(variance).toLocaleString()} AED of headroom preserved for controlled discretionary decisions.`;
  }
  if (variance === 0) {
    return "Current spend aligns with the monthly envelope, maintaining a balanced operating posture across liquidity and obligations.";
  }
  return `Current spend is above the monthly envelope by ${Math.abs(variance).toLocaleString()} AED, requiring immediate liquidity oversight and constrained discretionary decisions.`;
}

function getCashflowStatus() {
  const net = monthlyBreakdown.income - (monthlyBreakdown.billsObligations + monthlyBreakdown.lifestyleSpend + monthlyBreakdown.wealthEngine + monthlyBreakdown.childrenFund + monthlyBreakdown.emergencyReserve);
  if (net > 2000) return "Positive";
  if (net > 0) return "Tight";
  return "Negative";
}

function getCashAtHand() {
  return 12500;
}

function getSafeToSpendToday() {
  const monthlyAverage = DEFAULT_MONTHLY_BUDGET / 30;
  const spendPressure = financialSummary.actualLifestyleSpend / 30;
  return Math.max(0, Math.round(monthlyAverage - spendPressure));
}

function getBudgetVariance() {
  return DEFAULT_MONTHLY_BUDGET - financialSummary.actualLifestyleSpend;
}

function getCashflowForecast() {
  const months = ["Jun", "Jul", "Aug", "Sep"];

  return months.map((month, index) => {
    const income = 35000;
    const expenses = 18000 + 8200 + 8000 + 1500 + 2300 + (index === 1 ? 12000 : 0);
    const net = income - expenses;

    let status: "positive" | "tight" | "negative" = "positive";
    if (net < 2000 && net > 0) {
      status = "tight";
    }

    if (net <= 0) {
      status = "negative";
    }

    return { month, income, expenses, net, status };
  });
}

export default function HomeLandingExperience() {
  const forecast = useMemo(getCashflowForecast, []);
  const budgetVariance = getBudgetVariance();
  const cashflowStatus = getCashflowStatus();
  const liquidityState = cashflowStatus === "Positive" ? "Balanced" : cashflowStatus === "Tight" ? "Attention" : "Caution";

  return (
    <div className="mx-auto max-w-7xl">
      <section className="overflow-hidden rounded-[34px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(15,19,24,0.98))] p-5 ring-1 ring-white/[0.03] sm:p-7 lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.05fr,0.95fr] xl:items-end">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.4em] text-slate-400">
              Financial command center
            </p>
            <h1 className="mt-4 max-w-2xl text-[2.4rem] font-semibold leading-[0.92] tracking-[-0.09em] text-slate-50 sm:text-[2.9rem]">
              FINANCIAL COMMAND CENTER
            </h1>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-200">
              {getBudgetNarrative()}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Budget position</p>
                <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">AED {DEFAULT_MONTHLY_BUDGET.toLocaleString()}</p>
              </div>
              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Liquidity outlook</p>
                <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">AED {getCashAtHand().toLocaleString()}</p>
              </div>
              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Portfolio alignment</p>
                <p className="mt-3 text-[1.35rem] font-semibold tracking-tight text-slate-50">AED 612,500</p>
              </div>
              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Next material obligation</p>
                <p className="mt-3 text-[1.05rem] font-semibold tracking-tight text-slate-50">School Fees · Jul 2026</p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(14,18,24,0.98),rgba(9,13,18,0.98))] p-5 ring-1 ring-white/[0.03]">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-slate-400">Executive brief</p>
            <p className="mt-3 text-[1.02rem] leading-8 text-slate-200">
              Liquidity remains sufficient for the month, but the operating cadence is narrowing discretionary headroom. The current priority is preserving reserve capacity ahead of the July obligation.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Cashflow outlook</p>
                <p className="mt-2 text-[1.2rem] font-semibold tracking-tight text-slate-50">{cashflowStatus}</p>
              </div>
              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Safe to spend</p>
                <p className="mt-2 text-[1.2rem] font-semibold tracking-tight text-slate-50">AED {getSafeToSpendToday().toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-sm text-slate-100">
                Liquidity outlook: {liquidityState}
              </span>
              <span className={`rounded-full border px-3.5 py-1.5 text-sm ${budgetVariance >= 0 ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-100" : "border-rose-400/35 bg-rose-400/10 text-rose-100"}`}>
                Budget position: {budgetVariance >= 0 ? "Healthy" : "Under pressure"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-3 xl:grid-cols-4">
        <div className="rounded-[26px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(15,19,24,0.98))] p-5 ring-1 ring-white/[0.03]">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Budget position</p>
          <p className="mt-4 text-[2rem] font-semibold tracking-[-0.08em] text-slate-50">AED {DEFAULT_MONTHLY_BUDGET.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-300">Monthly allocation</p>
        </div>
        <div className="rounded-[26px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(15,19,24,0.98))] p-5 ring-1 ring-white/[0.03]">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Liquidity outlook</p>
          <p className="mt-4 text-[2rem] font-semibold tracking-[-0.08em] text-slate-50">AED {getCashAtHand().toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-300">Cash at hand</p>
        </div>
        <div className={`rounded-[26px] border p-5 ring-1 ${budgetVariance >= 0 ? "border-emerald-400/30 bg-emerald-400/10 ring-emerald-400/10" : "border-rose-400/30 bg-rose-400/10 ring-rose-400/10"}`}>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-100">Budget variance</p>
          <p className="mt-4 text-[2rem] font-semibold tracking-[-0.08em] text-slate-50">
            {budgetVariance >= 0 ? "+" : "-"}AED {Math.abs(budgetVariance).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-50">Current operating balance</p>
        </div>
        <div className="rounded-[26px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(15,19,24,0.98))] p-5 ring-1 ring-white/[0.03]">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Portfolio alignment</p>
          <p className="mt-4 text-[2rem] font-semibold tracking-[-0.08em] text-slate-50">AED 612,500</p>
          <p className="mt-2 text-sm text-slate-300">Retirement and children balance</p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.92fr,1.08fr]">
        <div className="rounded-[30px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(15,19,24,0.98))] p-6 ring-1 ring-white/[0.03]">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-slate-400">Intelligence preview</p>
          <h2 className="mt-3 text-[1.55rem] font-semibold tracking-tight text-slate-50">Executive attention points</h2>
          <div className="mt-6 space-y-3">
            <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-sm font-semibold text-slate-50">Budget pace</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Current spend is ahead of the monthly envelope, and discretionary headroom is narrowing.
              </p>
            </div>
            <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-sm font-semibold text-slate-50">Upcoming obligations</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                The next material cash event is school fees in July. Reserve planning should remain conservative.
              </p>
            </div>
            <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-sm font-semibold text-slate-50">Liquidity pressure</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Liquidity remains available, but the buffer is tighter than the preferred operating range.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(15,19,24,0.98))] p-6 ring-1 ring-white/[0.03]">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-slate-400">Cashflow forecast</p>
          <h2 className="mt-3 text-[1.55rem] font-semibold tracking-tight text-slate-50">Next four months</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-slate-400">
                  <th className="px-3 py-2 text-left">Month</th>
                  <th className="px-3 py-2 text-right">Projected income</th>
                  <th className="px-3 py-2 text-right">Projected expenses</th>
                  <th className="px-3 py-2 text-right">Net cashflow</th>
                  <th className="px-3 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((item) => (
                  <tr key={item.month} className="border-t border-white/[0.06]">
                    <td className="px-3 py-3 font-semibold text-slate-50">{item.month}</td>
                    <td className="px-3 py-3 text-right text-emerald-200">AED {item.income.toLocaleString()}</td>
                    <td className="px-3 py-3 text-right text-rose-200">AED {item.expenses.toLocaleString()}</td>
                    <td className={`px-3 py-3 text-right font-semibold ${item.net >= 0 ? "text-emerald-200" : "text-rose-200"}`}>
                      AED {item.net.toLocaleString()}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === "positive" ? "bg-emerald-400/10 text-emerald-100" : item.status === "tight" ? "bg-amber-400/10 text-amber-100" : "bg-rose-400/10 text-rose-100"}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
