"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Award, Compass, Globe, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SchoolsSection() {
  const cards = [
    {
      name: "Errymaple High School",
      desc: "Nurturing senior students with a robust combination of ZIMSEC and Cambridge examination pathways. High focus on STEM, science laboratory experimentation, boarding facilities, and leadership character building.",
      img: "/images/high_school_card.png",
      href: "/high-school",
      badge: "STEM & Boarding",
      badgeIcon: Award,
      color: "border-t-4 border-t-school-blue",
      glow: "hover:shadow-school-blue/10 hover:border-school-blue/30",
    },
    {
      name: "Errymaple Junior School",
      desc: "A warm and stimulating environment for primary and Early Childhood Development (ECD) learners. We introduce digital literacy and hands-on robotics early to fuel natural curiosity and build logical foundations.",
      img: "/images/junior_school_card.png",
      href: "/junior-school",
      badge: "Early Tech & ECD",
      badgeIcon: Compass,
      color: "border-t-4 border-t-school-gold",
      glow: "hover:shadow-school-gold/10 hover:border-school-gold/30",
    },
    {
      name: "Errymaple International School",
      desc: "Offering world-class Cambridge international curriculum standards. Educating foreign and local students for global readiness, critical thinking, linguistic versatility, and international university placement.",
      img: "/images/international_school_card.png",
      href: "/international-school",
      badge: "Cambridge International",
      badgeIcon: Globe,
      color: "border-t-4 border-t-slate-800",
      glow: "hover:shadow-slate-800/10 hover:border-slate-800/30",
    },
  ];

  return (
    <section id="schools" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-1 bg-school-blue/10 dark:bg-school-blue/20 text-school-blue dark:text-school-blue-light px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
          >
            <Sparkles className="h-3 w-3 text-school-gold" />
            <span>Select Your Pathway</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight"
          >
            Welcome to Our Campuses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            Errymaple Group of Schools provides three specialized educational environments tailored to foster leadership, digital skills, and academic rigor.
          </motion.p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const BadgeIcon = card.badgeIcon;
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="flex"
              >
                <Card 
                  className={`flex flex-col overflow-hidden shadow-lg border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-950 w-full hover:shadow-2xl ${card.color} ${card.glow} transition-all duration-300 group`}
                >
                  {/* Card Image Wrapper with zoom hover */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 bg-slate-900/85 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md">
                      <BadgeIcon className="h-3.5 w-3.5 text-school-gold" />
                      <span>{card.badge}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardHeader className="flex-grow pt-6 pb-4">
                    <CardTitle className="text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-school-blue dark:group-hover:text-school-gold transition-colors font-serif font-bold">
                      {card.name}
                    </CardTitle>
                    <CardContent className="px-0 pt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans">
                      {card.desc}
                    </CardContent>
                  </CardHeader>

                  {/* Card Footer */}
                  <CardFooter className="pt-2 pb-6">
                    <Link
                      href={card.href}
                      className="w-full"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full justify-between hover:bg-school-blue hover:text-white dark:hover:bg-school-gold dark:hover:text-slate-950 border-slate-200 dark:border-slate-800 group-hover:border-transparent transition-all duration-300 font-semibold"
                      >
                        Explore Campus
                        <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Button>
                    </Link>
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
