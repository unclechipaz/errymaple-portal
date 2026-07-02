"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Award, Trophy, Star, CheckCircle2 } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolResults({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Public Exam Results & Statistics" 
        subtitle="Exam Performance"
        breadcrumbs={[
          { label: "Academics" },
          { label: "Performance Results" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Academic Track Record
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Pass Rate Trend Data
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We celebrate our students' consistent excellence across ZIMSEC, Cambridge, and HEXCO examinations. View our historical passing rate details below.
          </p>
        </div>

        {/* Results Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] overflow-hidden shadow-xl"
        >
          <div className="p-6 sm:p-8 bg-slate-950 text-white flex items-center space-x-3.5">
            <Trophy className="h-6 w-6 text-school-gold shrink-0" />
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Historical Pass Rates</h3>
              <p className="text-slate-400 text-xs leading-normal">Compiled from annual examination council reports.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/20">
                  <th className="py-4 px-6 sm:px-8">Academic Year</th>
                  <th className="py-4 px-6">Primary / Ordinary Level</th>
                  <th className="py-4 px-6">Advanced Level</th>
                  <th className="py-4 px-6 sm:px-8">University / High-School Entry Placement</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 divide-y divide-slate-100 dark:divide-slate-800">
                {schoolInfo.results.map((r) => (
                  <tr key={r.year} className="hover:bg-slate-50/30 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 sm:px-8 font-bold text-slate-900 dark:text-white">{r.year}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5 font-semibold text-emerald-600">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>{r.oLevelPass}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-1.5 font-semibold ${r.aLevelPass === "N/A" ? "text-slate-400" : "text-emerald-600"}`}>
                        {r.aLevelPass !== "N/A" && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                        <span>{r.aLevelPass}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 sm:px-8 font-semibold text-slate-900 dark:text-white">{r.universityPlacement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </section>
    </main>
  );
}
