import {
  ImportedTransaction,
  Transaction,
  TransactionCategory,
  defaultTransactionCategory,
  merchantAutoCategories,
  transactionCategories,
} from "./transactionModel";

export interface CsvParseResult {
  headers: string[];
  rows: string[][];
  errors: string[];
}

export interface ParsedPreviewRow {
  id: string;
  rowIndex: number;
  raw: string[];
  date?: string;
  merchant?: string;
  amount?: number;
  account?: string;
  category?: TransactionCategory;
  subcategory?: string;
  notes?: string;
  description?: string;
  tags?: string[];
  confidence: number;
  errors: string[];
}

export function parseCsv(text: string): CsvParseResult {
  const rows = text
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter((row) => row.length > 0);

  if (rows.length === 0) {
    return { headers: [], rows: [], errors: ["Uploaded file is empty."] };
  }

  const parsedRows: string[][] = rows.map((row) => parseCsvRow(row));
  const headerRow = parsedRows[0] || [];
  const headerLength = headerRow.length;

  const errors: string[] = [];
  parsedRows.slice(1).forEach((row, index) => {
    if (row.length !== headerLength) {
      errors.push(`Row ${index + 2} has ${row.length} columns but expected ${headerLength}.`);
    }
  });

  return { headers: headerRow, rows: parsedRows.slice(1), errors };
}

