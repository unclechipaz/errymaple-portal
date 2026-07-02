"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolDepartments({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Academic Departments" 
        subtitle="Our Faculty Divisions"
        breadcrumbs={[
          { label: "Academics" },
          { label: "Departments" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            School Faculties
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Structured Learning & Specialization
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Our departments coordinate syllabus objectives, classroom materials, and laboratory tasks to maintain top academic standards.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolInfo.departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-school-gold flex items-center justify-center p-2.5 shrink-0">
                    <BookOpen className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">
                    {dept.title}
                  </h3>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {dept.desc}
                </p>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subjects Taught</span>
                  {dept.subjects.map((sub) => (
                    <div key={sub} className="flex items-center space-x-2 text-slate-700 dark:text-slate-350 text-xs sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
