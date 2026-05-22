"use client";

import useTransactions from "@/app/hooks/useTransactions";
import { getCategoryTotals } from "@/lib/transactionEngine";

export default function SpendingByCategoryChart() {
  const { transactions } = useTransactions();
  // compute categories from current transactions
  const categories = getCategoryTotals(transactions);
  const topCategories = categories.slice(0, 8);
  const maxAmount = topCategories.length ? Math.max(...topCategories.map((c) => c.amount)) : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h2>
      
      <div className="space-y-4">
        {topCategories.map((category, index) => {
          const colors = [
            "bg-blue-600",
            "bg-blue-500",
            "bg-blue-400",
            "bg-cyan-400",
            "bg-emerald-500",
            "bg-teal-400",
            "bg-indigo-500",
            "bg-purple-500",
          ];
          
          return (
            <div key={category.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">{category.category}</span>
                <span className="text-sm font-semibold text-gray-700">AED {category.amount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${colors[index % colors.length]}`}
                  style={{ width: `${(category.amount / maxAmount) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 text-right">{category.percentage}% of total</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Total Spend (Top 8):</span>{" "}
          AED {topCategories.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
