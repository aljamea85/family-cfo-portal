export type TransactionCategory =
  | "Deliveroo/Talabat"
  | "Delivery"
  | "Restaurants"
  | "Cafés"
  | "Groceries"
  | "Fuel"
  | "Shopping"
  | "Family"
  | "Charity"
  | "Health"
  | "Investments"
  | "Miscellaneous";

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  account: string;
  category: TransactionCategory;
  subcategory: string;
  notes: string;
  description: string;
  confidence: number;
  tags: string[];
}

export interface ImportedTransaction extends Transaction {
  status: "pending" | "imported" | "rejected";
}

export const transactionCategories: TransactionCategory[] = [
  "Deliveroo/Talabat",
  "Delivery",
  "Restaurants",
  "Cafés",
  "Groceries",
  "Fuel",
  "Shopping",
  "Family",
  "Charity",
  "Health",
  "Investments",
  "Miscellaneous",
];

export const merchantAutoCategories: Record<string, TransactionCategory> = {
  deliveroo: "Deliveroo/Talabat",
  talabat: "Deliveroo/Talabat",
  saddle: "Cafés",
  jones: "Restaurants",
  adnoc: "Fuel",
};

export const defaultTransactionCategory: TransactionCategory = "Miscellaneous";

export const csvTransactionFieldKeys = [
  "date",
  "merchant",
  "amount",
  "account",
  "category",
  "subcategory",
  "notes",
  "tags",
] as const;

export type CsvTransactionFieldKey = typeof csvTransactionFieldKeys[number];

export const csvFieldLabels: Record<CsvTransactionFieldKey, string> = {
  date: "Date",
  merchant: "Merchant",
  amount: "Amount",
  account: "Account",
  category: "Category",
  subcategory: "Subcategory",
  notes: "Notes",
  tags: "Tags",
};
