"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Trophy, Star, ShieldCheck } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolSports({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Sports Academies & Athletics" 
        subtitle="Co-Curricular Sports"
        breadcrumbs={[
          { label: "Student Life" },
          { label: "Sports" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            School Athletics
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Professional Coaching & Fitness
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We provide structured sports programs covering golf training, athletics speed lanes, swimming, and traditional ball sports.
          </p>
        </div>

        {/* Sports list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {schoolInfo.sports.map((s, index) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-school-gold flex items-center justify-center p-2.5 shrink-0">
                    <Trophy className="h-full w-full" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-950 dark:text-white">
                    {s.name}
                  </h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {s.achievements && (
                <div className="mt-6 pt-4 border-t border-slate-150 dark:border-slate-800 flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-350">
                  <Star className="h-4.5 w-4.5 text-school-gold shrink-0 mt-0.5" />
                  <span className="font-semibold italic">Accolade: {s.achievements}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
