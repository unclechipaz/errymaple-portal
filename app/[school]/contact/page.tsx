"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Mail, Phone, MapPin, Send, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function ContactSchool({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "school_contact_inquiry",
          schoolSlug,
          schoolName: schoolInfo.name,
          ...formData,
        }),
      });
      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
          });
        }, 3000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Contact Our School Office" 
        subtitle="Contact Us"
        breadcrumbs={[
          { label: "Contact Details" }
        ]}
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md text-center space-y-4"
          >
            <div className="bg-blue-500/10 text-blue-600 dark:text-school-gold p-3 rounded-2xl w-fit mx-auto">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-950 dark:text-white">Call Administration</h3>
            <p className="text-slate-505 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{schoolInfo.phone}</p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md text-center space-y-4"
          >
            <div className="bg-blue-500/10 text-blue-600 dark:text-school-gold p-3 rounded-2xl w-fit mx-auto">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-950 dark:text-white">Email Admissions</h3>
            <a href={`mailto:${schoolInfo.email}`} className="text-blue-600 dark:text-school-gold text-xs sm:text-sm font-semibold break-all hover:underline block">
              {schoolInfo.email}
            </a>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-md text-center space-y-4"
          >
            <div className="bg-blue-500/10 text-blue-600 dark:text-school-gold p-3 rounded-2xl w-fit mx-auto">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-950 dark:text-white">Campus Location</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{schoolInfo.address}</p>
          </motion.div>
        </div>

        {/* Contact Form & Google Map Mock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-8 rounded-3xl shadow-xl flex flex-col justify-between"
          >
            {formSubmitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 p-4 rounded-full w-fit mx-auto shadow-inner">
                  <Check className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">Inquiry Sent Successfully</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-xs mx-auto">
                  Thank you. Our school administration team will read your message and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <MessageSquare className="h-5 w-5 text-school-gold" />
                  <h3 className="text-lg font-bold font-serif text-slate-950 dark:text-white">Direct Message</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Your Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="mail@example.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Reason for contacting us" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Message Content</label>
                  <textarea required rows={4} name="message" value={formData.message} onChange={handleInputChange} placeholder="Type your message here..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold" />
                </div>

                <Button type="submit" className={`w-full py-4 text-xs font-bold uppercase tracking-wider gap-2 ${schoolInfo.btnTheme}`}>
                  <Send className="h-4 w-4" />
                  <span>Send inquiry message</span>
                </Button>
              </form>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e3a8a20,transparent_70%)] pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Interactive Location</span>
              <h3 className="text-xl font-bold font-serif text-school-gold">{schoolInfo.shortName} Campus Map</h3>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                Our campuses are situated in secure residential suburbs of Zvishavane, Midlands Province, Zimbabwe. Fully guarded with access gates.
              </p>
            </div>
            
            {/* Visual map card placeholder */}
            <div className="relative h-44 w-full bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden my-6">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
              <div className="absolute h-6 w-6 rounded-full bg-blue-600/30 animate-ping flex items-center justify-center">
                <div className="h-3.5 w-3.5 rounded-full bg-blue-600 border-2 border-white" />
              </div>
              <div className="relative text-[10px] text-slate-400 font-bold uppercase tracking-wider">Map Coordinates Active</div>
            </div>

            <p className="text-[10px] text-slate-500 italic relative z-10">* For physical school visits, please schedule an appointment in advance via phone lines.</p>
          </motion.div>
        </div>

      </section>
    </main>
  );
}
