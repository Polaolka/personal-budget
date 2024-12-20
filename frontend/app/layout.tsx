import "../styles/globals.css";
import Link from "next/link";

export const metadata = {
  title: "Transactions App",
  description: "Manage your transactions and categories easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold text-lg">
              Transactions App
            </Link>
            <div>
              <Link href="/transactions" className="mr-4 hover:underline">
                Transactions
              </Link>
              <Link href="/categories" className="hover:underline">
                Categories
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="bg-gray-200 text-center py-4 mt-6">
          <p>&copy; {new Date().getFullYear()} Transactions App</p>
        </footer>
      </body>
    </html>
  );
}
