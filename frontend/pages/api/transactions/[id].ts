import { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.BACKEND_URL || "http://personal_budget_backend:7000/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  switch (req.method) {
    case "GET": {
      const response = await fetch(`${BACKEND_URL}/transactions/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ message: "Failed to fetch transaction" });
      }

      const transaction = await response.json();
      res.status(200).json(transaction);
      break;
    }

    case "PUT": {
      const updates = req.body;

      if (!updates || typeof updates !== "object") {
        return res.status(400).json({ message: "Invalid request body" });
      }

      const response = await fetch(`${BACKEND_URL}/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ message: "Failed to update transaction" });
      }

      const updatedTransaction = await response.json();
      res.status(200).json(updatedTransaction);
      break;
    }

    case "DELETE": {
      const response = await fetch(`${BACKEND_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ message: "Failed to delete transaction" });
      }

      const result = await response.json();
      res.status(200).json(result);
      break;
    }

    default: {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }
}
