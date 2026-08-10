"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { HelpCircle, ArrowRight } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolFAQ({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const renderFormattedAnswer = (text: string) => {
    return (
      <div className="space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
        {text.split("\n\n").map((paragraph, pIdx) => {
          const parts = paragraph.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={pIdx}>
              {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={i} className="font-bold text-slate-900 dark:text-white">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Admissions Help"
        breadcrumbs={[
          { label: "Admissions" },
          { label: "FAQ" }
        ]}
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Common Admissions Inquiries
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Find answers to frequently asked questions about enrollment guides, boarding lists, and academic curriculum pathways.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-6">
          {schoolInfo.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3.5">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-school-gold shrink-0 mt-0.5" />
                <div className="space-y-3 w-full">
                  <h3 className="text-base sm:text-lg font-bold font-serif text-slate-950 dark:text-white leading-snug">
                    {faq.question}
                  </h3>
                  {renderFormattedAnswer(faq.answer)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ask another question */}
        <div className="text-center pt-8 border-t border-slate-150 dark:border-slate-850">
          <p className="text-slate-600 dark:text-slate-450 text-xs sm:text-sm mb-4">Have another question not answered above?</p>
          <Link href={`/${schoolSlug}/contact`}>
            <Button className={`font-bold ${schoolInfo.btnTheme}`}>
              <span>Ask Our Admissions Office</span>
              <ArrowRight className="h-4.5 w-4.5 ml-1.5" />
            </Button>
          </Link>
        </div>

      </section>
    </main>
  );
}
