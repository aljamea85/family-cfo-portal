"use client";

import useTransactions from "@/app/hooks/useTransactions";
import { calculateBudgetMonthStats } from "@/lib/budgetEngine";
import { getCategoryTotals, getTopMerchants } from "@/lib/transactionEngine";

export default function KeyMetrics() {
  const { transactions } = useTransactions();

  const budgetStats = calculateBudgetMonthStats(transactions);
  const categories = getCategoryTotals(transactions);
  const topCategory = categories.length ? categories[0] : undefined;
  const merchants = getTopMerchants(transactions, 1);
  const topMerchant = merchants.length ? merchants[0] : undefined;

  const budgetLabel = budgetStats.monthlyBudget === 0 ? "N/A" : `${Math.round((budgetStats.actualSpent / budgetStats.monthlyBudget) * 100)}% of budget`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h2>
      <ul className="space-y-4 text-sm text-gray-700">
        <li className="flex items-start">
          <span className="text-blue-600 font-bold mr-3">•</span>
          <span><strong>Budget Status:</strong> {budgetLabel} (AED {budgetStats.actualSpent.toLocaleString()} / AED {budgetStats.monthlyBudget.toLocaleString()})</span>
        </li>
        <li className="flex items-start">
          <span className="text-orange-600 font-bold mr-3">•</span>
          <span><strong>Top Spender:</strong> {topCategory ? `${topCategory.category} (${topCategory.amount} - ${topCategory.percentage}%)` : "—"}</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-600 font-bold mr-3">•</span>
          <span><strong>Top Merchant:</strong> {topMerchant ? `${topMerchant.merchant} (AED ${topMerchant.amount})` : "—"}</span>
        </li>
      </ul>
    </div>
  );
}
