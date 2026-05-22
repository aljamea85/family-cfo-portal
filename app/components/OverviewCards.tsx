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
  const overspend = actualSpend - DEFAULT_MONTHLY_BUDGET;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* Monthly Budget Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-600 text-sm font-medium mb-2">Monthly Lifestyle Budget</p>
        <p className="text-2xl font-bold text-gray-900">AED {DEFAULT_MONTHLY_BUDGET.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-2">Q2 2026 allocation</p>
      </div>

      {/* Actual Spend Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-600 text-sm font-medium mb-2">Actual Lifestyle Spend</p>
        <p className="text-2xl font-bold text-gray-900">AED {actualSpend.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-2">This month</p>
      </div>

      {/* Overspend Card */}
      <div className="bg-white rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-red-600 text-sm font-medium mb-2">Overspend</p>
        <p className="text-2xl font-bold text-red-700">AED {overspend.toLocaleString()}</p>
        <p className="text-xs text-red-500 mt-2">{((overspend / DEFAULT_MONTHLY_BUDGET) * 100).toFixed(0)}% over budget</p>
      </div>

      {/* Retirement Portfolio Card */}
      <div className="bg-white rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <p className="text-blue-600 text-sm font-medium mb-2">Retirement Portfolio</p>
        <p className="text-2xl font-bold text-blue-900">AED {financialSummary.retirementPortfolioValue.toLocaleString()}</p>
        <p className="text-xs text-blue-500 mt-2">Current value</p>
      </div>

      {/* Children Fund Card */}
      <div className="bg-white rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="text-green-600 text-sm font-medium mb-2">Children Fund</p>
        <p className="text-2xl font-bold text-green-900">AED {financialSummary.childrenFundValue.toLocaleString()}</p>
        <p className="text-xs text-green-500 mt-2">Current value</p>
      </div>
    </div>
  );
}
