"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Award, ShieldAlert, ArrowRight, HelpCircle } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolScholarships({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Scholarships & Financial Aid" 
        subtitle="Scholarships"
        breadcrumbs={[
          { label: "Admissions" },
          { label: "Scholarships" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Financial Aid
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Nurturing Deserving Students
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We offer merit-based waivers and awards to encourage top performances in academics, technology innovation, and sports.
          </p>
        </div>

        {/* Scholarships List */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {schoolInfo.scholarships.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <Award className="h-5 w-5 text-blue-600 dark:text-school-gold shrink-0" />
                  <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-normal">
                  <strong className="text-slate-700 dark:text-slate-300">Eligibility:</strong> {s.eligibility}
                </p>
              </div>

              <div className="bg-blue-600/10 text-blue-600 dark:text-school-gold border border-blue-500/10 px-4 py-2 rounded-2xl text-center shrink-0 w-full sm:w-auto">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-450">Coverage</span>
                <span className="font-serif font-black text-sm sm:text-base">{s.coverage}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to apply */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] p-8 sm:p-10 shadow-md space-y-6 max-w-3xl mx-auto text-center">
          <HelpCircle className="h-10 w-10 text-school-gold mx-auto animate-pulse" />
          <h3 className="text-xl font-bold font-serif text-slate-950 dark:text-white">How to Apply for Financial Aid?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Prospective candidates should submit their scholarship applications alongside standard admission forms, attaching transcript reports or national awards.
          </p>
          <div className="pt-2">
            <Link href={`/${schoolSlug}/admissions/apply`}>
              <Button className={`font-bold ${schoolInfo.btnTheme}`}>
                <span>Apply for admissions</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
