"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function ContactAdmissions() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "form-one",
    school: "high-school",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormState({
      name: "",
      email: "",
      phone: "",
      grade: "form-one",
      school: "high-school",
      message: "",
    });
    setIsSubmitted(false);
  };

  const faqs = [
    {
      q: "How do I apply for boarding services?",
      a: "Errymaple provides secure and comfortable boarding facilities for both boys and girls at our Zvishavane Makwasha campus. Select 'High School' in the inquiry form or contact our admissions officer directly to receive the boarding package details, which include boarding requirements and fees.",
    },
    {
      q: "What examination systems are available at the High School?",
      a: "We offer a dual-track pathway. Students can choose to sit for the ZIMSEC (Zimbabwe School Examinations Council) syllabus, the Cambridge Assessment International Education pathway, or an integrated option combining both for a broader university placement advantage.",
    },
    {
      q: "Are scholarships offered for talent or academic merit?",
      a: "Yes! Errymaple is committed to nurturing excellence. We offer partial merit scholarships based on exceptional Grade 7 results (for Form 1 entry), top performance in Cambridge/ZIMSEC mock examinations, or demonstrated talent in robotics and national chess tournaments.",
    },
    {
      q: "Does the school provide transport for day scholars?",
      a: "Yes, we operate safe and reliable daily school bus services for day scholars residing in and around the Zvishavane area. Routes and timings are coordinated by our administrative office.",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 bg-school-blue/10 dark:bg-school-blue/20 text-school-blue dark:text-school-blue-light px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <Mail className="h-3.5 w-3.5 text-school-gold" />
            <span>Enrollment & Help</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
            Admissions & Inquiries
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg">
            Ready to secure a spot for your child? Submit a quick inquiry below or reach out to our administration office.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Inquiry Form */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="bg-emerald-500/10 text-emerald-500 p-4 rounded-full w-fit mx-auto shadow-inner">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-serif">
                  Inquiry Submitted!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for applying. An admissions officer from our team will contact you shortly via email or phone.
                </p>
                <Button onClick={handleReset} variant="outline" className="mt-4">
                  Send Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif border-b pb-3 border-slate-200 dark:border-slate-800">
                  Quick Inquiry Form
                </h3>
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Parent/Guardian Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-school-blue/50 text-sm"
                  />
                </div>

                {/* Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-school-blue/50 text-sm"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. +263 77..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-school-blue/50 text-sm"
                    />
                  </div>
                </div>

                {/* Dropdowns grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* School selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                      Campus of Interest
                    </label>
                    <select
                      value={formState.school}
                      onChange={(e) => setFormState({ ...formState, school: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-school-blue/50 text-sm"
                    >
                      <option value="high-school">Errymaple High School</option>
                      <option value="junior-school">Errymaple Junior School</option>
                      <option value="international-school">Errymaple International School</option>
                    </select>
                  </div>
                  {/* Level selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                      Grade / Level
                    </label>
                    <select
                      value={formState.grade}
                      onChange={(e) => setFormState({ ...formState, grade: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-school-blue/50 text-sm"
                    >
                      <option value="ecd">Early Childhood (ECD)</option>
                      <option value="primary">Primary School (Grades 1-7)</option>
                      <option value="form-one">Form 1 - Form 4 (High School)</option>
                      <option value="lower-six">Advanced Level (Lower & Upper Six)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Your Message / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your request (e.g. asking for boarding requirements, scheduling a visit)"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-school-blue/50 text-sm"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full group">
                  Submit Admission Inquiry
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Button>
              </form>
            )}
          </div>

          {/* Right Block: FAQs */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white font-serif flex items-center space-x-2 border-b pb-3 border-slate-200 dark:border-slate-800">
              <HelpCircle className="h-5 w-5 text-school-gold" />
              <span>Frequently Asked Questions</span>
            </h3>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-slate-200 dark:border-slate-800">
                  <AccordionTrigger className="font-serif font-bold text-sm sm:text-base hover:text-school-blue dark:hover:text-school-gold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>

      </div>
    </section>
  );
}
