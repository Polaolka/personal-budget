export const metadata = {
  title: "Categories | Transactions App",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-50 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Categories Section</h2>
      {children}
    </div>
  );
}
