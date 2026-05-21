"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type DragEvent } from "react";
import { importedTransactions as sampleTransactions } from "@/lib/mockData";
import {
  parseCsv,
  autoMapHeaders,
  buildPreviewRow,
  buildImportedTransaction,
  ParsedPreviewRow,
} from "@/lib/transactionEngine";
import {
  csvTransactionFieldKeys,
  csvFieldLabels,
  CsvTransactionFieldKey,
  transactionCategories,
} from "@/lib/transactionModel";
import type { ImportedTransaction } from "@/lib/transactionModel";

const initialMapping = (headers: string[]) => autoMapHeaders(headers);

export default function TransactionImport() {
  const [fileName, setFileName] = useState("No file selected");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [columnMap, setColumnMap] = useState<Record<string, string>>({});
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [categoryOverrides, setCategoryOverrides] = useState<Record<number, string>>({});
  const [transactions, setTransactions] = useState<ImportedTransaction[]>(() => {
    if (typeof window === "undefined") return sampleTransactions;
    const stored = window.localStorage.getItem("fcp-imported-transactions");
    return stored ? (JSON.parse(stored) as ImportedTransaction[]) : sampleTransactions;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("fcp-imported-transactions", JSON.stringify(transactions));
  }, [transactions]);

  const mappedRows = useMemo(() => {
    if (!headers.length || !rows.length) return [];
    return rows.map((row, rowIndex) =>
      buildPreviewRow(row, headers, columnMap, rowIndex, categoryOverrides[rowIndex] as any)
    );
  }, [headers, rows, columnMap, categoryOverrides]);

  const previewRows = mappedRows.slice(0, 10);
  const validCount = mappedRows.filter((row) => row.errors.length === 0).length;
  const invalidCount = mappedRows.length - validCount;

  const fileInputId = "csv-upload-input";

  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    const parsed = parseCsv(text);
    setFileName(file.name);
    setHeaders(parsed.headers);
    setRows(parsed.rows);
    setParseErrors(parsed.errors);
    setColumnMap(initialMapping(parsed.headers));
    setCategoryOverrides({});
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      await handleFileUpload(event.dataTransfer.files[0]);
    }
  };

  const updateMapping = (field: CsvTransactionFieldKey, header: string) => {
    setColumnMap((prev) => ({ ...prev, [field]: header }));
  };

  const updateRowCategory = (rowIndex: number, category: string) => {
    setCategoryOverrides((prev) => ({ ...prev, [rowIndex]: category }));
  };

  const importAll = () => {
    const newTransactions = mappedRows
      .filter((row) => row.errors.length === 0)
      .map((row) => ({ ...buildImportedTransaction(row), status: "imported" as const }));

    if (newTransactions.length > 0) {
      setTransactions((current) => [...newTransactions, ...current]);
      setHeaders([]);
      setRows([]);
      setColumnMap({});
      setCategoryOverrides({});
      setFileName("No file selected");
      setParseErrors([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Transaction Import</h1>
          <p className="text-sm text-gray-600 mt-1">Upload CSV transactions, map fields, validate data, and preview import results.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section>
          <div
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center cursor-pointer hover:border-slate-400 transition"
          >
            <div className="text-5xl">📤</div>
            <p className="text-lg font-semibold text-slate-900 mt-4">Upload a CSV file to preview transactions</p>
            <p className="text-sm text-slate-500 mt-2">Drop the file here or select it manually.</p>
            <label htmlFor={fileInputId} className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              Choose CSV file
            </label>
            <input id={fileInputId} type="file" accept=".csv,text/csv" onChange={handleFileChange} className="hidden" />
            <p className="text-xs text-slate-500 mt-3">{fileName}</p>
          </div>
        </section>

        {parseErrors.length > 0 && (
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
            <p className="font-semibold">CSV validation issues:</p>
            <ul className="list-disc pl-5 mt-2">
              {parseErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </section>
        )}

        {headers.length > 0 && (
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Map CSV columns</h2>
                <p className="text-sm text-slate-600 mt-1">Review the matched fields and update any missing mappings.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {csvTransactionFieldKeys.map((field) => (
                  <label key={field} className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium">{csvFieldLabels[field]}</span>
                    <select
                      value={columnMap[field] || ""}
                      onChange={(event) => updateMapping(field, event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                    >
                      <option value="">(Not mapped)</option>
                      {headers.map((header) => (
                        <option key={header} value={header}>{header}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}

        {mappedRows.length > 0 && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Rows ready to import</p>
                <p className="text-3xl font-semibold text-slate-900 mt-2">{mappedRows.length}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Valid rows</p>
                <p className="text-3xl font-semibold text-emerald-700 mt-2">{validCount}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Invalid rows</p>
                <p className="text-3xl font-semibold text-rose-700 mt-2">{invalidCount}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Row</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Merchant</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Account</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Confidence</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {previewRows.map((row) => (
                    <tr key={row.id} className={row.errors.length > 0 ? "bg-rose-50" : "hover:bg-slate-50"}>
                      <td className="px-4 py-3 text-slate-700">{row.rowIndex + 1}</td>
                      <td className="px-4 py-3 text-slate-900">{row.date || "—"}</td>
                      <td className="px-4 py-3 text-slate-900">{row.merchant || "—"}</td>
                      <td className="px-4 py-3 text-slate-900">{row.amount !== undefined ? `AED ${row.amount.toLocaleString()}` : "—"}</td>
                      <td className="px-4 py-3 text-slate-700">{row.account || "Unassigned"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={row.category}
                          onChange={(event) => updateRowCategory(row.rowIndex, event.target.value)}
                          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        >
                          {transactionCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${row.confidence >= 95 ? "bg-emerald-100 text-emerald-800" : row.confidence >= 80 ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"}`}>
                          {row.confidence}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {row.errors.length > 0 ? (
                          <span className="rounded-full bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-700">Needs review</span>
                        ) : (
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">Ready</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {invalidCount > 0 && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                A few rows contain missing or invalid values. Correct the mapping or fix those rows before import.
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Auto-categorization rules</p>
                <p>Deliveroo / Talabat → Deliveroo/Talabat</p>
                <p>Saddle → Cafés</p>
                <p>Jones → Restaurants</p>
                <p>ADNOC → Fuel</p>
              </div>
              <button
                onClick={importAll}
                disabled={validCount === 0}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Import Valid Rows
              </button>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Imported transactions</p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">{transactions.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending review</p>
            <p className="text-3xl font-semibold text-amber-700 mt-2">{transactions.filter((txn) => txn.status === "pending").length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Imported to ledger</p>
            <p className="text-3xl font-semibold text-emerald-700 mt-2">{transactions.filter((txn) => txn.status === "imported").length}</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Category system</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {transactionCategories.map((category) => (
              <div key={category} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {category}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
