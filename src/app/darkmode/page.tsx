"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeTest() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      <div className="text-sm">
        <div>Current theme: {theme}</div>
        <div>Resolved theme: {resolvedTheme}</div>
        <div>HTML class: {typeof window !== 'undefined' ? document.documentElement.className : 'N/A'}</div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}