import React from "react";
import { Transaction, Category } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => Promise<void>;
  onFilterChange: (name: string, value: string) => void;
  onPageChange: (newPage: number) => void;
  currentPage: number;
  totalPages: number;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  categories,
  onDelete,
  onFilterChange,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Transaction List</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => onFilterChange("category", e.target.value || "")}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          onChange={(e) => onFilterChange("date", e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                Type
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right text-sm font-medium">
                Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {transaction.type}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {transaction.categoryName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {transaction.description || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-sm">
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
