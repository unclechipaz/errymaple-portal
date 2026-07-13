"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Award, BookOpen, Compass, Cpu, GraduationCap, ShieldCheck, 
  ArrowRight, BookMarked, UserCheck, MessageSquare, 
  School, Calendar, Trophy, ArrowUpRight, ShieldAlert,
  ChevronLeft, ChevronRight, Star, Heart, CheckCircle2,
  Users, Leaf, Brain, Globe, Laptop, HelpCircle,
  Phone, Mail, MapPin, Flame
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

  if (schoolSlug === "international-school") {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center bg-slate-50 dark:bg-slate-950 overflow-hidden pt-12">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f294204_1px,transparent_1px),linear-gradient(to_bottom,#0f294204_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e3a8a08_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a08_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-350 border border-blue-200/50 dark:border-blue-900/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                WELCOME TO ERRYMAPLE INTERNATIONAL SCHOOL
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0f2942] dark:text-white font-serif tracking-tight leading-[1.15]"
              >
                Inspiring Minds.<br />
                Building Futures.<br />
                <span className="text-gradient-gold">Changing Lives.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-slate-600 dark:text-slate-350 text-base sm:text-lg leading-relaxed max-w-xl font-sans"
              >
                Where academic excellence meets character development. Preparing global citizens for a brighter tomorrow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link href={`/${schoolSlug}/about/history`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-[#0F2942] hover:bg-[#1a3a5a] text-white font-bold py-6 px-8 rounded-xl shadow-lg transition-all duration-300">
                    Discover Our School <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${schoolSlug}/admissions/apply`} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full border border-school-gold/45 text-school-gold hover:bg-school-gold/5 font-bold py-6 px-8 rounded-xl transition-all duration-300">
                    Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-200/50 dark:border-slate-800"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0f2942]/10 dark:bg-blue-900/30 p-2.5 rounded-xl text-[#0f2942] dark:text-blue-400 shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Bilingual Education</h4>
                    <p className="text-xs text-slate-500">English & French Tracks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0f2942]/10 dark:bg-blue-900/30 p-2.5 rounded-xl text-[#0f2942] dark:text-blue-400 shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Cambridge Curriculum</h4>
                    <p className="text-xs text-slate-500">IGCSE, AS & A-Level</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex justify-center lg:justify-end relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-school-gold/10 rounded-full blur-3xl pointer-events-none" />
              
              <div 
                className="relative w-full max-w-md aspect-[4/5] rounded-[48px] overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl bg-slate-900 group"
                style={{ clipPath: isMobile ? "none" : "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
              >
                <img 
                  src="/images/leadership_international.jpg" 
                  alt="Errymaple Students" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* EST. Badge */}
              <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl rounded-full h-24 w-24 flex flex-col items-center justify-center text-center p-2 z-20 border-dashed border-school-gold/45">
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">EST.</span>
                <span className="text-lg font-serif font-black text-[#0f2942] dark:text-school-gold leading-none">2022</span>
                <span className="text-[8px] font-bold text-slate-500 dark:text-slate-450 mt-0.5">A Global Vision</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. STATS SECTION */}
        <section className="py-8 bg-white dark:bg-slate-950 transition-colors relative z-20 -mt-16 sm:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#091e36] text-white rounded-3xl p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            
            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/10 p-3 rounded-2xl text-school-gold shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif block">2022</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 block">EST. SINCE</span>
                <p className="text-[10px] text-slate-400">A global vision</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/10 p-3 rounded-2xl text-school-gold shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif block">97.8%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 block">CAMBRIDGE PASS</span>
                <p className="text-[10px] text-slate-400">IGCSE, AS & A-Level</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/10 p-3 rounded-2xl text-school-gold shrink-0">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif block">Bilingual</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 block">LANGUAGES</span>
                <p className="text-[10px] text-slate-400">English & French tracks</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-white/10 p-3 rounded-2xl text-school-gold shrink-0">
                <School className="h-6 w-6" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif block">94%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 block">UNI PLACEMENTS</span>
                <p className="text-[10px] text-slate-400">International entries</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CURRICULUM HIGHLIGHTS */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-school-gold block">
                  CURRICULUM HIGHLIGHTS
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f2942] dark:text-white font-serif tracking-tight leading-tight">
                  Excellence Without <span className="text-gradient-gold">Limits</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Our Cambridge curriculum challenges students to think critically, act ethically, and lead confidently in a global society.
                </p>
                <div className="pt-2">
                  <Link href={`/${schoolSlug}/academics/curriculum`}>
                    <Button className="bg-[#0F2942] hover:bg-[#1a3a5a] text-white font-bold py-6 px-8 rounded-xl shadow-md transition-all duration-300">
                      Explore Academics <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                {/* IGCSE Card */}
                <div className="md:col-span-7 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold font-serif text-[#0f2942] dark:text-white leading-tight">
                      Cambridge Secondary (IGCSE)
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                      General certificate syllabus for forms 3 and 4, ensuring broad academic preparation.
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-5 w-5 text-school-gold shrink-0" />
                      <span>Internationally Recognized Certificates</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-5 w-5 text-school-gold shrink-0" />
                      <span>Rigorous Practical Training</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-5 w-5 text-school-gold shrink-0" />
                      <span>Preparation for Advanced Levels</span>
                    </div>
                  </div>
                </div>

                {/* Lab Image */}
                <div className="md:col-span-5 rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-850 aspect-[4/5] md:aspect-auto relative group bg-slate-900">
                  <img 
                    src="/images/science_lab_international.jpg" 
                    alt="Chemistry Laboratory" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OPPORTUNITIES SECTION */}
        <section className="py-24 bg-[#091e36] text-white transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
                A World of Opportunities
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Beyond the classroom, we nurture talents, leadership, and real-world skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Sports */}
              <div className="bg-[#0f2942]/60 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img 
                      src="/images/sports_international.jpg" 
                      alt="Sports Academy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-school-blue dark:text-school-gold h-12 w-12 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Trophy className="h-5 w-5 text-[#0f2942] dark:text-school-gold" />
                    </div>
                  </div>
                  <div className="p-6 pt-10 space-y-3">
                    <h3 className="text-lg font-bold font-serif text-white">Sports Academy</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Excellence in every field
                    </p>
                  </div>
                </div>
              </div>

              {/* STEM */}
              <div className="bg-[#0f2942]/60 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img 
                      src="/images/stem_international.jpg" 
                      alt="STEM & Innovation" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-school-blue dark:text-school-gold h-12 w-12 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Cpu className="h-5 w-5 text-[#0f2942] dark:text-school-gold" />
                    </div>
                  </div>
                  <div className="p-6 pt-10 space-y-3">
                    <h3 className="text-lg font-bold font-serif text-white">STEM & Innovation</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Creativity meets technology
                    </p>
                  </div>
                </div>
              </div>

              {/* Leadership */}
              <div className="bg-[#0f2942]/60 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img 
                      src="/images/leadership_gallery.png" 
                      alt="Leadership" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-school-blue dark:text-school-gold h-12 w-12 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Users className="h-5 w-5 text-[#0f2942] dark:text-school-gold" />
                    </div>
                  </div>
                  <div className="p-6 pt-10 space-y-3">
                    <h3 className="text-lg font-bold font-serif text-white">Leadership</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Building tomorrow's leaders
                    </p>
                  </div>
                </div>
              </div>

              {/* Arts */}
              <div className="bg-[#0f2942]/60 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img 
                      src="/images/cultural_gallery.png" 
                      alt="Arts & Culture" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-school-blue dark:text-school-gold h-12 w-12 rounded-full flex items-center justify-center shadow-lg z-10">
                      <BookOpen className="h-5 w-5 text-[#0f2942] dark:text-school-gold" />
                    </div>
                  </div>
                  <div className="p-6 pt-10 space-y-3">
                    <h3 className="text-lg font-bold font-serif text-white">Arts & Culture</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Inspiring creativity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE ERRYMAPLE */}
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-[40px] font-extrabold font-serif text-[#0f2942] dark:text-white tracking-tight">
                Why Choose <span className="text-gradient-gold">Errymaple?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all duration-300">
                <div className="bg-[#0f2942]/10 dark:bg-[#0f2942]/20 p-4 rounded-full text-school-blue dark:text-school-gold shrink-0">
                  <Users className="h-6 w-6 text-[#0f2942] dark:text-school-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                    Qualified & Passionate Educators
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Dedicated to student success
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all duration-300">
                <div className="bg-[#0f2942]/10 dark:bg-[#0f2942]/20 p-4 rounded-full text-school-blue dark:text-school-gold shrink-0">
                  <ShieldCheck className="h-6 w-6 text-[#0f2942] dark:text-school-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                    Safe & Supportive Environment
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Nurturing growth and well-being
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all duration-300">
                <div className="bg-[#0f2942]/10 dark:bg-[#0f2942]/20 p-4 rounded-full text-school-blue dark:text-school-gold shrink-0">
                  <Globe className="h-6 w-6 text-[#0f2942] dark:text-school-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                    Global Perspective
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Preparing students for the world
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all duration-300">
                <div className="bg-[#0f2942]/10 dark:bg-[#0f2942]/20 p-4 rounded-full text-school-blue dark:text-school-gold shrink-0">
                  <School className="h-6 w-6 text-[#0f2942] dark:text-school-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                    Modern Facilities
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Innovative spaces for learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA BANNER */}
        <section className="py-12 bg-white dark:bg-slate-950 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#091e36] text-white rounded-[40px] shadow-2xl relative overflow-hidden min-h-[320px] grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-8 sm:p-16 flex flex-col justify-center space-y-6 relative z-10">
                <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
                  Join a Community of Dreamers,<br />
                  Believers & Achievers.
                </h2>
                <div className="pt-2">
                  <Link href={`/${schoolSlug}/admissions/apply`}>
                    <Button size="lg" className="bg-school-gold hover:bg-school-gold/90 text-[#091e36] font-bold py-6 px-8 rounded-xl shadow-lg transition-all duration-300">
                      Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative overflow-hidden min-h-[250px] lg:min-h-auto">
                <div 
                  className="w-full h-full"
                  style={{ clipPath: isMobile ? "none" : "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
                >
                  <img 
                    src="/images/school_hero_bg.png" 
                    alt="School Campus Building" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FOOTER INFO BAR */}
        <section className="py-6 bg-slate-900 text-white transition-colors border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs font-semibold tracking-wider text-slate-400">
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                <a href="https://international.errymaplegroup.ac.zw" className="flex items-center space-x-2.5 hover:text-school-gold transition-colors">
                  <Globe className="h-4 w-4 text-school-gold" />
                  <span>international.errymaplegroup.ac.zw</span>
                </a>
                <a href={`mailto:${schoolInfo.email}`} className="flex items-center space-x-2.5 hover:text-school-gold transition-colors">
                  <Mail className="h-4 w-4 text-school-gold" />
                  <span>{schoolInfo.email}</span>
                </a>
                <a href={`tel:${schoolInfo.phone.split("/")[0].trim()}`} className="flex items-center space-x-2.5 hover:text-school-gold transition-colors">
                  <Phone className="h-4 w-4 text-school-gold" />
                  <span>{schoolInfo.phone}</span>
                </a>
                <span className="flex items-center space-x-2.5">
                  <MapPin className="h-4 w-4 text-school-gold" />
                  <span>Zvishavane, Zimbabwe</span>
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">DREAMERS. BELIEVERS. ACHIEVERS.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

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
              <Award className="h-4 w-4 text-school-gold" />
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
