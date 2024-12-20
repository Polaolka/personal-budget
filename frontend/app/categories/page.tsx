"use client";

import { useState, useEffect } from "react";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from "@/services/transactions";
import { TransactionList } from "@/components/TransactionList";
import { TransactionForm } from "@/components/TransactionForm";
import { calculateSummary } from "@/utils/transactions";
import { Transaction, NewTransaction } from "@/types";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [filters, setFilters] = useState({ category: "", date: "" });

  useEffect(() => {
    fetchTransactions(filters)
      .then((data: Transaction[]) => {
        if (Array.isArray(data)) {
          setTransactions(data);
          setSummary(calculateSummary(data));
        }
      })
      .catch((error) => console.error("Failed to fetch transactions:", error));
  }, [filters]);

  const handleAddTransaction = async (transaction: NewTransaction) => {
    try {
      const newTransaction = await addTransaction(transaction);
      setTransactions((prev) => [...prev, newTransaction]);
      setSummary(calculateSummary([...transactions, newTransaction]));
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
      setSummary(calculateSummary(updatedTransactions));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Salary">Salary</option>
        </select>
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold">Summary</h2>
        <p>Total Income: ${summary.totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${summary.totalExpenses.toFixed(2)}</p>
        <p>Balance: ${summary.balance.toFixed(2)}</p>
      </div>

      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />

      <h2 className="text-xl font-bold mt-6">Add New Transaction</h2>
      <TransactionForm onSubmit={handleAddTransaction} />
    </div>
  );
}
