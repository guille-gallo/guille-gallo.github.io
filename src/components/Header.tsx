"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const navItems = [
  { href: "/", label: "Home" },
  { href: "/github-featured-projects/", label: "GH Featured Projects" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (motionQuery.matches) {
          setScrolled(true);
          return;
        }
        setScrolled(!entry?.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 mx-4 mt-4 sm:mx-6 lg:mx-auto lg:max-w-5xl">
      <nav
        className={`glass-nav flex h-14 w-full items-center justify-center rounded-2xl px-4 sm:px-6 ${
          scrolled ? "glass-nav-scrolled" : ""
        }`}
      >
        <ul className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/90 text-neutral-900 shadow-sm"
                      : "text-neutral-700 hover:bg-white/90 hover:text-neutral-900 hover:shadow-sm"
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
