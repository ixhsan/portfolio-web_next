import { getPages } from "@/sanity/sanity-utils";
import Link from "next/link";
import "../globals.css";

export const metadata = {
  title: "Ikhsan",
  description: "Next & Sanity",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get all of our pages

  const pages = await getPages();

  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="bg-gradient-to-r from-yellow-400 via-green-500 to-blue-600 bg-clip-text text-transparent text-lg font-bold"
          >
            Home
          </Link>

          <div className="flex items-center gap-5 text-sm text-gray-600">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className="hover:underline"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </header>

        <main className="py-20">{children}</main>
      </body>
    </html>
  );
}
