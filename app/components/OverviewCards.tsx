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
  const varianceColor = isUnderOrOnBudget ? "text-green-700" : "text-red-700";
  const varianceBg = isUnderOrOnBudget ? "bg-green-100" : "bg-red-100";
  const varianceSign = budgetVariance > 0 ? "+" : budgetVariance < 0 ? "-" : "";
  const absVariance = Math.abs(budgetVariance);

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

      {/* Budget Variance Card */}
      <div className={`bg-white rounded-lg border p-6 shadow-sm ${varianceBg}`}>
        <p className={`text-sm font-medium mb-2 ${varianceColor}`}>Budget Variance</p>
        <p className={`text-2xl font-bold ${varianceColor}`}>{varianceSign}AED {absVariance.toLocaleString()}</p>
        <p className={`text-xs mt-2 ${varianceColor}`}>{isUnderOrOnBudget ? "Under budget" : "Over budget"}</p>
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
