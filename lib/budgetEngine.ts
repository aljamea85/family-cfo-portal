import { Transaction } from "./transactionModel";

export interface BudgetMonthStats {
  monthlyBudget: number;
  actualSpent: number;
  remainingBudget: number;
  daysElapsed: number;
  daysInMonth: number;
  remainingDays: number;
  dailyAllowedSpend: number;
  actualDailyBurn: number;
  projectedMonthEndSpend: number;
  projectedOverspend: number;
  remainingSafeToSpend: number;
}

export const DEFAULT_MONTHLY_BUDGET = 6200;

export function getCurrentMonthTransactions(transactions: Transaction[], referenceDate = new Date()): Transaction[] {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  return transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

export function calculateBudgetMonthStats(
  transactions: Transaction[],
  monthlyBudget = DEFAULT_MONTHLY_BUDGET,
  referenceDate = new Date()
): BudgetMonthStats {
  const monthTransactions = getCurrentMonthTransactions(transactions, referenceDate);
  const actualSpent = monthTransactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const daysElapsed = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remainingDays = Math.max(0, daysInMonth - daysElapsed);
  const remainingBudget = monthlyBudget - actualSpent;
  const actualDailyBurn = daysElapsed === 0 ? 0 : actualSpent / daysElapsed;
  const projectedMonthEndSpend = actualDailyBurn * daysInMonth;
  const projectedOverspend = projectedMonthEndSpend - monthlyBudget;
  const remainingSafeToSpend = monthlyBudget - projectedMonthEndSpend;
  const dailyAllowedSpend = remainingDays > 0 ? remainingBudget / remainingDays : 0;

  return {
    monthlyBudget,
    actualSpent,
    remainingBudget,
    daysElapsed,
    daysInMonth,
    remainingDays,
    dailyAllowedSpend,
    actualDailyBurn,
    projectedMonthEndSpend,
    projectedOverspend,
    remainingSafeToSpend,
  };
}
