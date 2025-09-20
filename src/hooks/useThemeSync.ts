"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeSync() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Force apply dark class to HTML element
    const html = document.documentElement;
    
    if (resolvedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [resolvedTheme, mounted]);

  return { theme, resolvedTheme, mounted };
}
