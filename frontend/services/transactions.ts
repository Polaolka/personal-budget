import { Transaction, NewTransaction } from "@/types";

const API_URL = "/api/transactions";

export async function fetchFilteredTransactions(
  params: Record<string, string | number>
) {
  const query = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== "" && value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await fetch(`${API_URL}?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filtered transactions");
  }

  const data = await response.json();

  return data.data;
}

export async function addTransaction(
  transaction: NewTransaction
): Promise<Transaction> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Failed to add transaction");
  }
  const respData = await response.json();

  return respData.data;
}

export async function updateTransaction(
  id: string,
  updates: Partial<Transaction>
): Promise<Transaction> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }
  const respData = await response.json();

  return respData.data;
}

export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete transaction. Status: ${response.status}`);
  }

  const respData = await response.json();

  return respData.data;
}
