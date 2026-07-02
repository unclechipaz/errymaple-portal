"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolFacilities({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Our Campus & Infrastructure" 
        subtitle="Facilities"
        breadcrumbs={[
          { label: "About Us" },
          { label: "Campus Facilities" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
            A Campus Designed for Excellence
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {schoolInfo.facilitiesIntro || "We provide state-of-the-art facilities designed to enrich laboratory sessions, library learning, co-curricular sports, and residency comforts."}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolInfo.facilities.map((fac, index) => (
            <motion.div
              key={fac.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 relative overflow-hidden bg-slate-200">
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                    Active Facility
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white leading-tight">
                    {fac.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <span className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-school-gold hover:underline gap-1 cursor-pointer">
                  <span>View Photo Gallery</span>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Parents Choose Section */}
        {schoolInfo.chooseReasons && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[40px] p-8 sm:p-12 shadow-xl max-w-4xl mx-auto space-y-10"
          >
            <div className="text-center space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                Why Parents Choose {schoolInfo.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                Key pillars that make our educational pathway the top choice for Midlands families.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {schoolInfo.chooseReasons.map((reason, i) => (
                <div key={i} className="flex items-start space-x-3 text-slate-700 dark:text-slate-350">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-school-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </section>
    </main>
  );
}
