import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Family Office",
  description: "Private Family Office Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[linear-gradient(180deg,#05070b_0%,#090f15_45%,#03060a_100%)] text-slate-100 antialiased">
        <div className="min-h-screen md:flex">
          <Sidebar />
          <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
