"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-lg"
          : "bg-slate-900/10 dark:bg-slate-950/10 backdrop-blur-sm py-5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200/10 dark:border-white/10 shadow-md bg-slate-900 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
              <img src="/images/egs_logo.jpg" alt="Errymaple Logo" className="h-full w-full object-contain rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-bold tracking-wider uppercase font-serif leading-tight transition-colors duration-350 ${
                isScrolled ? "text-slate-900 dark:text-white" : "text-white"
              }`}>
                Errymaple
              </span>
              <span className="text-[10px] tracking-widest text-school-gold font-bold uppercase leading-none">
                Group of Schools
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors duration-350 ${
                isScrolled
                  ? "text-slate-800 dark:text-slate-200 hover:text-school-blue dark:hover:text-school-gold"
                  : "text-slate-200 hover:text-school-gold"
              }`}
            >
              Home
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-350 ${
                isScrolled
                  ? "text-slate-700 dark:text-slate-300 hover:text-school-gold"
                  : "text-slate-200 hover:text-school-gold"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <a href="#admissions">
              <Button variant="default" size="default" className="font-bold">
                Apply Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
