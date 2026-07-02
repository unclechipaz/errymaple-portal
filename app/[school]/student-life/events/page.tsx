"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolEvents({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Upcoming School Events" 
        subtitle="School Events"
        breadcrumbs={[
          { label: "Student Life" },
          { label: "Events" }
        ]}
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Calendar of School Events
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Stay updated with our term schedules, sports gala sessions, prize giving days, and parent-teacher meetings.
          </p>
        </div>

        {/* Events list */}
        <div className="space-y-6">
          {schoolInfo.events.map((e, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-600/10 text-blue-600 dark:text-school-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/10">
                    {e.category}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{e.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">
                  {e.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{e.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{e.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
