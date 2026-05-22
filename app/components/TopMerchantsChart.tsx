"use client";

import useTransactions from "@/app/hooks/useTransactions";
import { getTopMerchants } from "@/lib/transactionEngine";

export default function TopMerchantsChart() {
  const { transactions } = useTransactions();
  const topMerchants = getTopMerchants(transactions, 8);
  const maxAmount = topMerchants.length ? Math.max(...topMerchants.map((m) => m.amount)) : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Merchants</h2>
      
      <div className="space-y-4">
        {topMerchants.map((merchant) => {
          return (
            <div key={merchant.merchant} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-900">{merchant.merchant}</span>
                  <p className="text-xs text-gray-500">{merchant.transactionCount} transactions</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">AED {merchant.amount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${(merchant.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Total Merchant Spend:</span>{" "}
          AED {topMerchants.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
