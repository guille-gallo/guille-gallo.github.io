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
    <header className="sticky top-0 z-50 w-full border-b border-border-on-sky bg-white/65 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-center px-4 sm:px-6">
        <ul className="flex items-center gap-3 sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground-strong"
                      : "text-foreground hover:bg-surface-2"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-3 -bottom-[1px] h-0.5 bg-accent"
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
