"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { School, CheckCircle2, ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolBoarding({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const boardingData = schoolInfo.boarding;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Hostel Residency & Boarding Life" 
        subtitle="Boarding Life"
        breadcrumbs={[
          { label: "Admissions" },
          { label: "Boarding Life" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Residential Life
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            {boardingData.title}
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {boardingData.desc}
          </p>
        </div>

        {/* Boarding features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {boardingData.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md flex items-start space-x-4"
            >
              <div className="bg-emerald-500/10 text-emerald-600 dark:text-school-gold p-3 rounded-xl shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold font-serif text-slate-950 dark:text-white">
                  Pillar {index + 1}
                </h3>
                <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {feature}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Boarding Schedule */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] p-8 sm:p-10 shadow-md space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2.5">
            <Clock className="h-5 w-5 text-blue-600 dark:text-school-gold shrink-0" />
            <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">Typical Boarding Daily Routine</h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-655 dark:text-slate-350">
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">06:00 AM - 07:00 AM</span>
              <span>Morning Devotions, Hostel Clean Up & Breakfast</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">07:45 AM - 01:00 PM</span>
              <span>Core Morning Lessons & Classes</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">01:00 PM - 02:00 PM</span>
              <span>Lunch Recess & Mid-day break</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">02:00 PM - 04:30 PM</span>
              <span>Afternoon Classes / Co-curricular Sports / Clubs</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">06:00 PM - 07:00 PM</span>
              <span>Dinner Session</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="font-bold text-slate-900 dark:text-white">07:00 PM - 09:00 PM</span>
              <span>Supervised Evening Study Prep (Hostel Hall)</span>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
