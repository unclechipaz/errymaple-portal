"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  const params = useParams();
  const pathname = usePathname();
  
  // Extract active school slug
  const schoolSlug = (params?.school || "high-school") as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug] || schoolsData["high-school"];

  const getHomeLink = () => {
    if (schoolSlug === "junior-school" && pathname.startsWith("/junior")) {
      return "/junior";
    }
    return `/${schoolSlug}`;
  };

  return (
    <section className="relative min-h-[30vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 overflow-hidden pt-28 pb-12">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f294204_1px,transparent_1px),linear-gradient(to_bottom,#0f294204_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e3a8a08_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-slate-50/40 to-slate-50 dark:from-slate-950/90 dark:via-slate-950/70 dark:to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Subheading Decoration */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          >
            <span>{subtitle}</span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-tight"
        >
          {title}
        </motion.h1>

        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400"
          aria-label="Breadcrumb"
        >
          <Link
            href={getHomeLink()}
            className="flex items-center space-x-1 hover:text-school-gold transition-colors text-slate-600 dark:text-slate-350"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">{schoolInfo.shortName}</span>
          </Link>

          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-4.5 w-4.5 text-slate-400 dark:text-slate-600 shrink-0" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-school-gold transition-colors text-slate-600 dark:text-slate-350"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-900 dark:text-white font-semibold">{item.label}</span>
              )}
            </div>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
