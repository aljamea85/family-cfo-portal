"use client";

import OverviewCards from "@/app/components/OverviewCards";
import RecentTransactionsTable from "@/app/components/RecentTransactionsTable";
import SpendingMetrics from "@/app/components/SpendingMetrics";
import TransactionForm from "@/app/components/TransactionForm";
import useTransactions from "@/app/hooks/useTransactions";

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "add-entry", label: "Add Entry" },
  { id: "analytics", label: "Analytics" },
] as const;

export default function BudgetWorkspace() {
  const { transactions, addTransaction } = useTransactions();

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] px-5 py-6 sm:px-7 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Budget operating system</p>
            <h1 className="mt-4 text-[2.2rem] font-semibold tracking-tight text-slate-50">Budget</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Review the current operating position, capture manual activity, and inspect monthly pacing without leaving the workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-[20px] border border-white/10 bg-white/[0.03] p-2 sm:grid-cols-4">
            {sectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-[16px] px-4 py-3 text-center text-sm font-medium text-slate-200 transition hover:bg-white/[0.03]"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-6">
        <section id="overview" className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Overview</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Operating summary</h2>
            </div>
            <p className="text-sm text-slate-300">Updated from saved transactions and the current budget posture.</p>
          </div>
          <div className="mt-6">
            <OverviewCards transactions={transactions} />
          </div>
        </section>

        <section id="transactions" className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6 sm:p-7">
          <div className="mb-5">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Transactions</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Recent activity</h2>
          </div>
          <RecentTransactionsTable transactions={transactions} />
        </section>

        <section id="add-entry" className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6 sm:p-7">
          <div className="mb-5">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Add entry</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Capture a manual movement</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
              Record spend, income, transfers, or refunds directly within the budget workflow and keep the operating view current.
            </p>
          </div>
          <TransactionForm onAddTransaction={addTransaction} />
        </section>

        <section id="analytics" className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))] p-6 sm:p-7">
          <div className="mb-5">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Analytics</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Monthly pacing and velocity</h2>
          </div>
          <SpendingMetrics transactions={transactions} />
        </section>
      </div>
    </div>
  );
}
