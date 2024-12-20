export const metadata = {
  title: "Transactions | Transactions App",
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Transactions Section</h2>
      {children}
    </div>
  );
}
