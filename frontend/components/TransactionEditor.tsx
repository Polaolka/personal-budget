import React, { useState } from "react";
import { Transaction } from "@/types";
import { updateTransaction } from "@/services/transactions";

interface TransactionEditorProps {
  transaction: Transaction;
  onUpdate: (updatedTransaction: Transaction) => void;
}

export const TransactionEditor: React.FC<TransactionEditorProps> = ({
  transaction,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(transaction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedTransaction = await updateTransaction(
        transaction.id,
        formData
      );
      onUpdate(updatedTransaction);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: Number(e.target.value) })
        }
        placeholder="Amount"
        className="p-2 border rounded w-full"
      />
      <select
        value={formData.type}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "INCOME" || value === "EXPENSE") {
            setFormData({ ...formData, type: value });
          }
        }}
        className="p-2 border rounded w-full"
      >
        <option value="INCOME">INCOME</option>
        <option value="EXPENSE">EXPENSE</option>
      </select>
      <input
        type="text"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        placeholder="Category"
        className="p-2 border rounded w-full"
      />
      <textarea
        value={formData.description || ""}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Update Transaction
      </button>
    </form>
  );
};
