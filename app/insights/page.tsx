"use client";

import { insights } from "@/lib/mockData";

export default function InsightsPage() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "alert":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "success":
        return "bg-green-50 border-green-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextStyles = (status: string) => {
    switch (status) {
      case "alert":
        return "text-red-700";
      case "warning":
        return "text-yellow-700";
      case "success":
        return "text-green-700";
      case "info":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  const alertInsights = insights.filter((i) => i.status === "alert");
  const warningInsights = insights.filter((i) => i.status === "warning");
  const positiveInsights = insights.filter((i) => i.status === "success" || i.status === "info");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Financial Insights</h1>
          <p className="text-sm text-gray-600 mt-1">AI-powered recommendations and alerts</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Critical Alerts */}
        {alertInsights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🚨</span> Critical Alerts
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {alertInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`rounded-lg border-2 p-6 shadow-sm ${getStatusStyles(insight.status)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{insight.icon}</span>
                      <h3 className={`text-lg font-bold ${getTextStyles(insight.status)}`}>
                        {insight.title}
                      </h3>
                    </div>
                    <p className={`text-2xl font-bold ${getTextStyles(insight.status)}`}>
                      {insight.value}
                    </p>
                  </div>
                  <p className={`text-sm ${getTextStyles(insight.status)}`}>
                    {insight.description}
                  </p>
                  <button className="mt-4 text-sm font-semibold px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors">
                    Take Action
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Warnings */}
        {warningInsights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> Warnings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warningInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`rounded-lg border-2 p-6 shadow-sm ${getStatusStyles(insight.status)}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{insight.icon}</span>
                    <h3 className={`text-base font-bold ${getTextStyles(insight.status)}`}>
                      {insight.title}
                    </h3>
                  </div>
                  <p className={`text-xl font-bold ${getTextStyles(insight.status)} mb-2`}>
                    {insight.value}
                  </p>
                  <p className={`text-sm ${getTextStyles(insight.status)}`}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Positive Insights */}
        {positiveInsights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">✨</span> Positive Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {positiveInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`rounded-lg border-2 p-6 shadow-sm ${getStatusStyles(insight.status)}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{insight.icon}</span>
                    <h3 className={`text-base font-bold ${getTextStyles(insight.status)}`}>
                      {insight.title}
                    </h3>
                  </div>
                  <p className={`text-xl font-bold ${getTextStyles(insight.status)} mb-2`}>
                    {insight.value}
                  </p>
                  <p className={`text-sm ${getTextStyles(insight.status)}`}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">💡 Recommendations</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-1">Reduce Lifestyle Spending</h3>
              <p className="text-sm text-gray-600">
                You're spending 3x your budget. Consider setting daily limits or using spending apps to track in real-time.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-1">Optimize Food Delivery</h3>
              <p className="text-sm text-gray-600">
                Your food delivery spending (18.5%) is the biggest controllable expense. Meal prep 2-3 days/week to save AED 500-800/month.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-1">Build Emergency Fund</h3>
              <p className="text-sm text-gray-600">
                You're short AED 9,700 for a 3-month emergency buffer. Prioritize this before other investments.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-1">On Track with Retirement</h3>
              <p className="text-sm text-gray-600">
                Your AED 8,000/month contribution is solid. Consider rebalancing to 35% equities as you approach retirement.
              </p>
            </div>
          </div>
        </section>

        {/* Financial Goals */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">📊 Financial Goals Progress</h2>

          <div className="space-y-6">
            {/* Goal 1: Emergency Fund */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Emergency Reserve (3-6 months)</span>
                <span className="text-sm text-gray-600">19% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-orange-500 w-1/5" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Current: AED 2,300 → Target: AED 12,000</p>
            </div>

            {/* Goal 2: Children Fund */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Children Education Fund</span>
                <span className="text-sm text-gray-600">Ongoing</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-green-500 w-3/5" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Current: AED 125,000 → 10+ years at current rate</p>
            </div>

            {/* Goal 3: Retirement */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Retirement Portfolio</span>
                <span className="text-sm text-gray-600">On Track</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-blue-500 w-2/3" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Current: AED 487,500 → Projected: AED 2.8M</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
