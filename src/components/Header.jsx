"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-[#FF7A00] via-[#FF8C42] to-[#FFE5B4] text-black shadow-md border-b border-white/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* App Name / Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md"
        >
          TaskLite
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition ${
                pathname === item.href
                  ? "text-white underline underline-offset-4"
                  : "text-black/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
