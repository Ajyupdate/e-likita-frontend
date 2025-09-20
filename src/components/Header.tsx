"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-950/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          <span className="font-semibold">e-Likita</span>
        </Link>
        <div className="flex items-center gap-3">
          <select className="h-9 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-2 text-sm">
            <option>English</option>
            <option>العربية</option>
            <option>Français</option>
          </select>
          <ThemeToggle />
          <Link href="/consultation" className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition">Start Consultation</Link>
        </div>
      </div>
    </header>
  );
}

