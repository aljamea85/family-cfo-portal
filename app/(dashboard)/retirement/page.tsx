"use client";

import {
  retirementLedger,
  retirementAllocation,
  retirementTargetAllocation,
  financialSummary,
} from "@/lib/mockData";

export default function RetirementPortfolio() {
  const monthlyContribution = 8000;
  const yearsToRetirement = 22;
  const projectedValue = (487500 + monthlyContribution * 12 * yearsToRetirement * 1.05) * 1.05;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Retirement Portfolio</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage your retirement investments</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Portfolio Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Current Portfolio</p>
            <p className="text-2xl font-bold text-blue-600">
              AED {financialSummary.retirementPortfolioValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">As of May 2026</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Monthly Contribution</p>
            <p className="text-2xl font-bold text-green-600">AED {monthlyContribution.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Consistent deposits</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Years to Retirement</p>
            <p className="text-2xl font-bold text-purple-600">{yearsToRetirement}</p>
            <p className="text-xs text-gray-500 mt-2">Target age: 60</p>
          </div>

          <div className="bg-white rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
            <p className="text-green-600 text-sm font-medium mb-2">Projected Value</p>
            <p className="text-2xl font-bold text-green-700">
              AED {(projectedValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-green-500 mt-2">At 5% annual return</p>
          </div>
        </section>

        {/* Current Allocation */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Allocation</h2>
          <div className="space-y-4">
            {retirementAllocation.map((allocation, index) => {
              const colors = ["bg-blue-600", "bg-orange-500", "bg-green-500", "bg-gray-400"];
              return (
                <div key={allocation.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{allocation.type}</span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        AED {allocation.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">({allocation.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${colors[index % colors.length]}`}
                      style={{ width: `${allocation.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Target Allocation */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Target Allocation (Age 50)</h2>
          <p className="text-sm text-gray-600 mb-6">
            Recommended allocation becomes more conservative as you approach retirement
          </p>
          <div className="space-y-4">
            {retirementTargetAllocation.map((allocation, index) => {
              const colors = ["bg-blue-500", "bg-orange-400", "bg-green-400", "bg-gray-300"];
              return (
                <div key={allocation.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{allocation.type}</span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        AED {allocation.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">({allocation.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${colors[index % colors.length]}`}
                      style={{ width: `${allocation.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contribution Plan */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Contribution Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded">
              <p className="text-gray-600 text-sm mb-2">Annual Contribution</p>
              <p className="text-2xl font-bold text-gray-900">
                AED {(monthlyContribution * 12).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">AED {monthlyContribution.toLocaleString()}/month</p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded">
              <p className="text-gray-600 text-sm mb-2">Total 22-Year Contribution</p>
              <p className="text-2xl font-bold text-gray-900">
                AED {(monthlyContribution * 12 * yearsToRetirement / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-gray-500 mt-2">Principal only</p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded bg-green-50">
              <p className="text-green-600 text-sm mb-2">Investment Returns (est.)</p>
              <p className="text-2xl font-bold text-green-700">
                AED {((projectedValue - monthlyContribution * 12 * yearsToRetirement - 487500) / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-green-600 mt-2">At 5% annual return</p>
            </div>
          </div>
        </section>

        {/* Ledger Transactions */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Contributions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Contribution</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {retirementLedger.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-right">
                      AED {entry.contribution.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      AED {entry.runningBalance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-4">💡 Retirement Insights</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Your current trajectory projects AED {(projectedValue / 1000000).toFixed(1)}M by retirement age</li>
            <li>• Consider increasing contributions if lifestyle spending reduces</li>
            <li>• Current allocation (45% equities) is appropriate for your age</li>
            <li>• Review allocation yearly and shift to bonds as you approach 50</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
