"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: "◉" },
  { name: "Budget", href: "/budget", icon: "◌" },
  { name: "Investments", href: "/investments", icon: "⬢" },
  { name: "Children Fund", href: "/children", icon: "◌" },
  { name: "Retirement", href: "/retirement", icon: "◎" },
  { name: "Cash At Hand", href: "/cash-at-hand", icon: "◍" },
  { name: "Cashflow Forecast", href: "/cashflow-forecast", icon: "↗" },
  { name: "Obligations", href: "/obligations", icon: "▣" },
  { name: "AI CFO Insights", href: "/ai-insights", icon: "✦" },
  { name: "Settings", href: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="w-full border-b border-slate-200 bg-white/95 backdrop-blur md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r md:border-slate-200">
      <div className="px-4 py-4 sm:px-5 md:px-5 md:py-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
              Nexus
            </p>
            <h1 className="mt-2 text-lg font-semibold text-slate-900">Executive Console</h1>
            <p className="mt-1 text-sm text-slate-500">Private family CFO</p>
          </div>
          <div className="hidden rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 md:inline-flex">
            Live
          </div>
        </div>

        <nav className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Snapshot</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Decision window</p>
              <p className="text-lg font-semibold text-slate-900">May 2026</p>
            </div>
            <p className="text-sm font-semibold text-emerald-600">Stable</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
