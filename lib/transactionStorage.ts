import { Transaction } from "./transactionModel";

const STORAGE_KEY = "nexus-family-office-transactions";

export function loadStoredTransactions(): Transaction[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // ignore invalid storage
  }

  return [];
}

export function saveStoredTransactions(transactions: Transaction[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // ignore localStorage write failures
  }
}
