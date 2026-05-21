"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export default function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Spending Analysis", href: "/spending", icon: "📉" },
    { name: "Transaction Import", href: "/import", icon: "📤" },
    { name: "Retirement Portfolio", href: "/retirement", icon: "🎯" },
    { name: "Children Fund", href: "/children", icon: "👶" },
    { name: "Cashflow Buckets", href: "/cashflow", icon: "💰" },
    { name: "Insights", href: "/insights", icon: "💡" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-lg fixed left-0 top-0">
      {/* Logo/Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">CFO Portal</h1>
        <p className="text-sm text-slate-400 mt-1">Personal Finance OS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.href)
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-slate-700 text-xs text-slate-400">
        <p className="mb-2">May 2026</p>
        <p className="text-slate-500">Version 2.0</p>
      </div>
    </aside>
  );
}
