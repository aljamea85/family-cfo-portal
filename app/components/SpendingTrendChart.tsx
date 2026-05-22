"use client";

import useTransactions from "@/app/hooks/useTransactions";
import { getMonthlySpendingTrend } from "@/lib/transactionEngine";

export default function SpendingTrendChart() {
  const { transactions } = useTransactions();
  const monthlySpendingTrend = getMonthlySpendingTrend(transactions, 12);
  const minValue = monthlySpendingTrend.length ? Math.min(...monthlySpendingTrend.map((d) => d.amount)) : 0;
  const maxValue = monthlySpendingTrend.length ? Math.max(...monthlySpendingTrend.map((d) => d.amount)) : 0;
  const range = Math.max(1, maxValue - minValue);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h2>
      
      <div className="flex items-end justify-between gap-2 h-64">
        {monthlySpendingTrend.map((data, index) => {
          const heightPercent = ((data.amount - minValue) / range) * 100;
          const isCurrentMonth = index === monthlySpendingTrend.length - 1;
          
          return (
            <div key={data.month} className="flex flex-col items-center flex-1 gap-2">
              <div className="relative w-full h-full flex items-end justify-center group">
                <div
                  className={`w-full transition-colors duration-200 rounded-t ${
                    isCurrentMonth ? "bg-blue-600" : "bg-blue-300 hover:bg-blue-400"
                  }`}
                  style={{ height: `${Math.max(heightPercent, 5)}%` }}
                >
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    AED {data.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-600 text-center font-medium hidden lg:block">{data.month.split(" ")[0]}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Average Monthly Spend:</span>{" "}
          AED {(monthlySpendingTrend.reduce((sum, d) => sum + d.amount, 0) / monthlySpendingTrend.length).toFixed(0)}
        </p>
      </div>
    </div>
  );
}
