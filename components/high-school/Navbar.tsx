"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";

interface NavbarProps {
  schoolSlug?: SchoolSlug;
}

export default function HighSchoolNavbar({ schoolSlug: propSchoolSlug }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Extract the active school slug from the pathname or prop
  const schoolSlug = propSchoolSlug || (pathname.split("/")[1] || "high-school") as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug] || schoolsData["high-school"];

  const hasPrefix = pathname.startsWith(`/${schoolSlug}`);
  const getLink = (href: string) => {
    if (hasPrefix) {
      return href;
    }
    const stripped = href.replace(`/${schoolSlug}`, "");
    return stripped === "" ? "/" : stripped;
  };

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

  const menuItems = [
    { name: "Home", href: `/${schoolSlug}` },
    {
      name: "About Us",
      href: "#",
      dropdown: [
        { name: "School History", href: `/${schoolSlug}/about/history` },
        { name: "Vision & Mission", href: `/${schoolSlug}/about/vision-mission` },
        { name: "School Leadership", href: `/${schoolSlug}/about/leadership` },
        { name: "Staff Profiles", href: `/${schoolSlug}/about/staff` },
        { name: "Campus Facilities", href: `/${schoolSlug}/about/facilities` },
      ],
    },
    {
      name: "Admissions",
      href: "#",
      dropdown: [
        { name: "Apply Online", href: `/${schoolSlug}/admissions/apply` },
        { name: "Tuition & Fees", href: `/${schoolSlug}/admissions/fees` },
        { name: "Scholarships", href: `/${schoolSlug}/admissions/scholarships` },
        { name: "Boarding Life", href: `/${schoolSlug}/admissions/boarding` },
        { name: "Admissions FAQ", href: `/${schoolSlug}/admissions/faq` },
      ],
    },
    {
      name: "Academics",
      href: "#",
      dropdown: [
        { name: "Curriculum", href: `/${schoolSlug}/academics/curriculum` },
        { name: "Departments", href: `/${schoolSlug}/academics/departments` },
        { name: "Exam Results", href: `/${schoolSlug}/academics/results` },
        { name: "School Library", href: `/${schoolSlug}/academics/library` },
      ],
    },
    {
      name: "Student Life",
      href: "#",
      dropdown: [
        { name: "Sports & Athletics", href: `/${schoolSlug}/student-life/sports` },
        { name: "Clubs & Societies", href: `/${schoolSlug}/student-life/clubs` },
        { name: "Events Calendar", href: `/${schoolSlug}/student-life/events` },
        { name: "Media Gallery", href: `/${schoolSlug}/student-life/gallery` },
      ],
    },
    { name: "News", href: `/${schoolSlug}/news` },
    { name: "Calendar", href: `/${schoolSlug}/calendar` },
    { name: "Downloads", href: `/${schoolSlug}/downloads` },
    { name: "Contact", href: `/${schoolSlug}/contact` },
    { name: "Parent Portal", href: `/${schoolSlug}/parent-portal` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-950/95 backdrop-blur-md py-3 shadow-lg border-b border-slate-200/50 dark:border-white/5"
          : "bg-transparent backdrop-blur-sm py-5 border-b border-slate-200/10 dark:border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Title */}
          <Link href={getLink(`/${schoolSlug}`)} className="flex items-center space-x-2 group shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200/20 dark:border-white/10 shadow-md bg-slate-900 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
              <img src={schoolInfo.logo} alt="Errymaple Logo" className="h-full w-full object-contain rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider uppercase font-serif text-slate-900 dark:text-white leading-tight">
                Errymaple
              </span>
              <span className="text-[10px] tracking-widest text-school-gold font-bold uppercase leading-none">
                {schoolInfo.shortName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-0.5 xl:space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button
                    className={`flex items-center space-x-0.5 px-2 py-1.5 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors text-slate-700 dark:text-slate-200 hover:text-school-gold`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </button>
                ) : (
                  <Link
                    href={getLink(item.href)}
                    className={`px-2 py-1.5 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                      pathname === getLink(item.href)
                        ? "text-school-gold font-bold"
                        : "text-slate-700 dark:text-slate-200 hover:text-school-gold"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 mt-0 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={getLink(subItem.href)}
                        className={`block px-4 py-2 text-xs sm:text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                          pathname === getLink(subItem.href)
                            ? "text-school-gold bg-slate-50 dark:bg-white/5 font-bold"
                            : "text-slate-655 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden xl:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-school-gold transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <Link href={getLink(`/${schoolSlug}/admissions/apply`)}>
              <Button className={`font-bold whitespace-nowrap ${schoolInfo.btnTheme}`}>
                Apply Online
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-school-gold transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-school-gold focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/5 px-4 pt-2 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name} className="space-y-1">
              {item.dropdown ? (
                <>
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {item.name}
                  </div>
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={getLink(subItem.href)}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        pathname === getLink(subItem.href)
                          ? "text-school-gold bg-slate-50 dark:bg-white/5"
                          : "text-slate-655 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={getLink(item.href)}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === getLink(item.href)
                      ? "text-school-gold bg-slate-50 dark:bg-white/5"
                      : "text-slate-655 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-4 px-3">
            <Link href={getLink(`/${schoolSlug}/admissions/apply`)} onClick={() => setIsOpen(false)}>
              <Button className={`w-full font-bold ${schoolInfo.btnTheme}`}>
                Apply Online
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
