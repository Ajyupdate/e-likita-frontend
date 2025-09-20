"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkModeDebug() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClass, setHtmlClass] = useState("");
  const [bodyClass, setBodyClass] = useState("");

  useEffect(() => {
    setMounted(true);
    
    // Monitor class changes
    const checkClasses = () => {
      if (typeof window !== 'undefined') {
        setHtmlClass(document.documentElement.className);
        setBodyClass(document.body.className);
      }
    };
    
    checkClasses();
    
    // Check every 100ms for changes
    const interval = setInterval(checkClasses, 100);
    
    return () => clearInterval(interval);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-xs max-w-xs z-50">
      <div className="mb-2 font-bold">🐛 Dark Mode Debug</div>
      <div className="space-y-1">
        <div>Theme: <span className="font-mono text-blue-600">{theme}</span></div>
        <div>Resolved: <span className="font-mono text-green-600">{resolvedTheme}</span></div>
        <div>HTML classes: <span className="font-mono text-red-600 break-all">{htmlClass || 'none'}</span></div>
        <div>Body classes: <span className="font-mono text-purple-600 break-all">{bodyClass || 'none'}</span></div>
        <div className="pt-2 border-t">
          <div className="w-4 h-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mb-1"></div>
          <div className="text-gray-600 dark:text-gray-300">^ Should change color</div>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-2 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs w-full"
        >
          Toggle ({theme})
        </button>
      </div>
    </div>
  );
}