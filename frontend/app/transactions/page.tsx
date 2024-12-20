"use client";

import { useState, useEffect } from "react";
import {
  fetchFilteredTransactions,
  addTransaction,
  deleteTransaction,
} from "@/services/transactions";
import { fetchCategories } from "@/services/categories";
import { TransactionList } from "@/components/TransactionList";
import { TransactionForm } from "@/components/TransactionForm";
import { calculateSummary } from "@/utils/transactions";
import { Transaction, NewTransaction, Category } from "@/types";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const [filters, setFilters] = useState({ category: "", date: "" });
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [totalPages, setTotalPages] = useState(1);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const { category, date } = filters;
      const { page, limit } = pagination;
      const params = { category, date, page, limit };

      const data = await fetchFilteredTransactions(params);

      if (data && Array.isArray(data.data)) {
        setTransactions(data.data);
        setSummary(calculateSummary(data.data));
        setTotalPages(data.totalPages);
      } else {
        console.error("Invalid data format received:", data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadTransactions();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [filters, pagination]);

  const handleAddTransaction = async (transaction: NewTransaction) => {
    try {
      await addTransaction(transaction);
      loadTransactions();
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Displaying summary data */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Summary</h2>
        <p>Total Income: ${Number(summary.totalIncome).toFixed(2)}</p>
        <p>Total Expenses: ${Number(summary.totalExpenses).toFixed(2)}</p>
        <p>Balance: ${Number(summary.balance).toFixed(2)}</p>
      </div>

      <TransactionList
        transactions={transactions}
        categories={categories}
        onDelete={handleDeleteTransaction}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        currentPage={pagination.page}
        totalPages={totalPages}
      />

      <h2 className="text-xl font-bold mt-6">Add New Transaction</h2>
      <TransactionForm onSubmit={handleAddTransaction} />
    </div>
  );
}
