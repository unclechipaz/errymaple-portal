"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Landmark, ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolFees({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const schoolSlugLower = schoolSlug;

  if (schoolSlugLower === "high-school") {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <PageHeader 
          title="Tuition, Boarding & School Fees" 
          subtitle="Fee Schedules"
          breadcrumbs={[
            { label: "Admissions" },
            { label: "Fees Schedule" }
          ]}
        />

        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Intro */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
              School Financials
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Transparent Fee Structure
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              We maintain structured fee payment systems. Tuition covers classroom instruction, laboratory charges, and co-curricular projects.
            </p>
          </div>

          {/* Fees Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Boarders Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-8 rounded-3xl shadow-lg relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Residency Stream</span>
                  <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Boarders</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">USD 1,000</span>
                  <span className="text-xs text-slate-450 font-semibold">/ term</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-b border-slate-100 dark:border-slate-800 pb-4">
                  Full-time boarding residency including secure hostel rooms, nutritious dining hall meals, weekend laundry, and tutorial access.
                </p>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Details</h4>
                  <ul className="space-y-2.5">
                    <li className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">Registration Fee</span>
                      </div>
                      <strong className="text-slate-950 dark:text-white">USD 100</strong>
                    </li>
                    <li className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">Boarding Fees</span>
                      </div>
                      <strong className="text-slate-950 dark:text-white">USD 1,000</strong>
                    </li>
                    <li className="flex items-start justify-between text-xs sm:text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300 text-left">Grocery Requirement</span>
                      </div>
                      <strong className="text-slate-950 dark:text-white text-right ml-2 shrink-0">List or USD 40 eq.</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Day Scholars Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-8 rounded-3xl shadow-lg relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-600/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Day Stream</span>
                  <span className="bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Day Scholars</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">USD 380</span>
                  <span className="text-xs text-slate-450 font-semibold">/ term</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-b border-slate-100 dark:border-slate-800 pb-4">
                  Standard day-study tuition covering classroom instruction, science & IT laboratory charges, and co-curricular club entry.
                </p>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Details</h4>
                  <ul className="space-y-2.5">
                    <li className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">Registration Fee</span>
                      </div>
                      <strong className="text-slate-950 dark:text-white">USD 50</strong>
                    </li>
                    <li className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">School Fees</span>
                      </div>
                      <strong className="text-slate-950 dark:text-white">USD 380</strong>
                    </li>
                    <li className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">Grocery Fee</span>
                      </div>
                      <strong className="text-slate-950 dark:text-white">USD 10</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Requirements & Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-md space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2.5">
              <Landmark className="h-5 w-5 text-blue-600 dark:text-school-gold shrink-0" />
              <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">Additional requirements</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-350">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Uniform Package: <strong className="text-slate-900 dark:text-white">USD 250</strong></span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs italic">
                * Note: Boarding fees cover all meals, laundry services, and academic tutorials.
              </p>
              <a 
                href="/documents/errymaple_requirements.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-school-gold dark:hover:bg-amber-600 text-white dark:text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
              >
                <FileText className="h-4 w-4" />
                <span>View Requirements List (PDF)</span>
              </a>
            </div>
          </div>

        </section>
      </main>
    );
  }

  if (schoolSlugLower === "junior-school") {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <PageHeader 
          title="Tuition, Boarding & School Fees 2026" 
          subtitle="Fee Schedules"
          breadcrumbs={[
            { label: "Admissions" },
            { label: "Fees Schedule" }
          ]}
        />

        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Intro */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-school-gold block">
              School Fees Summary 2026
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Transparent & Value-Driven Fee Structure
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Our fees are competitive and designed to provide excellent value while maintaining high educational standards. Flexible payment arrangements may be available.
            </p>
          </div>

          {/* Fees Tables & Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Day Scholars Tuition */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Day Scholars</span>
                  <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Tuition / Term</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">ECD A</span>
                    <strong className="text-slate-900 dark:text-white font-bold">$195 / term</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">ECD B</span>
                    <strong className="text-slate-900 dark:text-white font-bold">$235 / term</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Grade 1</span>
                    <strong className="text-slate-900 dark:text-white font-bold">$335 / term</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Grade 2 – 4</span>
                    <strong className="text-slate-900 dark:text-white font-bold">$435 / term</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Grade 5 – 7 (ZIMSEC Stream)</span>
                    <strong className="text-slate-900 dark:text-white font-bold">$435 / term</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Grade 5 – 7 (CAMBRIDGE Stream)</span>
                    <strong className="text-emerald-600 dark:text-school-gold font-bold">$500 / term</strong>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 italic">
                * Note: Specialisation starts from Grade 5 to 7.
              </p>
            </motion.div>

            {/* Boarding Residency */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Boarding Residency</span>
                  <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Hostel / Term</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-slate-100 dark:border-slate-800/50">
                    <div>
                      <span className="text-slate-900 dark:text-white font-bold block">ZIMSEC Boarding Stream</span>
                      <span className="text-slate-500 text-[11px]">Includes room, 3 meals daily & study care</span>
                    </div>
                    <strong className="text-slate-900 dark:text-white font-serif text-xl">$735 / term</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-2">
                    <div>
                      <span className="text-slate-900 dark:text-white font-bold block">CAMBRIDGE Boarding Stream</span>
                      <span className="text-slate-500 text-[11px]">Includes room, 3 meals & Cambridge tutorials</span>
                    </div>
                    <strong className="text-emerald-600 dark:text-school-gold font-serif text-xl">$800 / term</strong>
                  </div>
                </div>

                {/* Once-off fees */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Once-off Enrollment Fees</h4>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span>Registration Fee:</span>
                    <strong className="text-slate-900 dark:text-white">$40</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span>Bed Fee (Boarders):</span>
                    <strong className="text-slate-900 dark:text-white">$100</strong>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Uniform & Transport Cards */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-md space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2.5">
              <Landmark className="h-5 w-5 text-emerald-600 dark:text-school-gold shrink-0" />
              <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">Uniform Sets & Transport Services</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                <h4 className="font-bold text-slate-900 dark:text-white">Uniform Requirements (Summer & Winter)</h4>
                <p className="text-slate-500 text-xs">All uniforms are bought directly at the school.</p>
                <div className="pt-2 space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between"><span>Girls Uniform Set:</span><strong>$348</strong></div>
                  <div className="flex justify-between"><span>Boys Uniform Set:</span><strong>$322</strong></div>
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                <h4 className="font-bold text-slate-900 dark:text-white">Transport Services</h4>
                <p className="text-slate-500 text-xs">We provide safe and reliable transport fleet including big buses, commuter omnibuses, and small cars for daily runs and trips.</p>
              </div>
            </div>
          </div>

        </section>
      </main>
    );
  }

  const feeData = schoolInfo.fees[0];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Tuition, Boarding & School Fees" 
        subtitle="Fee Schedules"
        breadcrumbs={[
          { label: "Admissions" },
          { label: "Fees Schedule" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            School Financials
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Transparent Fee Structure
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We maintain structured fee payment systems. Tuition covers co-curricular materials, library catalogs, and basic health checks.
          </p>
        </div>

        {/* Fees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Tuition Fee */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 rounded-3xl shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Termly Tuition</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">{feeData.termly}</span>
                <span className="text-xs text-slate-450 font-semibold">/ term</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Covers classroom materials, science and IT laboratory charges, administrative tests, and extracurricular club registrations.
              </p>
            </div>
          </motion.div>

          {/* Boarding Fee */}
          {feeData.boarding && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 rounded-3xl shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-600/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Hostel Boarding</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">{feeData.boarding}</span>
                  <span className="text-xs text-slate-450 font-semibold">/ term</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Covers full hostel residency, three nutritious buffet meals daily, weekend laundry service, and resident supervisor support.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Requirements & Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] p-8 sm:p-10 shadow-md space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2.5">
            <Landmark className="h-5 w-5 text-blue-600 dark:text-school-gold shrink-0" />
            <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">Additional requirements</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-655 dark:text-slate-350">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Uniform Package: <strong className="text-slate-900 dark:text-white">{feeData.uniform}</strong></span>
            </div>
            {feeData.application && (
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Application Fee: <strong className="text-slate-900 dark:text-white">{feeData.application}</strong></span>
              </div>
            )}
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic border-t border-slate-100 dark:border-slate-800 pt-4">
            * Note: {feeData.note}
          </p>
        </div>

      </section>
    </main>
  );
}
