import React, { useState, useEffect } from "react";
import { Category, NewTransaction } from "@/types";
import { fetchCategories } from "@/services/categories";

interface TransactionFormProps {
  onSubmit: (transaction: NewTransaction) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<NewTransaction>({
    amount: 0,
    type: "INCOME",
    category: 0,
    description: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null); // Стан для повідомлення про помилку

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || isNaN(Number(value))) {
      setError("Please enter a valid number");
    } else {
      setError(null); // Очищаємо помилку
      setFormData({ ...formData, amount: Number(value) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || formData.amount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    onSubmit(formData);
    setFormData({
      amount: 0,
      type: "INCOME",
      category: 0,
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="w-full">
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount === 0 ? "" : formData.amount}
            onChange={handleAmountChange}
            className="border p-2 rounded w-full"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as "INCOME" | "EXPENSE",
            })
          }
          className="border p-2 rounded w-full"
        >
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        >
          <option value={0} disabled>
            Select Category
          </option>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full sm:w-auto"
        disabled={!!error}
      >
        Add Transaction
      </button>
    </form>
  );
};
