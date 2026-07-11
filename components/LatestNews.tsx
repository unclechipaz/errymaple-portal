"use client";

import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight, Trophy, Award, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LatestNews() {
  const news = [
    {
      title: "Errymaple Robotics Team Shines in STEM Competitions",
      desc: "Our student engineers showcased self-built microcontrollers and solar irrigation tracking prototypes, clinching top honors for design innovation in the Midlands Province.",
      date: "June 12, 2026",
      cat: "Robotics & STEM",
      icon: Trophy,
      color: "text-school-gold bg-school-gold/10",
    },
    {
      title: "Zimbabwe Chess Federation Success",
      desc: "Errymaple Chess Club players triumphed at the national youth trials, bringing home three individual gold medals and securing qualifications for regional tournaments.",
      date: "May 28, 2026",
      cat: "Sports & Allied Arts",
      icon: Award,
      color: "text-school-blue bg-school-blue/10",
    },
    {
      title: "Outstanding Cambridge A-Level Exam Success",
      desc: "Congratulations to our 2025/2026 class! Errymaple high school achieved a 96% pass rate overall, with several students obtaining straight A* profiles in science fields.",
      date: "May 15, 2026",
      cat: "Academic Excellence",
      icon: BookOpen,
      color: "text-blue-500 bg-blue-500/10",
    },
  ];

  return (
    <section id="latest-news" className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center space-x-1 bg-school-blue/10 dark:bg-school-blue/20 text-school-blue dark:text-school-blue-light px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Trophy className="h-3 w-3 text-school-gold" />
              <span>Campus News</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Latest Achievements
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Stay updated with the recent milestones, competitive awards, and academic successes from across our campuses.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button variant="outline" className="border-school-blue text-school-blue hover:bg-school-blue hover:text-white transition-all font-semibold">
              View All Press Releases
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex"
              >
                <Card className="flex flex-col bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg w-full transition-all duration-300 group">
                  <CardHeader className="pt-6 pb-2">
                    <div className="flex items-center justify-between mb-4">
                      {/* Category Badge */}
                      <span className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        <Tag className="h-3 w-3 mr-1 text-school-gold" />
                        {item.cat}
                      </span>
                      {/* Small Icon Badge */}
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white font-serif leading-snug group-hover:text-school-blue dark:group-hover:text-school-gold transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-sans">
                    {item.desc}
                  </CardContent>
                  <CardFooter className="pt-2 pb-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center font-medium">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {item.date}
                    </span>
                    <button className="text-school-blue dark:text-school-gold font-bold flex items-center hover:underline group/btn">
                      Read
                      <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
