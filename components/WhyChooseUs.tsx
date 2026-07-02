"use client";

import { motion } from "framer-motion";
import { BookOpen, Cpu, ShieldCheck, Trophy, Sparkles, CheckCircle2 } from "lucide-react";

const motionFramer = motion;

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "Academic Rigor",
      desc: "Outstanding pass rates in national examinations (ZIMSEC) and international standard validations (Cambridge). Small class sizes and dedicated mentors ensure no child is left behind.",
      icon: BookOpen,
      iconBg: "bg-school-blue/10 text-school-blue dark:bg-school-blue/20 dark:text-school-blue-light",
    },
    {
      title: "AI & Innovation Focus",
      desc: "Pioneering STEM-centric instruction including robotics, coding, digital literacy, and practical technological workflows from primary classes to advanced high school levels.",
      icon: Cpu,
      iconBg: "bg-school-gold/10 text-school-gold dark:bg-school-gold/20 dark:text-school-gold",
    },
    {
      title: "Character & Leadership",
      desc: "Nurturing values of integrity, respect, discipline, and emotional intelligence. Helping students find their voice and purpose as positive agents of change.",
      icon: ShieldCheck,
      iconBg: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      title: "Holistic Development",
      desc: "Renowned sports coaching, allied arts festivals, active clubs, chess federations, and entrepreneurial business setups preparing students for comprehensive real-world trials.",
      icon: Trophy,
      iconBg: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400",
    },
  ];

  const benefits = [
    "Boarding facilities for boys and girls in Zvishavane.",
    "Comprehensive science, engineering, and computer laboratories.",
    "Dual-examination tracks (Cambridge and ZIMSEC).",
    "Robotics clubs with global and national competition participation.",
    "Deep-seated business, agricultural, and vocational training.",
    "Qualified local and international teaching staff.",
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Grid layout for left column (Text & list) and right column (Cards grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: General Overview */}
          <div className="lg:col-span-5 space-y-6">
            <motionFramer.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-1 bg-school-gold/10 dark:bg-school-gold/20 text-school-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Errymaple Advantage</span>
            </motionFramer.div>

            <motionFramer.h2
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-tight"
            >
              Why Parents Trust Errymaple
            </motionFramer.h2>

            <motionFramer.p
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-base leading-relaxed"
            >
              We believe in "real education"—an education that goes beyond textbooks to arm our students with critical analytical skills, moral anchors, and digital capabilities.
            </motionFramer.p>

            {/* Bullet benefits */}
            <motionFramer.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 pt-2"
            >
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-5 w-5 text-school-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </motionFramer.div>
          </div>

          {/* Right Side: Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motionFramer.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`p-3.5 rounded-xl w-fit ${pillar.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif mt-5">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motionFramer.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
