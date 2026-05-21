import { childrenFundLedger } from "@/lib/mockData";

export default function ChildrenFundLedgerTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Children Fund Ledger</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Description</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">Contribution</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">Running Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {childrenFundLedger.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{entry.description}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600 text-right">AED {entry.contribution.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">AED {entry.runningBalance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Total Contributions (10 months):</span> AED{" "}
            {(childrenFundLedger[0].runningBalance - childrenFundLedger[childrenFundLedger.length - 1].runningBalance + childrenFundLedger[childrenFundLedger.length - 1].contribution).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 text-right">
            <span className="font-semibold text-gray-900">Current Balance:</span> AED{" "}
            {childrenFundLedger[0].runningBalance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
