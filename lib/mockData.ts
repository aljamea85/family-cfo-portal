import {
  ImportedTransaction,
  Transaction,
  transactionCategories,
  TransactionCategory,
} from "./transactionModel";
import {
  getCategoryTotals,
  getTopMerchants,
  getMonthlySpendingTrend,
  getTotalSpend,
} from "./transactionEngine";

// Mock data for Family CFO Portal

export interface LedgerEntry {
  date: string;
  description: string;
  contribution: number;
  runningBalance: number;
}

export interface SpendingData {
  month: string;
  amount: number;
}

export interface CategorySpending {
  category: TransactionCategory;
  amount: number;
  percentage: number;
}

export interface MerchantData {
  merchant: string;
  amount: number;
  transactionCount: number;
}

export interface CashflowBucket {
  name: string;
  amount: number;
  targetAmount?: number;
  percentage?: number;
  color: string;
  description: string;
}

export interface PortfolioAllocation {
  type: string;
  amount: number;
  percentage: number;
}

export interface Insight {
  id: string;
  title: string;
  value: string;
  status: "alert" | "warning" | "info" | "success";
  description: string;
  icon: string;
}

// Financial Summary Data
export const financialSummary = {
  monthlyBudget: 6200,
  actualLifestyleSpend: 18000,
  retirementPortfolioValue: 487500,
  childrenFundValue: 125000,
};

// Recent Transactions (May 2026)
export const recentTransactions: Transaction[] = [
  { id: "1", date: "2026-05-20", merchant: "Deliveroo", category: "Deliveroo/Talabat", amount: 185, account: "Credit Card", subcategory: "Delivery", notes: "Dinner delivery", description: "Dinner delivery", confidence: 95, tags: ["food", "delivery"] },
  { id: "2", date: "2026-05-20", merchant: "Carrefour", category: "Groceries", amount: 420, account: "Debit Card", subcategory: "Supermarket", notes: "Weekly groceries", description: "Weekly groceries", confidence: 92, tags: ["groceries"] },
  { id: "3", date: "2026-05-19", merchant: "Emirates Golf Club", category: "Restaurants", amount: 520, account: "Credit Card", subcategory: "Dining", notes: "Lunch", description: "Lunch", confidence: 88, tags: ["dining"] },
  { id: "4", date: "2026-05-19", merchant: "Talabat", category: "Deliveroo/Talabat", amount: 240, account: "Credit Card", subcategory: "Delivery", notes: "Breakfast delivery", description: "Breakfast delivery", confidence: 95, tags: ["food", "delivery"] },
  { id: "5", date: "2026-05-18", merchant: "ENOC", category: "Fuel", amount: 180, account: "Debit Card", subcategory: "Petrol", notes: "Fuel", description: "Fuel", confidence: 100, tags: ["transport"] },
  { id: "6", date: "2026-05-18", merchant: "Bloomingdale's", category: "Shopping", amount: 1250, account: "Credit Card", subcategory: "Retail", notes: "Clothing", description: "Clothing", confidence: 90, tags: ["shopping"] },
  { id: "7", date: "2026-05-17", merchant: "Café Bateel", category: "Cafés", amount: 65, account: "Credit Card", subcategory: "Coffee", notes: "Coffee", description: "Coffee", confidence: 90, tags: ["coffee"] },
  { id: "8", date: "2026-05-17", merchant: "Deliveroo", category: "Deliveroo/Talabat", amount: 210, account: "Credit Card", subcategory: "Delivery", notes: "Dinner delivery", description: "Dinner delivery", confidence: 95, tags: ["food", "delivery"] },
  { id: "9", date: "2026-05-16", merchant: "American Hospital Dubai", category: "Miscellaneous", amount: 340, account: "Credit Card", subcategory: "Medical", notes: "Medical consultation", description: "Medical consultation", confidence: 80, tags: ["health"] },
  { id: "10", date: "2026-05-16", merchant: "Al Reef Bakery", category: "Restaurants", amount: 85, account: "Cash", subcategory: "Breakfast", notes: "Lunch", description: "Lunch", confidence: 88, tags: ["food"] },
];

