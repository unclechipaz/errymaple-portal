"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Eye, Rocket } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolVisionMission({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Vision, Mission & Core Values" 
        subtitle="Our Principles"
        breadcrumbs={[
          { label: "About Us" },
          { label: "Vision & Mission" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Vision & Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-all pointer-events-none" />
            <div className="space-y-6">
              <div className="bg-blue-600/10 text-blue-600 p-4 rounded-2xl w-fit">
                <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                Our Vision
              </h2>
              <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {schoolInfo.visionText}
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/5 rounded-full blur-2xl group-hover:bg-yellow-600/10 transition-all pointer-events-none" />
            <div className="space-y-6">
              <div className="bg-yellow-600/10 text-school-gold p-4 rounded-2xl w-fit">
                <Rocket className="h-8 w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                Mission Statement
              </h2>
              <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {schoolInfo.missionText}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              We anchor our academic curriculum on fundamental pillars that guide classroom behaviors, sportsmanship, and student rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto justify-center">
            {schoolInfo.coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4"
                >
                  <div className="bg-blue-600/10 text-blue-600 dark:text-school-gold p-3.5 rounded-xl">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold font-serif text-slate-950 dark:text-white">
                      {v.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </section>
    </main>
  );
}
