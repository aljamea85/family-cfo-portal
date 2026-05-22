import DashboardMetrics from "@/app/components/DashboardMetrics";
import SpendingTrendChart from "@/app/components/SpendingTrendChart";
import SpendingByCategoryChart from "@/app/components/SpendingByCategoryChart";
import TopMerchantsChart from "@/app/components/TopMerchantsChart";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Your financial overview at a glance</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-12">
          <DashboardMetrics />
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SpendingByCategoryChart />
            </div>
            <div className="lg:col-span-1">
              <TopMerchantsChart />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h2>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">•</span>
                    <span><strong>Budget Status:</strong> 190% over target</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-3">•</span>
                    <span><strong>Top Spender:</strong> Food delivery (18.5%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">•</span>
                    <span><strong>Retirement Fund:</strong> AED 487.5K</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-bold mr-3">•</span>
                    <span><strong>Children Fund:</strong> AED 125K</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <SpendingTrendChart />
        </section>
      </main>
    </div>
  );
}
