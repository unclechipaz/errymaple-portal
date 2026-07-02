"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Users, Star, Compass } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolClubs({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Student Clubs & Societies" 
        subtitle="School Clubs"
        breadcrumbs={[
          { label: "Student Life" },
          { label: "Clubs & Societies" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Extra-Curricular Clubs
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Discovering Passions Beyond Textbooks
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We provide structured clubs focused on building public speaking, STEM coding assembly, environmental awareness, and performing arts.
          </p>
        </div>

        {/* Clubs list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {schoolInfo.clubs.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-school-gold flex items-center justify-center p-2.5 shrink-0">
                    <Compass className="h-full w-full" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-950 dark:text-white">
                    {c.name}
                  </h3>
                </div>
                <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>

              {c.achievements && (
                <div className="mt-6 pt-4 border-t border-slate-150 dark:border-slate-800 flex items-start space-x-2 text-xs sm:text-sm text-slate-755 dark:text-slate-350">
                  <Star className="h-4.5 w-4.5 text-school-gold shrink-0 mt-0.5" />
                  <span className="font-semibold italic">Focus: {c.achievements}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
