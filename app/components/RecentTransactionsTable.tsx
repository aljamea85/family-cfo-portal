"use client";

import { Transaction } from "@/lib/transactionModel";
import { recentTransactions } from "@/lib/mockData";

interface RecentTransactionsTableProps {
  transactions?: Transaction[];
}

export default function RecentTransactionsTable({ transactions }: RecentTransactionsTableProps) {
  const list = transactions && transactions.length > 0 ? transactions : recentTransactions;
  const total = list.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Merchant</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Description</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {list.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{transaction.merchant}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">AED {transaction.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Total (last {list.length} transactions):</span>{" "}
          AED {total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
