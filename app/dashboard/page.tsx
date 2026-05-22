import DashboardMetrics from "@/app/components/DashboardMetrics";
import SpendingTrendChart from "@/app/components/SpendingTrendChart";
import SpendingByCategoryChart from "@/app/components/SpendingByCategoryChart";
import TopMerchantsChart from "@/app/components/TopMerchantsChart";
import KeyMetrics from "@/app/components/KeyMetrics";

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
              <KeyMetrics />
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
