"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Award, CheckCircle2, Globe, Binary, ArrowRight } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolCurriculum({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  // Set colors for curriculum cards dynamically
  const cardColors = [
    "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5",
    "border-amber-500/20 text-amber-600 dark:text-school-gold bg-amber-500/5",
    "border-purple-500/20 text-purple-600 dark:text-purple-400 bg-purple-500/5"
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Our Academic Curriculum" 
        subtitle="Academic Tracks"
        breadcrumbs={[
          { label: "Academics" },
          { label: "Curriculum" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Academic Pathways
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
            Comprehensive Curriculum Structure
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            We provide pathways that allow students to balance core subjects with modern technology, coding logic, and languages.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {schoolInfo.curriculum.map((track, index) => {
            const cardColor = cardColors[index % cardColors.length];
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-850 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className={`p-4 rounded-2xl w-fit ${cardColor}`}>
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    {track.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed min-h-[72px]">
                    {track.desc}
                  </p>
                  
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                    {track.highlights.map((b) => (
                      <div key={b} className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-350 text-xs sm:text-sm">
                        <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 dark:text-school-gold shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link href={`/${schoolSlug}/admissions/apply`} className="block w-full">
                    <Button variant="outline" className={`w-full justify-between font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-school-gold dark:hover:text-slate-950 border-blue-600/30 text-blue-600 dark:text-school-gold`}>
                      <span>Apply For This Pathway</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>
    </main>
  );
}
