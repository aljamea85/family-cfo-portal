import SpendingMetrics from "@/app/components/SpendingMetrics";

export default function SpendingAnalysis() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Spending Analysis</h1>
          <p className="text-sm text-gray-600 mt-1">Budget Within Month and spend velocity tracking</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <SpendingMetrics />
      </main>
    </div>
  );
}
