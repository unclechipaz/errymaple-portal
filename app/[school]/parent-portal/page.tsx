"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { UserCheck, ShieldAlert, Sparkles, LogIn, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function ParentPortal({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parentEmail && studentId) {
      setLoggedIn(true);
    } else {
      alert("Please fill all portal credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Parent Portal & Student Reports" 
        subtitle="Parent Portal"
        breadcrumbs={[
          { label: "Parent Portal" }
        ]}
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

          {loggedIn ? (
            <div className="space-y-8">
              <div className="flex items-center space-x-3.5 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl shrink-0">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    Welcome back, Parent!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    Showing credentials for Student ID: <strong className="text-slate-700 dark:text-slate-350">{studentId}</strong>
                  </p>
                </div>
              </div>

              {/* Portal Info tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Academic reports */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
                  <h4 className="font-bold text-slate-950 dark:text-white text-base">Academic Report Cards</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Download verified term progress reports, examination transcripts, and teacher feedback cards.</p>
                  <Button size="sm" className={`font-bold ${schoolInfo.btnTheme}`} onClick={() => alert("Report download starting...")}>
                    Download Progress Report
                  </Button>
                </div>

                {/* Account Invoices */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
                  <h4 className="font-bold text-slate-950 dark:text-white text-base">Financial Statement</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">View school tuition fee balances, boarding payments, and uniform packages billing.</p>
                  <Button size="sm" variant="outline" className="font-bold border-slate-300 dark:border-white/10" onClick={() => alert("Redirecting to payment gateway...")}>
                    Pay Outstanding Fees
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <button onClick={() => setLoggedIn(false)} className="text-xs text-red-500 hover:underline font-bold">Logout from parent portal</button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-8 max-w-md mx-auto">
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="bg-blue-500/10 text-blue-600 dark:text-school-gold p-4 rounded-full w-fit mx-auto">
                  <LogIn className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Portal Sign In</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">
                  Access student grades, attendance notices, and fee statements.
                </p>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Registered Parent Email</label>
                  <input 
                    required 
                    type="email" 
                    value={parentEmail} 
                    onChange={(e) => setParentEmail(e.target.value)} 
                    placeholder="mail@parent.com" 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Student Admission ID</label>
                  <input 
                    required 
                    type="text" 
                    value={studentId} 
                    onChange={(e) => setStudentId(e.target.value)} 
                    placeholder="EGS/HS/2026/..." 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold" 
                  />
                </div>
              </div>

              {/* Alert note */}
              <div className="flex items-start space-x-2.5 p-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/10 rounded-2xl text-xs leading-normal">
                <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <p>Note: Credentials are provided by the school administration office upon successful student registration enrollment.</p>
              </div>

              {/* Submit */}
              <Button type="submit" className={`w-full py-4 text-xs font-bold uppercase tracking-wider ${schoolInfo.btnTheme}`}>
                <span>Access Parent Portal</span>
              </Button>

            </form>
          )}

        </motion.div>
      </section>
    </main>
  );
}
