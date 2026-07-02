"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Mail, GraduationCap } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolLeadership({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Our Leadership Team" 
        subtitle="Dedicated Educators"
        breadcrumbs={[
          { label: "About Us" },
          { label: "School Leadership" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Administrative Team
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Guiding Our Academic Family
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {schoolInfo.leadershipIntro || `Our leadership team combines educational administration experience with a dedication to student success. Meet the administration driving ${schoolInfo.name}'s commitment to leadership and character.`}
          </p>
        </div>

        {/* Administration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {schoolInfo.staff.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-2xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-school-gold flex items-center justify-center p-3 shrink-0">
                    <GraduationCap className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-school-gold transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-school-gold font-bold uppercase tracking-wider mt-0.5">
                      {leader.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Credentials:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm italic font-medium leading-normal">
                    {leader.qualification}
                  </p>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {leader.desc}
                </p>
              </div>

              <div className="p-8 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <a
                  href={`mailto:${leader.email}`}
                  className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-450 hover:text-blue-600 dark:hover:text-school-gold transition-colors py-3 w-full border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <Mail className="h-4.5 w-4.5" />
                  <span>Contact Email</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
