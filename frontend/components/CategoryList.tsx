import React from "react";
import { Category } from "../types";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Category List</h2>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <ul className="list-disc pl-6">
          {categories.map((category) => (
            <li key={category.id} className="mt-1">
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