// Retirement Fund Ledger (Last 10 entries)
export const retirementLedger: LedgerEntry[] = [
  { date: "2026-05-01", description: "Monthly contribution", contribution: 8000, runningBalance: 487500 },
  { date: "2026-04-01", description: "Monthly contribution", contribution: 8000, runningBalance: 479500 },
  { date: "2026-03-01", description: "Monthly contribution", contribution: 8000, runningBalance: 471500 },
  { date: "2026-02-01", description: "Monthly contribution", contribution: 8000, runningBalance: 463500 },
  { date: "2026-01-01", description: "Monthly contribution", contribution: 8000, runningBalance: 455500 },
  { date: "2025-12-01", description: "Monthly contribution", contribution: 8000, runningBalance: 447500 },
  { date: "2025-11-01", description: "Monthly contribution", contribution: 8000, runningBalance: 439500 },
  { date: "2025-10-01", description: "Monthly contribution", contribution: 8000, runningBalance: 431500 },
  { date: "2025-09-01", description: "Monthly contribution", contribution: 8000, runningBalance: 423500 },
  { date: "2025-08-01", description: "Monthly contribution", contribution: 8000, runningBalance: 415500 },
];

// Children Fund Ledger (Last 10 entries)
export const childrenFundLedger: LedgerEntry[] = [
  { date: "2026-05-01", description: "Monthly contribution", contribution: 1500, runningBalance: 125000 },
  { date: "2026-04-01", description: "Monthly contribution", contribution: 1500, runningBalance: 123500 },
  { date: "2026-03-01", description: "Monthly contribution", contribution: 1500, runningBalance: 122000 },
  { date: "2026-02-01", description: "Monthly contribution", contribution: 1500, runningBalance: 120500 },
  { date: "2026-01-01", description: "Monthly contribution", contribution: 1500, runningBalance: 119000 },
  { date: "2025-12-01", description: "Monthly contribution", contribution: 1500, runningBalance: 117500 },
  { date: "2025-11-01", description: "Monthly contribution", contribution: 1500, runningBalance: 116000 },
  { date: "2025-10-01", description: "Monthly contribution", contribution: 1500, runningBalance: 114500 },
  { date: "2025-09-01", description: "Monthly contribution", contribution: 1500, runningBalance: 113000 },
  { date: "2025-08-01", description: "Monthly contribution", contribution: 1500, runningBalance: 111500 },
];

// Cashflow Buckets
export const cashflowBuckets: CashflowBucket[] = [
  {
    name: "Income Hub",
    amount: 35000,
    targetAmount: 35000,
    color: "bg-green-600",
    description: "Monthly salary and other income",
  },
  {
    name: "Bills & Obligations",
    amount: 8200,
    targetAmount: 8000,
    color: "bg-red-600",
    description: "Fixed expenses and commitments",
  },
  {
    name: "Lifestyle Account",
    amount: 18000,
    targetAmount: 6200,
    color: "bg-yellow-600",
    description: "Discretionary spending",
  },
  {
    name: "Wealth Engine",
    amount: 8000,
    targetAmount: 8000,
    color: "bg-blue-600",
    description: "Retirement investments",
  },
  {
    name: "Children Fund",
    amount: 1500,
    targetAmount: 1500,
    color: "bg-purple-600",
    description: "Children education and future",
  },
  {
    name: "Emergency Reserve",
    amount: 2300,
    targetAmount: 12000,
    color: "bg-orange-600",
    description: "Safety buffer (3-6 months expenses)",
  },
];

// Retirement Portfolio Allocation
export const retirementAllocation: PortfolioAllocation[] = [
  { type: "Global Equities", amount: 219375, percentage: 45 },
  { type: "Bonds", amount: 146250, percentage: 30 },
  { type: "Real Estate (REIT)", amount: 73125, percentage: 15 },
  { type: "Cash Reserve", amount: 48750, percentage: 10 },
];

// Retirement Future Target Allocation
export const retirementTargetAllocation: PortfolioAllocation[] = [
  { type: "Global Equities", amount: 245000, percentage: 35 },
  { type: "Bonds", amount: 350000, percentage: 50 },
  { type: "Real Estate (REIT)", amount: 70000, percentage: 10 },
  { type: "Cash Reserve", amount: 35000, percentage: 5 },
];

// Children Portfolio Allocation
export const childrenAllocation: PortfolioAllocation[] = [
  { type: "Growth Funds", amount: 75000, percentage: 60 },
  { type: "Bonds", amount: 37500, percentage: 30 },
  { type: "Cash Reserve", amount: 12500, percentage: 10 },
];

// Imported Transactions (for Transaction Import section)
export const importedTransactions: ImportedTransaction[] = [
  { id: "imp1", date: "2026-05-21", merchant: "Deliveroo", category: "Deliveroo/Talabat", amount: 165, description: "Dinner", account: "Credit Card", confidence: 95, status: "pending", subcategory: "", notes: "", tags: [] },
  { id: "imp2", date: "2026-05-21", merchant: "ENOC Fuel", category: "Fuel", amount: 175, description: "Fuel", account: "Debit Card", confidence: 100, status: "pending", subcategory: "", notes: "", tags: [] },
  { id: "imp3", date: "2026-05-20", merchant: "Spinneys", category: "Groceries", amount: 380, description: "Weekly groceries", account: "Credit Card", confidence: 85, status: "pending", subcategory: "", notes: "", tags: [] },
  { id: "imp4", date: "2026-05-20", merchant: "MMI Insurance", category: "Miscellaneous", amount: 450, description: "Car insurance", account: "Direct Debit", confidence: 100, status: "pending", subcategory: "", notes: "", tags: [] },
  { id: "imp5", date: "2026-05-19", merchant: "Empower Telecom", category: "Miscellaneous", amount: 199, description: "Internet bill", account: "Credit Card", confidence: 100, status: "pending", subcategory: "", notes: "", tags: [] },
];

