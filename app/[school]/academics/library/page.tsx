"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { BookMarked, CheckCircle2, Bookmark } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolLibrary({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const libData = schoolInfo.library;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="School Library & E-Learning Center" 
        subtitle="Library Catalogs"
        breadcrumbs={[
          { label: "Academics" },
          { label: "School Library" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Resource Center
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            {libData.title}
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {libData.desc}
          </p>
        </div>

        {/* Sections list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {libData.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md flex items-start space-x-4 group hover:border-blue-500/20 transition-colors duration-300"
            >
              <div className="bg-blue-600/10 text-blue-600 dark:text-school-gold p-3 rounded-xl shrink-0">
                <Bookmark className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold font-serif text-slate-950 dark:text-white">
                  {section}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-normal">
                  Reference materials, textbooks, digital archives, and past exam question papers.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Library Info Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] p-8 sm:p-10 shadow-md space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2.5">
            <BookMarked className="h-5 w-5 text-blue-600 dark:text-school-gold shrink-0" />
            <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">Library rules & hours</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-655 dark:text-slate-350">
            <div className="space-y-2">
              <span className="block font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Opening Hours:</span>
              <p>Monday - Friday: 08:00 AM - 05:00 PM</p>
              <p>Saturday: 09:00 AM - 01:00 PM (Supervised Boarding Prep)</p>
            </div>
            <div className="space-y-2">
              <span className="block font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Lending Policies:</span>
              <p>Students can borrow up to 3 books for 14 calendar days.</p>
              <p>Internet access cubes are strictly for research and homework only.</p>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
