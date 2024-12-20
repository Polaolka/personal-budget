// fetch categories function
export async function fetchCategories() {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const respData = await response.json();
  return respData.data;
}

// add category function
export async function addCategory(category: { name: string; type: string }) {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }

  const respData = await response.json();
  return respData.data;
}
