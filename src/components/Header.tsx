"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const navItems = [
  { href: "/", label: "Home" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 mx-4 mt-4 sm:mx-6 lg:mx-auto lg:max-w-5xl">
      <nav className="glass-panel flex h-14 w-full items-center justify-center rounded-2xl px-4 sm:px-6">
        <ul className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/90 text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-white/90 hover:text-slate-900 hover:shadow-sm"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 -z-10 rounded-full bg-white/90 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
