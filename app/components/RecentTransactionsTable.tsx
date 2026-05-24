"use client";

import { Transaction } from "@/lib/transactionModel";
import { recentTransactions } from "@/lib/mockData";
import { getTotalSpend } from "@/lib/transactionEngine";

interface RecentTransactionsTableProps {
  transactions?: Transaction[];
}

export default function RecentTransactionsTable({ transactions }: RecentTransactionsTableProps) {
  const list = transactions && transactions.length > 0 ? transactions : recentTransactions;
  const total = getTotalSpend(list);

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(10,14,20,0.96))]">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-400">Transactions</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">Recent activity</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-slate-300">
            <tr>
              <th className="px-6 py-3 text-left text-[0.7rem] uppercase tracking-[0.24em]">Date</th>
              <th className="px-6 py-3 text-left text-[0.7rem] uppercase tracking-[0.24em]">Merchant</th>
              <th className="px-6 py-3 text-left text-[0.7rem] uppercase tracking-[0.24em]">Category</th>
              <th className="px-6 py-3 text-left text-[0.7rem] uppercase tracking-[0.24em]">Description</th>
              <th className="px-6 py-3 text-right text-[0.7rem] uppercase tracking-[0.24em]">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {list.map((transaction) => (
              <tr key={transaction.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium text-slate-50">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-slate-100">{transaction.merchant}</td>
                <td className="px-6 py-4 text-slate-300">{transaction.category}</td>
                <td className="px-6 py-4 text-slate-300">{transaction.description}</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-50">
                  {transaction.transactionType === "refund" ? (
                    <>AED -{transaction.amount.toLocaleString()}</>
                  ) : transaction.transactionType === "income" ? (
                    <>AED +{transaction.amount.toLocaleString()}</>
                  ) : (
                    <>AED {transaction.amount.toLocaleString()}</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-white/10 bg-white/[0.02] px-6 py-4">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-slate-50">Total (last {list.length} transactions):</span>{" "}
          AED {total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