function parseCsvRow(row: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < row.length; index += 1) {
    const char = row[index];

    if (char === '"') {
      if (inQuotes && row[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

export function autoMapHeaders(headers: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  const normalized = headers.map((header) => header.toLowerCase());

  for (const key of [
    "date",
    "merchant",
    "amount",
    "account",
    "category",
    "subcategory",
    "notes",
    "tags",
  ] as const) {
    const index = normalized.findIndex((header) => header === key || header.includes(key));
    map[key] = index >= 0 ? headers[index] : "";
  }

  return map;
}

export function normalizeMerchant(value: string): string {
  return value.trim().toLowerCase();
}

export function categorizeMerchant(merchant: string): TransactionCategory {
  const normalized = normalizeMerchant(merchant);
  for (const match of Object.keys(merchantAutoCategories)) {
    if (normalized.includes(match)) {
      return merchantAutoCategories[match];
    }
  }
  return defaultTransactionCategory;
}

export function buildPreviewRow(
  row: string[],
  headers: string[],
  columnMap: Record<string, string>,
  rowIndex: number,
  categoryOverride?: TransactionCategory
): ParsedPreviewRow {
  const getValue = (field: string) => {
    const header = columnMap[field] || "";
    const index = headers.findIndex((value) => value === header);
    return index >= 0 ? row[index] : "";
  };

  const rawDate = getValue("date");
  const rawMerchant = getValue("merchant");
  const rawAmount = getValue("amount");
  const rawAccount = getValue("account");
  const rawCategory = getValue("category");
  const rawSubcategory = getValue("subcategory");
  const rawNotes = getValue("notes");
  const rawTags = getValue("tags");

  const errors: string[] = [];
  const date = rawDate ? new Date(rawDate) : undefined;
  const amount = rawAmount ? Number(rawAmount.replace(/[^0-9.-]/g, "")) : undefined;

  if (!rawDate) {
    errors.push("Missing date.");
  } else if (!date || Number.isNaN(date.getTime())) {
    errors.push("Invalid date format.");
  }

  if (!rawMerchant) {
    errors.push("Missing merchant.");
  }

  if (!rawAmount) {
    errors.push("Missing amount.");
  } else if (amount === undefined || Number.isNaN(amount)) {
    errors.push("Invalid amount.");
  }

  const autoCategory = rawCategory
    ? (transactionCategories.includes(rawCategory as TransactionCategory)
      ? (rawCategory as TransactionCategory)
      : categorizeMerchant(rawMerchant))
    : categorizeMerchant(rawMerchant);

  const category = categoryOverride || (rawCategory ? (transactionCategories.includes(rawCategory as TransactionCategory) ? (rawCategory as TransactionCategory) : autoCategory) : autoCategory);

  const confidence = rawCategory
    ? 95
    : merchantAutoCategories[normalizeMerchant(rawMerchant)]
    ? 90
    : 70;

  return {
    id: `preview-${rowIndex + 1}`,
    rowIndex,
    raw: row,
    date: date?.toISOString().slice(0, 10),
    merchant: rawMerchant,
    amount,
    account: rawAccount || "",
    category,
    subcategory: rawSubcategory || "",
    notes: rawNotes || "",
    description: rawNotes || rawMerchant,
    tags: rawTags ? rawTags.split(/[,;]+/).map((value) => value.trim()).filter(Boolean) : [],
    confidence,
    errors,
  };
}

export function buildTransactionFromPreview(preview: ParsedPreviewRow): Transaction {
  return {
    id: `txn-${preview.rowIndex + 1}-${Date.now()}`,
    date: preview.date || new Date().toISOString().slice(0, 10),
    merchant: preview.merchant || "Unknown Merchant",
    amount: preview.amount || 0,
    account: preview.account || "Unassigned",
    transactionType: "expense",
    category: preview.category ?? defaultTransactionCategory,
    subcategory: preview.subcategory || "",
    notes: preview.notes || "",
    description: preview.description || preview.notes || preview.merchant || "Imported transaction",
    confidence: preview.confidence,
    tags: preview.tags || [],
  };
}

export function buildImportedTransaction(preview: ParsedPreviewRow): ImportedTransaction {
  return {
    ...buildTransactionFromPreview(preview),
    status: preview.errors.length > 0 ? "rejected" : "pending",
  };
}

export function getTotalSpend(transactions: Transaction[]): number {
  return transactions.reduce((sum, transaction) => sum + getBudgetImpact(transaction), 0);
}

export function getBudgetImpact(transaction: Transaction): number {
  // user-entered amount is always positive; impact depends on transactionType
  switch (transaction.transactionType) {
    case "expense":
      return Math.abs(transaction.amount);
    case "refund":
      return -Math.abs(transaction.amount);
    default:
      return 0;
  }
}

export function getBurnRate(totalSpend: number, budget: number): number {
  return budget === 0 ? 0 : (totalSpend / budget) * 100;
}

export function getCategoryTotals(transactions: Transaction[]) {
  const totals: Record<TransactionCategory, number> = transactionCategories.reduce(
    (memo, category) => ({ ...memo, [category]: 0 }),
    {} as Record<TransactionCategory, number>
  );

  transactions.forEach((transaction) => {
    const impact = getBudgetImpact(transaction);
    if (impact === 0) return;
    totals[transaction.category] = (totals[transaction.category] ?? 0) + Math.max(0, impact);
  });

  const totalSpend = getTotalSpend(transactions);

  return transactionCategories
    .map((category) => ({
      category,
      amount: totals[category],
      percentage: totalSpend === 0 ? 0 : Number(((totals[category] / totalSpend) * 100).toFixed(1)),
    }))
    .filter((group) => group.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

export function getTopMerchants(transactions: Transaction[], limit = 8) {
  const totals: Record<string, { amount: number; count: number }> = {};
  transactions.forEach((transaction) => {
    const merchant = transaction.merchant || "Unknown";
    const impact = getBudgetImpact(transaction);
    if (impact === 0) return;
    totals[merchant] = totals[merchant] || { amount: 0, count: 0 };
    totals[merchant].amount += Math.max(0, impact);
    totals[merchant].count += 1;
  });

  return Object.entries(totals)
    .map(([merchant, stats]) => ({ merchant, amount: stats.amount, transactionCount: stats.count }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

export function getMonthlySpendingTrend(transactions: Transaction[], months = 12) {
  const monthBuckets: Record<string, number> = {};
  const now = new Date();
  const monthLabels: string[] = [];

  for (let index = months - 1; index >= 0; index -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const label = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    monthBuckets[label] = 0;
    monthLabels.push(label);
  }

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    if (Number.isNaN(date.getTime())) {
      return;
    }

    const impact = getBudgetImpact(transaction);
    if (impact === 0) return;

    const label = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (label in monthBuckets) {
      monthBuckets[label] += Math.max(0, impact);
    }
  });

  return monthLabels.map((month) => ({ month, amount: monthBuckets[month] }));
}
