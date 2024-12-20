export interface Transaction {
  id: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: number;
  description: string;
  createdAt: string;
  categoryName?: string;
}

export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
}

export interface UpdateTransactionData {
  amount?: number;
  type?: "INCOME" | "EXPENSE";
  category?: number;
  description?: string;
}

export interface NewTransaction {
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: number;
  description: string;
}
