"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Mail, GraduationCap, Briefcase, Award } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolStaff({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  // Create additional mock staff for other positions to make it high-fidelity
  const extendedStaff = [
    ...schoolInfo.staff,
    {
      name: "Mrs. M. Zhou",
      role: "Senior Accountant",
      qualification: "B.Acc (Hons), ACCA Candidate",
      desc: "Supervising tuition billing schedules, bursary accounts, and administrative accounting procedures.",
      email: "finance@errymaple.co.zw"
    },
    {
      name: "Mr. S. Moyo",
      role: "Sports Administrator & Head Coach",
      qualification: "Diploma in Sports Science & Physical Education",
      desc: "Managing co-curricular scheduling, sports academy coaching lists, and inter-school fixtures.",
      email: "sports@errymaple.co.zw"
    },
    {
      name: "Mrs. T. Sibanda",
      role: "Senior Resident Hostess / Boarding Supervisor",
      qualification: "Certificate in Nursing & Child Psychology",
      desc: "Managing hostels residency, catering menus, student health cards, and weekend dorm welfare.",
      email: "hostel@errymaple.co.zw"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Our Academic Faculty & Staff" 
        subtitle="School Staff"
        breadcrumbs={[
          { label: "About Us" },
          { label: "Faculty & Staff" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
            Educators & Personnel
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Dedicated Academic Faculty
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Our teachers are certified professionals dedicated to building active classroom sessions. Meet the faculty members, sports coaches, and resident supervisors at {schoolInfo.name}.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {extendedStaff.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center space-x-3.5">
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-school-gold flex items-center justify-center p-3 shrink-0">
                    <Briefcase className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-slate-950 dark:text-white">
                      {person.name}
                    </h3>
                    <p className="text-xs text-school-gold font-bold uppercase tracking-wider">
                      {person.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex items-center space-x-2 text-slate-655 dark:text-slate-350 text-xs sm:text-sm">
                    <GraduationCap className="h-4.5 w-4.5 text-slate-450 shrink-0" />
                    <span className="font-semibold italic">{person.qualification}</span>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {person.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-450 hover:text-blue-600 dark:hover:text-school-gold transition-colors py-2 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Message</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