// Insights Cards Data
export const insights: Insight[] = [
  {
    id: "overspend",
    title: "Overspending Alert",
    value: "AED 11,800",
    status: "alert",
    description: "You're 190% over your AED 6,200 monthly lifestyle budget",
    icon: "⚠️",
  },
  {
    id: "leakage",
    title: "Lifestyle Leakage",
    value: "AED 3,330",
    status: "warning",
    description: "Deliveroo + Talabat spending (18.5% of total spend)",
    icon: "💧",
  },
  {
    id: "capacity",
    title: "Investment Capacity",
    value: "AED 9,500",
    status: "success",
    description: "Potential monthly capacity if you hit budget",
    icon: "📈",
  },
  {
    id: "emergency",
    title: "Emergency Reserve Gap",
    value: "AED 9,700",
    status: "warning",
    description: "You need 3-6 months expenses saved (Target: AED 12,000)",
    icon: "🆘",
  },
  {
    id: "children",
    title: "Children Fund Progress",
    value: "10.4 yrs",
    status: "success",
    description: "At current rate, children fund target in 10+ years",
    icon: "👶",
  },
  {
    id: "retirement",
    title: "Retirement Trajectory",
    value: "2.8M AED",
    status: "info",
    description: "Projected portfolio at age 60 (based on 5% returns)",
    icon: "🎯",
  },
];

// Additional transaction history for spending analysis
export const extendedTransactions: Transaction[] = [
  ...recentTransactions,
  { id: "11", date: "2026-05-15", merchant: "Talabat", category: "Deliveroo/Talabat", amount: 155, account: "Credit Card", subcategory: "Delivery", notes: "Lunch delivery", description: "Lunch delivery", confidence: 92, tags: ["food", "delivery"] },
  { id: "12", date: "2026-05-15", merchant: "Starbucks", category: "Cafés", amount: 45, account: "Credit Card", subcategory: "Coffee", notes: "Coffee", description: "Coffee", confidence: 90, tags: ["coffee"] },
  { id: "13", date: "2026-05-14", merchant: "Noon.com", category: "Shopping", amount: 280, account: "Credit Card", subcategory: "Online", notes: "Electronics", description: "Electronics", confidence: 93, tags: ["shopping"] },
  { id: "14", date: "2026-05-14", merchant: "Zomato", category: "Restaurants", amount: 420, account: "Credit Card", subcategory: "Dining", notes: "Dinner with family", description: "Dinner with family", confidence: 90, tags: ["food"] },
  { id: "15", date: "2026-05-13", merchant: "Dubai Mall", category: "Shopping", amount: 890, account: "Credit Card", subcategory: "Retail", notes: "Clothing and shoes", description: "Clothing and shoes", confidence: 95, tags: ["shopping"] },
];

export const allTransactions: Transaction[] = extendedTransactions;
export const spendingByCategory: CategorySpending[] = getCategoryTotals(allTransactions);
export const topMerchants: MerchantData[] = getTopMerchants(allTransactions, 8);
export const monthlySpendingTrend: SpendingData[] = getMonthlySpendingTrend(allTransactions, 12);

// Monthly spending breakdown
export const monthlyBreakdown = {
  income: 35000,
  billsObligations: 8200,
  lifestyleSpend: 18000,
  wealthEngine: 8000,
  childrenFund: 1500,
  emergencyReserve: 2300,
  unallocated: -3000, // Over budget
};

// Deliveroo/Talabat monthly breakdown
export const deliverooTalabatMonthly = {
  deliveroo: 2850,
  talabat: 480,
  total: 3330,
  transactionCount: 23,
  averageTransaction: 145,
};

// Restaurant spending breakdown
export const restaurantSpendingMonthly = {
  fine_dining: 1200,
  casual_dining: 1400,
  quick_service: 600,
  total: 3200,
  transactionCount: 28,
};

// Café spending breakdown
export const cafeSpendingMonthly = {
  starbucks: 280,
  local_cafes: 260,
  total: 540,
  transactionCount: 18,
  averageTransaction: 30,
};

