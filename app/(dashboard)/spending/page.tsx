"use client";

import { useState } from "react";
import {
  spendingByCategory,
  topMerchants,
  monthlyBreakdown,
  deliverooTalabatMonthly,
  restaurantSpendingMonthly,
  cafeSpendingMonthly,
  financialSummary,
} from "@/lib/mockData";

export default function SpendingAnalysis() {
  const budgetVsActual = {
    budget: financialSummary.monthlyBudget,
    actual: financialSummary.actualLifestyleSpend,
    variance: financialSummary.actualLifestyleSpend - financialSummary.monthlyBudget,
  };

  const burnRate = (financialSummary.actualLifestyleSpend / monthlyBreakdown.income) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Spending Analysis</h1>
          <p className="text-sm text-gray-600 mt-1">Detailed breakdown of your spending patterns</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Monthly Burn Rate</p>
            <p className="text-2xl font-bold text-gray-900">{burnRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-2">of total income</p>
          </div>

          <div className="bg-white rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-red-600 text-sm font-medium mb-2">Budget vs Actual</p>
            <p className="text-2xl font-bold text-red-700">{((budgetVsActual.variance / budgetVsActual.budget) * 100).toFixed(0)}%</p>
            <p className="text-xs text-red-500 mt-2">Over budget</p>
          </div>

          <div className="bg-white rounded-lg border border-orange-200 bg-orange-50 p-6 shadow-sm">
            <p className="text-orange-600 text-sm font-medium mb-2">Hidden Leakage</p>
            <p className="text-2xl font-bold text-orange-700">AED {(deliverooTalabatMonthly.total + restaurantSpendingMonthly.total + cafeSpendingMonthly.total).toLocaleString()}</p>
            <p className="text-xs text-orange-500 mt-2">Food spending</p>
          </div>

          <div className="bg-white rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <p className="text-blue-600 text-sm font-medium mb-2">Controllable Spend</p>
            <p className="text-2xl font-bold text-blue-700">AED {(spendingByCategory.reduce((sum, cat) => sum + cat.amount, 0) - monthlyBreakdown.billsObligations).toLocaleString()}</p>
            <p className="text-xs text-blue-500 mt-2">Discretionary items</p>
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Spending by Category</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {spendingByCategory.map((category, index) => {
                const colors = [
                  "bg-blue-600",
                  "bg-blue-500",
                  "bg-blue-400",
                  "bg-cyan-400",
                  "bg-emerald-500",
                  "bg-teal-400",
                  "bg-indigo-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-red-500",
                ];
                const maxAmount = Math.max(...spendingByCategory.map(c => c.amount));

                return (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{category.category}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-700">AED {category.amount.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-2">({category.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${colors[index % colors.length]}`}
                        style={{ width: `${(category.amount / maxAmount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Food Spending Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deliveroo/Talabat */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deliveroo/Talabat</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">AED {deliverooTalabatMonthly.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transactions</span>
                <span className="text-gray-900">{deliverooTalabatMonthly.transactionCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average</span>
                <span className="text-gray-900">AED {deliverooTalabatMonthly.averageTransaction}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-gray-600 text-sm">% of lifestyle</span>
                <span className="font-semibold text-orange-600">{((deliverooTalabatMonthly.total / financialSummary.actualLifestyleSpend) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Restaurants */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurants</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">AED {restaurantSpendingMonthly.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fine Dining</span>
                <span className="text-gray-900">AED {restaurantSpendingMonthly.fine_dining}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Casual</span>
                <span className="text-gray-900">AED {restaurantSpendingMonthly.casual_dining}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-gray-600 text-sm">% of lifestyle</span>
                <span className="font-semibold text-blue-600">{((restaurantSpendingMonthly.total / financialSummary.actualLifestyleSpend) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Cafés */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cafés</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">AED {cafeSpendingMonthly.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transactions</span>
                <span className="text-gray-900">{cafeSpendingMonthly.transactionCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average</span>
                <span className="text-gray-900">AED {cafeSpendingMonthly.averageTransaction}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-gray-600 text-sm">% of lifestyle</span>
                <span className="font-semibold text-amber-600">{((cafeSpendingMonthly.total / financialSummary.actualLifestyleSpend) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Top Merchants */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Merchants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transactions</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topMerchants.map((merchant) => (
                  <tr key={merchant.merchant} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{merchant.merchant}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">AED {merchant.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{merchant.transactionCount}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-700">
                      {((merchant.amount / financialSummary.actualLifestyleSpend) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
