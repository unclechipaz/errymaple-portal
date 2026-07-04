"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { FileText, Download, Tag } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolDownloads({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const handleDownload = (fileName: string, fileLink?: string) => {
    if (fileLink) {
      window.open(fileLink, "_blank");
    } else {
      alert(`Starting download for: ${fileName}`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Document Downloads & Forms" 
        subtitle="School Resources"
        breadcrumbs={[
          { label: "Downloads" }
        ]}
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Resource Library & PDF Files
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Download registration checklists, uniform guidelines, term calendars, and financial policy booklets.
          </p>
        </div>

        {/* Downloads list */}
        <div className="space-y-4">
          {schoolInfo.downloads.map((d, index) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-red-500/10 text-red-600 rounded-xl shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-slate-950 dark:text-white">
                    {d.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mt-1">
                    <span>Size: {d.size}</span>
                    <span>•</span>
                    <span className="bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{d.type}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleDownload(d.name, d.link)}
                className={`font-bold w-full sm:w-auto gap-1.5 ${schoolInfo.btnTheme}`}
              >
                <Download className="h-4.5 w-4.5" />
                <span>Download file</span>
              </Button>
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}
