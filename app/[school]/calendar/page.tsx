"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Calendar, Clock, Tag } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolCalendar({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Academic Calendar & Term Dates" 
        subtitle="Term Calendar"
        breadcrumbs={[
          { label: "Calendar" }
        ]}
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Term & Session Schedule
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Plan ahead by checking opening, mid-term, examination, and closing dates for the current academic session.
          </p>
        </div>

        {/* Calendar list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8 bg-slate-950 text-white flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-school-gold shrink-0" />
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Current Term Calendar</h3>
              <p className="text-slate-400 text-xs leading-normal">Dates are subject to national education ministry updates.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {schoolInfo.calendar.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Category: {item.type}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">
                    {item.event}
                  </h4>
                </div>

                <div className="bg-blue-600/10 text-blue-600 dark:text-school-gold px-4 py-2 rounded-xl text-center font-bold text-xs sm:text-sm shrink-0 border border-blue-500/10">
                  {item.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
