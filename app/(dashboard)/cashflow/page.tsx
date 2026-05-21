"use client";

import { cashflowBuckets, monthlyBreakdown } from "@/lib/mockData";

export default function CashflowBuckets() {
  const totalIncome = monthlyBreakdown.income;
  const totalAllocated = Object.values(monthlyBreakdown)
    .filter((v) => typeof v === "number" && v > 0)
    .reduce((sum, v) => sum + v, 0);

  const buckets = cashflowBuckets.map((bucket) => ({
    ...bucket,
    percentage: (bucket.amount / totalIncome) * 100,
    targetPercentage: bucket.targetAmount ? (bucket.targetAmount / totalIncome) * 100 : 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Cashflow Buckets</h1>
          <p className="text-sm text-gray-600 mt-1">How your monthly income flows across different accounts</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Income Overview */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Income & Allocation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Monthly Income</p>
              <p className="text-3xl font-bold text-green-600">AED {totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Allocated</p>
              <p className="text-3xl font-bold text-blue-600">AED {totalAllocated.toLocaleString()}</p>
              {monthlyBreakdown.unallocated < 0 && (
                <p className="text-xs text-red-600 mt-1">
                  Over budget by AED {Math.abs(monthlyBreakdown.unallocated).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Cashflow Waterfall */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Cashflow Waterfall</h2>
          </div>

          <div className="p-6 space-y-4">
            {buckets.map((bucket) => (
              <div key={bucket.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${bucket.color}`} />
                    <span className="font-medium text-gray-900">{bucket.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      AED {bucket.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bucket.percentage.toFixed(1)}% of income
                    </p>
                  </div>
                </div>

                {/* Main bucket bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                    <div
                      className={`h-full ${bucket.color} transition-all duration-300 flex items-center justify-end pr-2`}
                      style={{ width: `${bucket.percentage}%` }}
                    >
                      {bucket.percentage > 5 && (
                        <span className="text-white text-xs font-semibold">{bucket.percentage.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-right">
                    Target: {bucket.targetPercentage.toFixed(1)}%
                  </span>
                </div>

                {bucket.targetAmount && bucket.amount !== bucket.targetAmount && (
                  <p className="text-xs text-gray-600 ml-0">
                    {bucket.amount > bucket.targetAmount
                      ? `⚠️ Over target by AED ${(bucket.amount - bucket.targetAmount).toLocaleString()}`
                      : `✓ Under target by AED ${(bucket.targetAmount - bucket.amount).toLocaleString()}`}
                  </p>
                )}

                <p className="text-xs text-gray-500">{bucket.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bucket Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buckets.map((bucket) => (
            <div key={bucket.name} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-6 h-6 rounded ${bucket.color}`} />
                <h3 className="text-base font-semibold text-gray-900">{bucket.name}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Current</p>
                  <p className="text-2xl font-bold text-gray-900">
                    AED {bucket.amount.toLocaleString()}
                  </p>
                </div>

                {bucket.targetAmount && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Target</p>
                    <p className="text-lg font-semibold text-gray-700">
                      AED {bucket.targetAmount.toLocaleString()}
                    </p>
                  </div>
                )}

                <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                  {bucket.description}
                </p>

                {bucket.targetAmount && (
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${bucket.color} transition-all duration-300`}
                      style={{ width: `${Math.min((bucket.amount / bucket.targetAmount) * 100, 100)}%` }}
                    />
                  </div>
                )}

                {bucket.targetAmount && (
                  <p className={`text-xs font-semibold ${bucket.amount >= bucket.targetAmount ? "text-green-600" : "text-yellow-600"}`}>
                    {bucket.amount >= bucket.targetAmount
                      ? `✓ Target met`
                      : `${Math.round(((bucket.targetAmount - bucket.amount) / bucket.targetAmount) * 100)}% to target`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Monthly Allocation Summary */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Allocation Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Income</span>
              <span className="font-semibold text-gray-900">AED {monthlyBreakdown.income.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Allocated</span>
              <span className="font-semibold text-gray-900">AED {totalAllocated.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-600 font-medium">Remaining/Deficit</span>
              <span
                className={`font-bold ${
                  monthlyBreakdown.unallocated >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                AED {monthlyBreakdown.unallocated.toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
