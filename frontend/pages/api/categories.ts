import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.BACKEND_URL || "http://personal_budget_backend:7000/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      // Fetch categories
      case "GET": {
        const response = await fetch(`${BACKEND_URL}/categories`);
        if (!response.ok) {
          throw new Error(`Backend responded with status ${response.status}`);
        }
        const categories = await response.json();
        res.status(200).json(categories);
        break;
      }
      // Add new category
      case "POST": {
        const { name, type } = req.body;

        if (!name || !type) {
          res.status(400).json({ message: "Invalid input" });
          return;
        }

        const response = await fetch(`${BACKEND_URL}/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, type }),
        });

        if (!response.ok) {
          throw new Error(`Backend responded with status ${response.status}`);
        }

        const newCategory = await response.json();
        res.status(201).json(newCategory);
        break;
      }
      default: {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
