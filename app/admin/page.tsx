"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, FileText, Mail, ArrowLeft, Search, 
  Download, RefreshCw, CheckCircle2, ShieldAlert, 
  Info, ExternalLink, School, Lock, User, LogOut, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<"quick" | "registration" | "junior" | "international" | "contact">("quick");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    quickAdmissions: any[];
    highSchoolRegistrations: any[];
    contactInquiries: any[];
  }>({
    quickAdmissions: [],
    highSchoolRegistrations: [],
    contactInquiries: []
  });

  // Check auth state on mount
  useEffect(() => {
    const authState = sessionStorage.getItem("admin_auth");
    if (authState === "true") {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/get-submissions");
      if (!res.ok) throw new Error("Failed to fetch submissions");
      const json = await res.json();
      setData({
        quickAdmissions: json.quickAdmissions || [],
        highSchoolRegistrations: json.highSchoolRegistrations || [],
        contactInquiries: json.contactInquiries || []
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);

    // Verify credentials
    if (username.trim().toLowerCase() === "admin" && password === "Admin@Errymaple2026") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const getFilteredData = (): any[] => {
    const list = 
      activeTab === "quick" 
        ? data.quickAdmissions 
        : activeTab === "registration"
        ? data.highSchoolRegistrations.filter((item: any) => item.data.schoolSlug === "high-school" || !item.data.schoolSlug)
        : activeTab === "junior"
        ? data.highSchoolRegistrations.filter((item: any) => item.data.schoolSlug === "junior-school")
        : activeTab === "international"
        ? data.highSchoolRegistrations.filter((item: any) => item.data.schoolSlug === "international-school")
        : data.contactInquiries;

    if (!searchQuery.trim()) return list;

    return list.filter((item: any) => {
      const searchFields = [
        item.data.name,
        item.data.studentName,
        item.data.parentName,
        item.data.email,
        item.data.parentEmail,
        item.data.phone,
        item.data.parentPhone,
        item.data.school,
        item.data.subject
      ].filter(Boolean).map(field => field.toLowerCase());

      return searchFields.some(field => field.includes(searchQuery.toLowerCase()));
    });
  };

  const getExportData = () => {
    const filtered = getFilteredData();
    if (filtered.length === 0) return;

    // Extract headers from data keys
    const sample = filtered[0] as any;
    const dataKeys = Object.keys(sample.data);
    const headers = ["ID", "Timestamp", ...dataKeys];
    
    const csvContent = [
      headers.join(","),
      ...filtered.map((item: any) => {
        return [
          item.id,
          new Date(item.timestamp).toLocaleString(),
          ...dataKeys.map(key => {
            const val = item.data[key] || "";
            // Escape double quotes
            return `"${val.toString().replace(/"/g, '""')}"`;
          })
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `errymaple_${activeTab}_submissions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCount = data.quickAdmissions.length + data.highSchoolRegistrations.length + data.contactInquiries.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 sm:p-12 relative overflow-hidden flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <motion.div 
            key="login-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-md bg-white border border-slate-105 p-8 rounded-[36px] shadow-2xl relative z-10 space-y-6"
          >
            {/* Logo Badge */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-slate-50 p-3 rounded-full border border-slate-200 shadow-sm">
                <img src="/images/egs_logo.jpg" alt="Errymaple Seal" className="h-16 w-16 object-contain rounded-full" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-school-blue">Errymaple Group</h2>
              <h3 className="text-2xl font-bold font-serif text-slate-900">Administrator Access</h3>
              <p className="text-slate-500 text-xs max-w-xs">Enter credentials below to view admissions database.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <motion.div 
                  initial={{ x: 0 }}
                  animate={{ x: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                  className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs flex items-center gap-2"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>Invalid username or password credentials.</span>
                </motion.div>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="admin"
                    className="w-full bg-slate-50 border border-slate-200 px-10 py-3 rounded-xl text-sm outline-none focus:border-school-blue focus:ring-1 focus:ring-school-blue text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 px-10 py-3 rounded-xl text-sm outline-none focus:border-school-blue focus:ring-1 focus:ring-school-blue text-slate-900"
                  />
                </div>
              </div>

              <Button variant="gold" className="w-full py-6 font-bold mt-2 shadow-lg hover:shadow-school-gold/20">
                Authenticate Securely
              </Button>
            </form>

            {/* Helper credentials banner for testing */}
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-[11px] text-slate-550 space-y-1 text-center">
              <span className="font-bold text-slate-500 block uppercase tracking-wider">Demo Credentials</span>
              <p>Username: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-150 text-slate-700">admin</code></p>
              <p>Password: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-150 text-slate-700">Admin@Errymaple2026</code></p>
            </div>
          </motion.div>
        ) : (
          /* DASHBOARD PANEL */
          <motion.div 
            key="dashboard-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-7xl space-y-8 relative z-10 align-top self-start"
          >
            {/* Navigation & Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-school-blue hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Portal Home</span>
                </Link>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 flex items-center gap-3">
                  <School className="h-9 w-9 text-school-blue" />
                  Admissions & Inquiries Dashboard
                </h1>
                <p className="text-slate-500 text-sm">
                  Manage and export student applications from the Errymaple Group of Schools portal.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={fetchSubmissions} 
                  disabled={loading}
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </Button>
                <Button 
                  onClick={getExportData}
                  disabled={loading || getFilteredData().length === 0}
                  variant="gold"
                  className="font-bold flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-650 hover:bg-red-750 text-white font-bold flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>

            {/* Info Alert Box */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3.5 text-blue-800">
              <Info className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <p className="font-bold text-slate-900 mb-0.5">Database Source File</p>
                <p>
                  These records are pulled from the local file <code className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-800">submissions.json</code> in your project root. Every time a visitor submits a form on the website, it logs here in real-time. In a production environment, this dashboard would be password-protected and connected to an online SQL/NoSQL database or email SMTP servers.
                </p>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
              {[
                { label: "Total Applications", value: totalCount, desc: "Combined queries", icon: Users, color: "border-slate-200 text-slate-800" },
                { label: "Quick Admissions", value: data.quickAdmissions.length, desc: "From landing page modal", icon: Calendar, color: "border-slate-200 text-school-blue" },
                { label: "High School Regs", value: data.highSchoolRegistrations.filter((item: any) => item.data.schoolSlug === "high-school" || !item.data.schoolSlug).length, desc: "Form 1 - Form 6 applications", icon: FileText, color: "border-slate-200 text-school-blue" },
                { label: "Junior School Regs", value: data.highSchoolRegistrations.filter((item: any) => item.data.schoolSlug === "junior-school").length, desc: "ECD A - Grade 7 applications", icon: School, color: "border-slate-200 text-school-blue" },
                { label: "International Regs", value: data.highSchoolRegistrations.filter((item: any) => item.data.schoolSlug === "international-school").length, desc: "Cambridge admissions", icon: Globe, color: "border-slate-200 text-school-blue" },
                { label: "Contact Inquiries", value: data.contactInquiries.length, desc: "Messages & requests", icon: Mail, color: "border-slate-200 text-slate-500" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
                      <div className="bg-slate-50 p-2 rounded-xl text-school-blue border border-slate-100">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-extrabold text-slate-950">{stat.value}</p>
                      <p className="text-[11px] text-slate-500">{stat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Search & Tabs Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
              <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit gap-1">
                {[
                  { id: "quick", label: "Quick Admissions" },
                  { id: "registration", label: "HS Registrations" },
                  { id: "junior", label: "Junior Regs" },
                  { id: "international", label: "International Regs" },
                  { id: "contact", label: "Contact Inquiries" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSearchQuery("");
                    }}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white text-slate-900 shadow-md border border-slate-200/60"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 px-10 py-2.5 rounded-2xl text-sm outline-none focus:border-school-blue focus:ring-1 focus:ring-school-blue text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-md">
              {loading ? (
                <div className="py-24 text-center space-y-4">
                  <RefreshCw className="h-8 w-8 text-school-blue animate-spin mx-auto" />
                  <p className="text-slate-500 text-sm">Loading submissions...</p>
                </div>
              ) : error ? (
                <div className="py-24 text-center space-y-4 text-rose-600">
                  <ShieldAlert className="h-10 w-10 mx-auto" />
                  <p className="text-sm font-semibold">Error Loading Data: {error}</p>
                  <Button onClick={fetchSubmissions} variant="outline" className="border-rose-200 text-rose-600">
                    Try Again
                  </Button>
                </div>
              ) : getFilteredData().length === 0 ? (
                <div className="py-24 text-center space-y-4 text-slate-400">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-slate-300" />
                  <p className="text-sm">No applications found.</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    {searchQuery ? "Try refining your search keyword." : "Submissions will show here once filled out by a visitor."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-550">
                        <th className="py-4 px-6">Timestamp</th>
                        <th className="py-4 px-6">Primary Details</th>
                        <th className="py-4 px-6">Curriculum / Choice</th>
                        <th className="py-4 px-6">Submission Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {getFilteredData().map((item: any) => {
                        const date = new Date(item.timestamp).toLocaleString();
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-5 px-6 text-slate-500 whitespace-nowrap align-top">
                              {date}
                              <span className="block text-[10px] text-slate-400 font-mono mt-1">{item.id}</span>
                            </td>
                            
                            {/* Render based on form type */}
                            {activeTab === "quick" && (
                              <>
                                <td className="py-5 px-6 align-top">
                                  <p className="font-bold text-slate-950 text-base">{item.data.name}</p>
                                  <span className="block text-slate-600 mt-1">{item.data.email}</span>
                                  <span className="block text-slate-500 text-xs mt-0.5">{item.data.phone}</span>
                                </td>
                                <td className="py-5 px-6 align-top">
                                  <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-100">
                                    {item.data.school}
                                  </span>
                                  <p className="text-slate-650 text-xs mt-2 font-medium">Target Level: {item.data.grade}</p>
                                </td>
                                <td className="py-5 px-6 align-top max-w-sm text-slate-600 leading-relaxed text-xs">
                                  {item.data.message || <span className="text-slate-400 italic">No custom questions.</span>}
                                </td>
                              </>
                            )}

                            {(activeTab === "registration" || activeTab === "junior" || activeTab === "international") && (
                              <>
                                <td className="py-5 px-6 align-top">
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-school-blue uppercase tracking-wider">Student</p>
                                    <p className="font-bold text-slate-950 text-base leading-tight">{item.data.studentName}</p>
                                    <p className="text-slate-500 text-xs">DOB: {item.data.studentDob} | {item.data.studentGender}</p>
                                  </div>
                                  <div className="space-y-1 mt-4 pt-3 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Parent/Guardian</p>
                                    <p className="font-bold text-slate-800 leading-none">{item.data.parentName}</p>
                                    <p className="text-slate-600 text-xs">{item.data.parentEmail}</p>
                                    <p className="text-slate-500 text-xs">{item.data.parentPhone}</p>
                                  </div>
                                </td>
                                <td className="py-5 px-6 align-top space-y-3.5">
                                  <div>
                                    <span className="inline-block bg-slate-50 text-slate-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-slate-200">
                                      {item.data.targetForm}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Program Track:</span>
                                    <span className="text-slate-700 text-xs">{item.data.programTrack}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status:</span>
                                    <span className="text-slate-700 text-xs">{item.data.boardingStatus}</span>
                                  </div>
                                </td>
                                <td className="py-5 px-6 align-top text-xs space-y-3.5 text-slate-600 leading-relaxed max-w-sm">
                                  <div>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Previous School:</span>
                                    <span>{item.data.prevSchool || <span className="text-slate-400 italic">None logged</span>}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Residential Address:</span>
                                    <span>{item.data.parentAddress}</span>
                                  </div>
                                </td>
                              </>
                            )}

                            {activeTab === "contact" && (
                              <>
                                <td className="py-5 px-6 align-top">
                                  <p className="font-bold text-slate-950 text-base leading-tight">{item.data.name}</p>
                                  <span className="block text-slate-600 mt-1">{item.data.email}</span>
                                </td>
                                <td className="py-5 px-6 align-top">
                                  <p className="font-bold text-slate-800">{item.data.subject}</p>
                                </td>
                                <td className="py-5 px-6 align-top max-w-md text-slate-600 leading-relaxed text-xs">
                                  {item.data.message}
                                </td>
                              </>
                            )}

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
