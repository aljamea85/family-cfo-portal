"use client";

import { useState } from "react";
import { importedTransactions } from "@/lib/mockData";

export default function TransactionImport() {
  const [transactions, setTransactions] = useState(importedTransactions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState("");

  const categories = [
    "Deliveroo/Talabat",
    "Restaurants",
    "Cafés",
    "Groceries",
    "Fuel/Transport",
    "Shopping",
    "Health",
    "Charity",
    "Family",
    "Bills/Obligations",
    "Miscellaneous",
  ];

  const handleCategoryChange = (id: string, newCategory: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, category: newCategory } : t
      )
    );
    setEditingId(null);
  };

  const handleImport = (id: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, status: "imported" as const } : t
      )
    );
  };

  const pendingCount = transactions.filter((t) => t.status === "pending").length;
  const importedCount = transactions.filter((t) => t.status === "imported").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Transaction Import</h1>
          <p className="text-sm text-gray-600 mt-1">Import and review transactions from your bank statements</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Upload Area */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Bank Statement</h3>
            <p className="text-gray-600 mb-4">Drag and drop or click to select CSV/PDF files</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Choose File
            </button>
            <p className="text-xs text-gray-500 mt-4">Supported formats: CSV, PDF (simulated upload)</p>
          </div>
        </section>

        {/* Import Status */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-xs text-gray-500 mt-2">Awaiting confirmation</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Imported</p>
            <p className="text-2xl font-bold text-green-600">{importedCount}</p>
            <p className="text-xs text-gray-500 mt-2">Successfully added</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              AED {transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">All transactions</p>
          </div>
        </section>

        {/* Transaction Review Table */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Review Transactions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Account</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Confidence</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className={`${transaction.status === "imported" ? "bg-green-50" : "hover:bg-gray-50"}`}>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{transaction.merchant}</td>
                    <td className="px-6 py-4">
                      {editingId === transaction.id ? (
                        <select
                          value={editCategory}
                          onChange={(e) => {
                            const newCategory = e.target.value;
                            setEditCategory(newCategory);
                            handleCategoryChange(transaction.id, newCategory);
                          }}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          onClick={() => {
                            setEditingId(transaction.id);
                            setEditCategory(transaction.category);
                          }}
                          className="cursor-pointer text-blue-600 hover:text-blue-700 underline"
                        >
                          {transaction.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">{transaction.account}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                      AED {transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          (transaction.confidence || 0) >= 95
                            ? "bg-green-100 text-green-800"
                            : (transaction.confidence || 0) >= 80
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.confidence}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === "imported"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status === "imported" ? "✓ Imported" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {transaction.status === "pending" && (
                        <button
                          onClick={() => handleImport(transaction.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          Import
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              <strong>{importedCount}</strong> transaction{importedCount !== 1 ? "s" : ""} imported
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Import All
            </button>
          </div>
        </section>

        {/* Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Import Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click on any category to correct it manually</li>
            <li>• Confidence score indicates how certain the auto-categorization is</li>
            <li>• Review all transactions before importing to ensure accuracy</li>
            <li>• You can edit category details after import if needed</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
