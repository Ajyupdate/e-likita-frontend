"use client";
import { useState } from "react";
import Link from "next/link";
import { User, LogOut, History, ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main header bar */}
          <div className="h-14 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              <span className="font-semibold">e-Likita</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-3">
              <select className="h-9 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-2 text-sm">
                <option>English</option>
                <option>العربية</option>
                <option>Français</option>
              </select>
              <ThemeToggle />
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user.profile.firstName.charAt(0)}{user.profile.lastName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium hidden lg:inline">{user.profile.firstName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                      <Link
                        href="/consultations"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <History className="h-4 w-4" />
                        Consultation History
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
              
              <Link href="/consultation" className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 text-sm font-medium transition">
                <span className="hidden sm:inline">Start Consultation</span>
                <span className="sm:hidden">Start</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-3">
              {/* Language selector */}
              <div className="px-2">
                <select className="w-full h-10 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 text-sm">
                  <option>English</option>
                  <option>العربية</option>
                  <option>Français</option>
                </select>
              </div>

              {/* User section */}
              {user ? (
                <div className="px-2 space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user.profile.firstName.charAt(0)}{user.profile.lastName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{user.profile.firstName} {user.profile.lastName}</span>
                  </div>
                  <Link
                    href="/consultations"
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <History className="h-5 w-5" />
                    Consultation History
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="px-2">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    Sign In
                  </button>
                </div>
              )}

              {/* Start consultation button */}
              <div className="px-2">
                <Link
                  href="/consultation"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-medium transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Start Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

