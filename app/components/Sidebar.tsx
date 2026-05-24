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
    <aside className="w-full border-b border-white/[0.06] bg-[#060a0f]/95 backdrop-blur md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r md:border-white/[0.06]">
      <div className="px-4 py-4 sm:px-5 md:px-5 md:py-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-400">
              Nexus
            </p>
            <h1 className="mt-2 text-[1.08rem] font-semibold tracking-tight text-slate-50">Executive Console</h1>
            <p className="mt-1 text-sm text-slate-400">Private family office command</p>
          </div>
          <div className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-100 md:inline-flex">
            Live
          </div>
        </div>

        <nav className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-1">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-[18px] px-3.5 py-2.5 text-sm transition-all ${
                  active
                    ? "border border-white/[0.06] bg-[linear-gradient(180deg,rgba(16,24,39,0.98),rgba(10,14,22,0.98))] text-slate-50"
                    : "text-slate-300 hover:bg-white/[0.02] hover:text-slate-100"
                }`}
              >
                <span className="text-base text-slate-200">{item.icon}</span>
                <span className="truncate font-medium tracking-[0.01em]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(12,16,22,0.98),rgba(8,11,16,0.98))] px-4 py-4 ring-1 ring-white/[0.03]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Operating window</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Decision window</p>
              <p className="text-lg font-semibold tracking-tight text-slate-50">May 2026</p>
            </div>
            <p className="text-sm font-semibold text-emerald-100">Stable</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
