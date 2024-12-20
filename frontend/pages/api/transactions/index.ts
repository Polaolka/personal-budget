import { UpdateTransactionData } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.BACKEND_URL || "http://personal_budget_backend:7000/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      // Fetch transactions with filters and pagination
      case "GET": {
        const { category, date, page, limit } = req.query;

        const queryParams = new URLSearchParams(
          Object.entries({
            category,
            date,
            page,
            limit,
          })
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
        );

        const response = await fetch(
          `${BACKEND_URL}/transactions?${queryParams}`
        );

        if (!response.ok) {
          throw new Error(`Backend responded with status ${response.status}`);
        }

        const transactions = await response.json();
        res.status(200).json(transactions);
        break;
      }

      // Add new transaction
      case "POST": {
        const { amount, type, category, description } = req.body;

        if (!amount || !type || !category || !description) {
          res.status(400).json({ message: "Invalid request" });
          return;
        }

        const response = await fetch(`${BACKEND_URL}/transactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, type, category, description }),
        });

        if (!response.ok) {
          throw new Error(`Backend responded with status ${response.status}`);
        }

        const newTransaction = await response.json();

        res.status(201).json(newTransaction);
        break;
      }

      // Update transaction
      case "PUT": {
        const { id, amount, type, category, description } = req.body;

        if (!id || (!amount && !type && !category && !description)) {
          res.status(400).json({
            message: "Invalid request: id and at least one field is required",
          });
          return;
        }

        const updateData: UpdateTransactionData = {};
        if (amount !== undefined) updateData.amount = amount;
        if (type !== undefined) updateData.type = type;
        if (category !== undefined) updateData.category = category;
        if (description !== undefined) updateData.description = description;

        const response = await fetch(`${BACKEND_URL}/transactions/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to update transaction. Status: ${response.status}`
          );
        }

        const updatedTransaction = await response.json();
        res.status(200).json(updatedTransaction);
        break;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      }
    }
  } catch (_) {
    res.status(500).json({ message: "Internal server error" });
  }
}
