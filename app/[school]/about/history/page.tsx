"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolHistory({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Our Heritage & History" 
        subtitle="Growth & Milestones"
        breadcrumbs={[
          { label: "About Us" },
          { label: "School History" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white leading-tight">
            {schoolInfo.historyTitle || "A Legacy of Shaping Leaders"}
          </h2>
          <p className="text-slate-650 dark:text-slate-405 text-sm sm:text-base leading-relaxed">
            {schoolInfo.historyIntro || `Since opening our doors, ${schoolInfo.name} has grown from a localized vision into a premier division of Errymaple Trust Schools. We remain dedicated to training students to dream big, believe in their potential, and achieve greatness.`}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 py-8 space-y-12">
          {schoolInfo.milestones.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Year tag for big screen */}
                <div className="absolute hidden sm:flex left-0 -translate-x-[120px] text-right font-serif text-2xl font-black text-blue-600 dark:text-school-gold pt-1 w-20 justify-end">
                  {item.year}
                </div>

                {/* Dot */}
                <span className="absolute left-0 -translate-x-1/2 top-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-full border-2 border-blue-600 dark:border-school-gold group-hover:scale-110 transition-transform duration-300">
                  <span className="block h-3.5 w-3.5 rounded-full bg-blue-600 dark:bg-school-gold" />
                </span>

                {/* Card details */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
                  <span className="sm:hidden text-lg font-bold text-blue-600 dark:text-school-gold block mb-2">
                    {item.year}
                  </span>
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-school-gold shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Outro */}
        {schoolInfo.historyOutro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center max-w-3xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-lg space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
            <div className="text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-relaxed space-y-4 font-sans text-center">
              {schoolInfo.historyOutro.split("\n\n").map((para, idx) => {
                if (para.includes("We are Dreamers.") || para.includes("Top of the Best.") || para.includes("Five years.")) {
                  return (
                    <div key={idx} className="font-bold text-slate-900 dark:text-white text-base py-2 border-t border-slate-100 dark:border-slate-850/50 mt-4 space-y-1">
                      {para.split("\n").map((line, lidx) => (
                        <p key={lidx}>{line}</p>
                      ))}
                    </div>
                  );
                }
                return <p key={idx} className="text-justify sm:text-center">{para}</p>;
              })}
            </div>
          </motion.div>
        )}

      </section>
    </main>
  );
}
