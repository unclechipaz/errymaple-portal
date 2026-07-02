"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Check, ClipboardCheck, ArrowRight, User, Shield, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function ApplyNow({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  if (!schoolInfo) {
    notFound();
  }

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentDob: "",
    studentGender: "Male",
    targetForm: schoolSlug === "junior-school" ? "Grade 1" : "Form 1",
    prevSchool: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentAddress: "",
    programTrack: schoolSlug === "junior-school" ? "ZIMSEC Primary" : schoolSlug === "international-school" ? "Cambridge IGCSE" : "ZIMSEC Core",
    boardingStatus: schoolSlug === "junior-school" ? "Day Scholar" : "Boarder"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          formType: "school_admissions_apply",
          schoolSlug,
          schoolName: schoolInfo.name,
          ...formData,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            studentName: "",
            studentDob: "",
            studentGender: "Male",
            targetForm: schoolSlug === "junior-school" ? "Grade 1" : "Form 1",
            prevSchool: "",
            parentName: "",
            parentEmail: "",
            parentPhone: "",
            parentAddress: "",
            programTrack: schoolSlug === "junior-school" ? "ZIMSEC Primary" : schoolSlug === "international-school" ? "Cambridge IGCSE" : "ZIMSEC Core",
            boardingStatus: schoolSlug === "junior-school" ? "Day Scholar" : "Boarder"
          });
        }, 3000);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const formOptions = {
    grades: schoolSlug === "junior-school" 
      ? ["ECD A", "ECD B", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7"]
      : ["Form 1", "Form 2", "Form 3", "Form 4", "Lower Sixth", "Upper Sixth"],
    tracks: schoolSlug === "junior-school"
      ? ["ZIMSEC Primary", "Cambridge Supplemented"]
      : schoolSlug === "international-school"
      ? ["Cambridge IGCSE Track", "Cambridge AS/A-Level Track", "Bilingual French Track"]
      : ["ZIMSEC O-Level Track", "ZIMSEC A-Level Track", "HEXCO Computer Servicing", "Bilingual French Track"],
    boarding: schoolSlug === "junior-school"
      ? ["Day Scholar", "Afterschool Care"]
      : ["Boarder", "Day Scholar"]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="Application for Admissions" 
        subtitle="Apply Online"
        breadcrumbs={[
          { label: "Admissions" },
          { label: "Apply Online" }
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

          {submitted ? (
            <div className="py-20 text-center space-y-6">
              <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 p-5 rounded-full w-fit mx-auto shadow-inner">
                <Check className="h-12 w-12 animate-bounce" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                Application Submitted Successfully
              </h3>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                Thank you for applying to {schoolInfo.name}. Our registrar office will review the details and contact you via email and phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-10">
              
              {/* Header */}
              <div className="flex items-center space-x-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-school-gold rounded-xl shrink-0">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    Registration Form
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">
                    Please provide precise details. All fields are required.
                  </p>
                </div>
              </div>

              {/* Step 1: Student Information */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-school-gold flex items-center gap-1.5">
                  <User className="h-4.5 w-4.5" /> 1. Student Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Full Name</label>
                    <input required type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="As in Birth Certificate" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Date of Birth</label>
                    <input required type="date" name="studentDob" value={formData.studentDob} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Gender</label>
                    <select name="studentGender" value={formData.studentGender} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Target Level</label>
                    <select name="targetForm" value={formData.targetForm} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors">
                      {formOptions.grades.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Previous School</label>
                    <input required type="text" name="prevSchool" value={formData.prevSchool} onChange={handleInputChange} placeholder="Name of last school attended" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                </div>
              </div>

              {/* Step 2: Parent / Guardian Information */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-school-gold flex items-center gap-1.5">
                  <Shield className="h-4.5 w-4.5" /> 2. Parent / Guardian Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Parent Name</label>
                    <input required type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Full Name" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Parent Email</label>
                    <input required type="email" name="parentEmail" value={formData.parentEmail} onChange={handleInputChange} placeholder="example@mail.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Parent Phone</label>
                    <input required type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} placeholder="+263 7..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Residential Address</label>
                    <input required type="text" name="parentAddress" value={formData.parentAddress} onChange={handleInputChange} placeholder="House, Suburb, Town" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors" />
                  </div>
                </div>
              </div>

              {/* Step 3: Program & Residency */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-school-gold flex items-center gap-1.5">
                  <BookMarked className="h-4.5 w-4.5" /> 3. Curriculum & Enrollment preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Program Track</label>
                    <select name="programTrack" value={formData.programTrack} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors">
                      {formOptions.tracks.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Residency Option</label>
                    <select name="boardingStatus" value={formData.boardingStatus} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors">
                      {formOptions.boarding.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button type="submit" className={`w-full py-4 text-sm font-bold gap-2 ${schoolInfo.btnTheme}`}>
                  <span>Submit Form Application</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

            </form>
          )}
        </motion.div>
      </section>
    </main>
  );
}
