"use client";

import {
  childrenFundLedger,
  childrenAllocation,
  financialSummary,
} from "@/lib/mockData";

export default function ChildrenFund() {
  const monthlyContribution = 1500;
  const yearsToUse = 10;
  const projectedValue = 125000 + monthlyContribution * 12 * yearsToUse * 1.04;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Children Fund</h1>
          <p className="text-sm text-gray-600 mt-1">Education and future fund management</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Fund Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Current Fund Balance</p>
            <p className="text-2xl font-bold text-green-600">
              AED {financialSummary.childrenFundValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">As of May 2026</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Monthly Contribution</p>
            <p className="text-2xl font-bold text-purple-600">AED {monthlyContribution.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Consistent deposits</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Years to Maturity</p>
            <p className="text-2xl font-bold text-blue-600">{yearsToUse}</p>
            <p className="text-xs text-gray-500 mt-2">Before university expenses</p>
          </div>

          <div className="bg-white rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
            <p className="text-green-600 text-sm font-medium mb-2">Projected Value</p>
            <p className="text-2xl font-bold text-green-700">
              AED {(projectedValue / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-green-500 mt-2">At 4% annual return</p>
          </div>
        </section>

        {/* Fund Purpose & Goals */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Fund Purpose & Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Primary Objectives</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ University education costs</li>
                <li>✓ Living expenses during study</li>
                <li>✓ Post-graduation support</li>
                <li>✓ Emergency fund for children</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Estimated Costs</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• University: AED 250K - 350K (4 years)</li>
                <li>• Living expenses: AED 100K - 150K</li>
                <li>• Total needed: AED 350K - 500K</li>
                <li>• Current trajectory: AED {(projectedValue / 1000).toFixed(0)}K ✓</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Current Allocation */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Allocation</h2>
          <p className="text-sm text-gray-600 mb-6">Growth-oriented allocation appropriate for 10-year horizon</p>
          <div className="space-y-4">
            {childrenAllocation.map((allocation, index) => {
              const colors = ["bg-emerald-600", "bg-blue-500", "bg-gray-400"];
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
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Contribution & Growth Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded">
              <p className="text-gray-600 text-sm mb-2">Annual Contribution</p>
              <p className="text-2xl font-bold text-gray-900">
                AED {(monthlyContribution * 12).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">AED {monthlyContribution.toLocaleString()}/month</p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded">
              <p className="text-gray-600 text-sm mb-2">10-Year Contribution</p>
              <p className="text-2xl font-bold text-gray-900">
                AED {(monthlyContribution * 12 * yearsToUse / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-gray-500 mt-2">Principal only</p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded bg-green-50">
              <p className="text-green-600 text-sm mb-2">Investment Returns (est.)</p>
              <p className="text-2xl font-bold text-green-700">
                AED {((projectedValue - monthlyContribution * 12 * yearsToUse - 125000) / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-green-600 mt-2">At 4% annual return</p>
            </div>
          </div>
        </section>

        {/* Scenario Analysis */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Fund Growth Scenarios</h2>
          <div className="space-y-4">
            {[
              { scenario: "Conservative (2% return)", value: 125000 + monthlyContribution * 12 * yearsToUse * 1.02, growth: 1.02 },
              { scenario: "Base Case (4% return)", value: projectedValue, growth: 1.04 },
              { scenario: "Optimistic (6% return)", value: 125000 + monthlyContribution * 12 * yearsToUse * 1.06, growth: 1.06 },
            ].map((scenario) => (
              <div key={scenario.scenario} className="border border-gray-200 rounded p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-900">{scenario.scenario}</span>
                  <span className="text-xl font-bold text-gray-900">
                    AED {(scenario.value / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            ))}
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
                {childrenFundLedger.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600 text-right">
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-4">✨ Children Fund Insights</h3>
          <ul className="text-sm text-green-800 space-y-2">
            <li>✓ You're on track to meet education goals with current contribution</li>
            <li>✓ Current growth-focused allocation (60% growth) is ideal for 10-year horizon</li>
            <li>• Consider starting to shift to bonds in year 8 as university approaches</li>
            <li>• If you reduce lifestyle spending, consider increasing contributions to AED 2K/month</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
