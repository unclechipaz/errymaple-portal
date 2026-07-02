"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, BookOpen, Brain, Sparkles, CheckCircle } from "lucide-react";

export default function AcademicExcellence() {
  const [activeTab, setActiveTab] = useState("secondary");

  const tabs = [
    { id: "secondary", label: "O & A Level Pathways", icon: GraduationCap },
    { id: "primary", label: "Primary Foundations", icon: BookOpen },
    { id: "ecd", label: "Early Childhood (ECD)", icon: Brain },
    { id: "vocational", label: "Vocational & Life Skills", icon: Award },
  ];

  const content = {
    secondary: {
      title: "O & A Level Academic Pathways",
      desc: "Our high school offers a dual-examination track designed to equip students for local university entry and global scholarship allocations.",
      points: [
        "Cambridge IGCSE, AS, and A-Level curriculum options.",
        "ZIMSEC Ordinary and Advanced Level syllabi.",
        "Advanced STEM combinations (Mathematics, Physics, Chemistry, Biology, Computer Science).",
        "Humanities and Business options (Accounting, Business Studies, Geography, History, Literature).",
        "Intensive exam preparation workshops and mock evaluation schedules.",
        "Full support for University Career Guidance and admissions.",
      ],
      badge: "Cambridge & ZIMSEC Accredited",
    },
    primary: {
      title: "Holistic Primary School Curricula",
      desc: "Laying a solid foundations for analytical capability, literacy, numeracy, and scientific inquiry in our junior students.",
      points: [
        "Curriculum aligned with national standards and primary Cambridge frameworks.",
        "Focus on core modules: Mathematics, Science, English, Shona, and Heritage Studies.",
        "Integration of technology and digital literacy early in the classroom.",
        "Arts, music, and physical education integrated weekly.",
        "Individualized academic tracking for developmental reading and writing.",
      ],
      badge: "Holistic Primary Framework",
    },
    ecd: {
      title: "Early Childhood Development (ECD)",
      desc: "Fostering natural curiosity, motor coordination, early numeracy, and social-emotional intelligence in our youngest learners.",
      points: [
        "Safe, nurturing, and play-based classroom setups.",
        "Introduction to foundational numeracy and reading through sensory exploration.",
        "Interactive storytelling, music, basic drama, and allied art participation.",
        "Early logic and reasoning activities using structural blocks and smart plays.",
        "Focus on character development, values, respect, and emotional sharing.",
      ],
      badge: "Ages 3 - 5 Foundations",
    },
    vocational: {
      title: "Vocational Training & Real-Life Skills",
      desc: "True education links academic success to practical, life-ready, and vocational capabilities that foster entrepreneurship.",
      points: [
        "Robotics and computer programming classes.",
        "Agricultural science and agribusiness projects (practical crop/animal care).",
        "Hands-on skills workshops including baking, pastry design, and kitchen safety.",
        "Basic carpentry, crafting, design, and workshop organization.",
        "Financial literacy, entrepreneurial business planning, and leadership workshops.",
      ],
      badge: "Practical Life Skills",
    },
  };

  const current = content[activeTab as keyof typeof content];

  return (
    <section id="academics" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 bg-school-blue/10 dark:bg-school-blue/20 text-school-blue dark:text-school-blue-light px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-school-gold" />
            <span>Curriculum Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
            Academic Excellence & Rigor
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg">
            We offer specialized, balanced syllabi that ensure students excel in standardized exams while learning real-world skills.
          </p>
        </div>

        {/* Tab Buttons Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-4 mb-10 border-b border-slate-200 dark:border-slate-800 scrollbar-none justify-start lg:justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-t-xl text-sm font-semibold border-b-2 transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "border-school-blue dark:border-school-gold text-school-blue dark:text-school-gold bg-white dark:bg-slate-950 shadow-sm"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-8 sm:p-12 shadow-xl glow-blue min-h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full"
            >
              {/* Left text pane */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block bg-school-gold/15 dark:bg-school-gold/20 text-school-gold px-3.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {current.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
                  {current.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Right points checkmark list */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 rounded-xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-4">
                  Key Curriculum Pillars
                </h4>
                <div className="space-y-4.5">
                  {current.points.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-school-blue dark:text-school-gold shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
