"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Compass, Zap, Bot, Laptop, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIInnovation() {
  const steps = [
    {
      title: "Hands-on Robotics Labs",
      desc: "Students build, wire, and write software for physical microcontroller kits. They learn mechanics, basic circuit logic, and hardware integration.",
      icon: Bot,
    },
    {
      title: "Coding & Computational Logic",
      desc: "From Scratch blocks for primary kids to Python and JavaScript for secondary levels, students develop deep computational thinking habits.",
      icon: Terminal,
    },
    {
      title: "AI & Digital Literacy",
      desc: "Introducing children to artificial intelligence, data logic, search prompt engineering, and ethical software utilization principles.",
      icon: Cpu,
    },
    {
      title: "IoT & Agribusiness Integration",
      desc: "Linking coding to real agricultural sensors, smart greenhouse mechanisms, and solar monitoring projects reflecting Zimbabwe's growth sectors.",
      icon: Laptop,
    },
  ];

  return (
    <section id="innovation" className="bg-slate-900 text-slate-100 dark:bg-slate-950 py-24 transition-colors relative overflow-hidden">
      {/* Glow overlays for tech dark theme */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-school-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-school-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Tech Branding & Text */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-school-gold/20 text-school-gold border border-school-gold/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Zap className="h-3.5 w-3.5 animate-pulse" />
              <span>Future-Ready Schooling</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight text-white"
            >
              Leading in <span className="text-gradient-gold">AI & Robotics</span> Education
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base leading-relaxed"
            >
              At Errymaple Group of Schools, coding, automated machines, and computing logic are not extracurricular additions—they are built directly into our foundational curriculum. We prepare our learners to be creators of technology, not just consumers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4"
            >
              <a href="#contact">
                <Button variant="gold" size="lg" className="group">
                  Enroll in STEM Program
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Block: Tech Steps Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-school-gold/20 hover:bg-slate-900/80 transition-all duration-300 group"
                >
                  <div className="p-3 bg-school-blue/20 text-school-gold rounded-xl w-fit group-hover:bg-school-blue/40 group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-white text-base mt-4 font-serif">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
