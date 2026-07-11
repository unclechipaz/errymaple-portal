"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight, GraduationCap, Trophy, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const stats = [
    { label: "Exam Pass Rate", value: "98.7%", icon: GraduationCap },
    { label: "Robotics Awards", value: "15+", icon: Trophy },
    { label: "Campuses", value: "3", icon: GraduationCap },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out scale-105"
        style={{ backgroundImage: "url('/images/school_hero_bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/70" />
        {/* Animated background grid for tech aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col justify-between min-h-screen">
        <div className="flex-grow flex flex-col justify-center max-w-3xl">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-school-gold/20 text-school-gold border border-school-gold/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit"
          >
            <Award className="h-3.5 w-3.5" />
            <span>Welcome to Errymaple Group of Schools</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-serif leading-tight"
          >
            Shaping <span className="text-gradient-gold">Future Leaders</span> <br />
            Through Excellence & Character.
          </motion.h1>

          {/* Motto / Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl"
          >
            "Shaping Future Leaders Through Excellence, Innovation and Character." Providing standard educational pathways designed for global achievements, STEM robotics, and value-based leadership.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <LinkButton href="#schools" variant="gold" size="lg">
              Explore Campuses
              <ChevronRight className="ml-2 h-5 w-5" />
            </LinkButton>
            <LinkButton href="#contact" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Apply for Admission
            </LinkButton>
          </motion.div>
        </div>

        {/* Bottom Banner with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl mt-12 sm:mt-0"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className={`flex items-center space-x-4 ${
                  i !== stats.length - 1 ? "sm:border-r border-white/10" : ""
                } pr-4`}
              >
                <div className="bg-school-blue p-3 rounded-xl text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <a 
          href="#schools" 
          className="text-white/40 hover:text-white transition-colors duration-200 flex flex-col items-center gap-1 text-xs uppercase tracking-widest font-semibold"
        >
          Scroll Down
          <ArrowDown className="h-4 w-4 animate-bounce mt-1" />
        </a>
      </div>
    </div>
  );
}

// Inline LinkButton helper to avoid React hydration issues with simple anchor scrolling
function LinkButton({ 
  href, 
  variant, 
  size, 
  className, 
  children 
}: { 
  href: string; 
  variant: any; 
  size: any; 
  className?: string; 
  children: React.ReactNode; 
}) {
  return (
    <a href={href} className="w-full sm:w-auto">
      <Button variant={variant} size={size} className={`w-full sm:w-auto ${className || ""}`}>
        {children}
      </Button>
    </a>
  );
}
