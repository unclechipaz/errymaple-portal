"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Testimonials() {
  const reviews = [
    {
      quote: "Choosing Errymaple High School was the best decision we made for our son. He excelled in his Cambridge sciences, but it was the discipline, focus on values, and leadership training that truly shaped him.",
      author: "Mr. T. Moyo",
      role: "Parent of High School Alumnus",
      stars: 5,
    },
    {
      quote: "The robotics and computing classes at Errymaple International School gave me an incredible head start. I entered university already knowing basic circuit logic and Python coding, which made my computer science studies a breeze.",
      author: "Ruvarashe Sibanda",
      role: "Class of 2024 (Now studying in the UK)",
      stars: 5,
    },
    {
      quote: "The ECD and primary programs at Errymaple Junior School are unmatched. My daughter comes home excited to read and program mini-robots. The teachers are exceptionally warm and dedicated.",
      author: "Dr. A. Zhou",
      role: "Parent of ECD & Grade 3 Students",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 bg-school-gold/15 dark:bg-school-gold/20 text-school-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <Quote className="h-3.5 w-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
            Hear From Our Community
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg">
            Read how Errymaple's commitment to academic rigor, AI coding, and character building has impacted our families.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex"
            >
              <Card className="flex flex-col bg-white dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/80 shadow-md hover:shadow-xl w-full transition-all duration-300 relative group overflow-hidden">
                {/* Quotation mark in card bg */}
                <Quote className="absolute top-6 right-6 h-12 w-12 text-slate-100 dark:text-slate-900/40 group-hover:text-school-blue/5 dark:group-hover:text-school-gold/5 transition-colors duration-300" />
                
                {/* Stars */}
                <CardHeader className="pt-6 pb-2">
                  <div className="flex space-x-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-school-gold text-school-gold" />
                    ))}
                  </div>
                </CardHeader>

                {/* Quote Text */}
                <CardContent className="flex-grow pt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic font-sans relative z-10">
                  "{review.quote}"
                </CardContent>

                {/* Author Info */}
                <CardFooter className="pt-4 pb-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-col items-start gap-0.5">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {review.author}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {review.role}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
