import OverviewCards from "./components/OverviewCards";
import SpendingTrendChart from "./components/SpendingTrendChart";
import SpendingByCategoryChart from "./components/SpendingByCategoryChart";
import TopMerchantsChart from "./components/TopMerchantsChart";
import RecentTransactionsTable from "./components/RecentTransactionsTable";
import RetirementLedgerTable from "./components/RetirementLedgerTable";
import ChildrenFundLedgerTable from "./components/ChildrenFundLedgerTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Family CFO Portal</h1>
              <p className="text-sm text-gray-600 mt-1">Financial Overview & Management</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">May 2026</p>
              <p className="text-xs text-gray-500 mt-1">Current Period</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards Section */}
        <section className="mb-12">
          <OverviewCards />
        </section>

        {/* Charts Section */}
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
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Insights</h2>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">•</span>
                    <span><strong>Budget Alert:</strong> 190% over lifestyle budget this month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-3">•</span>
                    <span><strong>Top Spender:</strong> Deliveroo dominates with 15 transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">•</span>
                    <span><strong>Retirement Growth:</strong> AED 487,500 accumulated</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-bold mr-3">•</span>
                    <span><strong>Children Fund:</strong> AED 125,000 with consistent AED 1,500/month contributions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Spending Trend Chart */}
        <section className="mb-12">
          <SpendingTrendChart />
        </section>

        {/* Tables Section */}
        <section className="mb-12">
          <div className="space-y-8">
            <RecentTransactionsTable />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RetirementLedgerTable />
              <ChildrenFundLedgerTable />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>Family CFO Portal v1.0 • Data is for demonstration purposes only</p>
        </footer>
      </main>
    </div>
  );
}
