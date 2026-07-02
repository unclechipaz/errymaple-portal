"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Eye, X, HelpCircle } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolGallery({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Extract unique categories dynamically
  const categories = ["All", ...Array.from(new Set(schoolInfo.gallery.map(item => item.category)))];

  const filteredGallery = activeCategory === "All"
    ? schoolInfo.gallery
    : schoolInfo.gallery.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Campus Media Gallery" 
        subtitle="School Gallery"
        breadcrumbs={[
          { label: "Student Life" },
          { label: "Gallery" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Moments from Errymaple
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Browse our campus life visual archives covering laboratory research, sports competitions, classroom lectures, and cultural events.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                  : "bg-white text-slate-600 border border-slate-200/50 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-350 dark:border-white/5 dark:hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md cursor-pointer"
              onClick={() => setLightboxImg(item.img)}
            >
              <img src={item.img} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-school-gold text-[10px] font-bold uppercase tracking-widest block mb-1">
                  {item.category}
                </span>
                <h4 className="text-white font-bold font-serif text-sm sm:text-base flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-school-gold" /> {item.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox PopUp Viewer */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/95 z-[100] flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxImg(null)}
            >
              <button 
                onClick={() => setLightboxImg(null)}
                className="absolute top-6 right-6 p-3 bg-slate-900 border border-slate-800 text-white rounded-full hover:bg-red-600 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="h-6 w-6" />
              </button>
              <motion.img 
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                src={lightboxImg} 
                alt="Enlarged media" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/5" 
              />
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </main>
  );
}
