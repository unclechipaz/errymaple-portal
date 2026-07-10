"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Award, BookOpen, Compass, Cpu, GraduationCap, ShieldCheck, 
  ArrowRight, Sparkles, BookMarked, UserCheck, MessageSquare, 
  School, Calendar, Trophy, ArrowUpRight, ShieldAlert,
  ChevronLeft, ChevronRight, Star, Heart, CheckCircle2,
  Users, Leaf, Brain, Globe, Laptop, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolHome({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % schoolInfo.testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + schoolInfo.testimonials.length) % schoolInfo.testimonials.length);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-slate-50 dark:bg-slate-950 overflow-hidden pt-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f294204_1px,transparent_1px),linear-gradient(to_bottom,#0f294204_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e3a8a08_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a08_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="h-4 w-4 text-school-gold animate-pulse" />
              <span>{schoolInfo.motto}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-tight"
            >
              {schoolInfo.name.split(" ").slice(0, 2).join(" ")} <span className="text-gradient-gold">{schoolInfo.name.split(" ").slice(2).join(" ")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-650 dark:text-slate-350 text-sm sm:text-lg leading-relaxed font-sans"
            >
              {schoolInfo.aboutText} Empowering students through quality training, tech innovation, moral responsibility, and global perspectives in Zvishavane, Zimbabwe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={`/${schoolSlug}/admissions/apply`} className="w-full sm:w-auto">
                <Button size="lg" className={`w-full font-bold shadow-lg ${schoolInfo.btnTheme}`}>
                  Apply Online
                </Button>
              </Link>
              <Link href={`/${schoolSlug}/contact`} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full font-bold border-slate-300 hover:bg-slate-100 text-slate-800 dark:border-white/20 dark:hover:bg-white/10 dark:text-white">
                  Schedule a Visit
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column (Visual Collage) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-2xl relative group">
                <img src={schoolInfo.landingImages?.classroom || "/images/classrooms_gallery.png"} alt="Classrooms" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 text-slate-900 dark:text-white font-serif font-bold text-xs bg-white/95 dark:bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/5 shadow-md backdrop-blur-sm">
                  Classroom Excellence
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-2xl relative group">
                <img src={schoolInfo.landingImages?.stem || "/images/robotics_gallery.png"} alt="Robotics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 text-slate-900 dark:text-white font-serif font-bold text-xs bg-white/95 dark:bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/5 shadow-md backdrop-blur-sm">
                  STEM & Innovation
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-2xl relative group">
                <img src={schoolInfo.landingImages?.sports || "/images/golf_gallery.png"} alt="Sports" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 text-slate-900 dark:text-white font-serif font-bold text-xs bg-white/95 dark:bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/5 shadow-md backdrop-blur-sm">
                  Sports Academy
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-2xl relative group">
                <img src={schoolInfo.landingImages?.leadership || "/images/leadership_gallery.png"} alt="Leadership" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 text-slate-900 dark:text-white font-serif font-bold text-xs bg-white/95 dark:bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/5 shadow-md backdrop-blur-sm">
                  Leadership Development
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolInfo.stats.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-md hover:shadow-lg transition-all duration-300 flex items-start space-x-4"
                >
                  <div className="bg-blue-500/10 text-blue-600 dark:text-school-gold p-3 rounded-xl shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white block">
                      {card.value}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {card.label}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC HIGHLIGHTS */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-90 h-90 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-6 text-slate-800 dark:text-slate-100"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold block">
                  Curriculum Highlights
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-tight">
                  Excellence Without Limits
                </h2>
              </div>
              <p className="text-slate-550 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {schoolInfo.name} offers highly structured and accredited academic pathways designed to unlock students' potentials. From international curriculum standards to digital literacy classes, we ensure our graduates are equipped for global success.
              </p>
              <div className="pt-2">
                <Link href={`/${schoolSlug}/academics/curriculum`}>
                  <Button className={`font-bold ${schoolInfo.btnTheme}`}>
                    View Academic Pathways
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              {schoolInfo.curriculum.map((item) => (
                <div 
                  key={item.title}
                  className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 hover:border-blue-500/30 transition-all duration-300"
                >
                  <h3 className="font-bold text-slate-950 dark:text-white text-base sm:text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h, i) => (
                      <span key={i} className="bg-blue-600/10 text-blue-600 dark:text-school-gold text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/10">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPAL'S WELCOME */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Principal Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-blue-600/10 rounded-[32px] translate-x-4 translate-y-4 -z-10" />
              <div className="rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-850 bg-slate-950 aspect-[4/5] shadow-2xl relative group">
                <img 
                  src="/images/leadership_gallery.png" 
                  alt="Principal" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent text-white">
                  <h3 className="text-xl font-bold font-serif text-school-gold">{schoolInfo.welcomeAuthor}</h3>
                  <p className="text-xs text-slate-350">{schoolInfo.welcomeRole}, {schoolInfo.shortName}</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 text-slate-800 dark:text-slate-100"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-school-gold flex items-center gap-1.5">
                  <MessageSquare className="h-4.5 w-4.5" /> Welcome Message
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight text-slate-900 dark:text-white">
                  Message from Administration
                </h2>
              </div>
              
              <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base font-sans">
                <p>{schoolInfo.welcomeText}</p>
              </div>

              <div className="pt-4">
                <Link href={`/${schoolSlug}/about/leadership`}>
                  <Button className={`font-bold gap-2 ${schoolInfo.btnTheme}`}>
                    <span>Meet Our Leadership Team</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-school-gold block">
            Parent & Alumni Voices
          </span>
          
          <div className="min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-slate-700 dark:text-slate-200 text-lg sm:text-2xl font-serif italic leading-relaxed">
                  "{schoolInfo.testimonials[activeTestimonial].quote}"
                </p>
                <div>
                  <h4 className="text-base font-bold text-slate-950 dark:text-white">
                    {schoolInfo.testimonials[activeTestimonial].author}
                  </h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
                    {schoolInfo.testimonials[activeTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-3">
            <button 
              onClick={prevTestimonial}
              className="p-3.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 dark:border-white/10 dark:hover:bg-white/5 dark:text-white transition-all shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-3.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 dark:border-white/10 dark:hover:bg-white/5 dark:text-white transition-all shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL-TO-ACTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center relative overflow-hidden transition-colors">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-tight">
            Begin the Journey to <span className="text-gradient-gold">Greatness</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Enroll today at {schoolInfo.name} and secure a world-class foundation in academic learning, innovation, and character development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/${schoolSlug}/admissions/apply`}>
              <Button size="lg" className={`font-bold w-full sm:w-auto ${schoolInfo.btnTheme}`}>
                Apply Online Now
              </Button>
            </Link>
            <Link href={`/${schoolSlug}/contact`}>
              <Button variant="outline" size="lg" className="font-bold border-slate-300 hover:bg-slate-100 text-slate-800 dark:border-white/20 dark:hover:bg-white/10 dark:text-white w-full sm:w-auto">
                Contact Admissions
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
