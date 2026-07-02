"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, GraduationCap, Award, Compass, Globe, Sparkles, Cpu, ShieldCheck, 
  School, CheckCircle2, Calendar, FileText, MapPin, Phone, Mail, ArrowRight, 
  UserCheck, Users, Trophy, BookOpen, Clock, Activity, Check, X, ShieldAlert, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeModal, setActiveModal] = useState<"apply" | "prospectus" | "visit" | null>(null);
  const [activeNews, setActiveNews] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getSubdomainLink = (href: string) => {
    const schoolSlug = href.replace("/", "");
    if (schoolSlug === "high-school" || schoolSlug === "junior-school" || schoolSlug === "international-school") {
      const prefix = schoolSlug.split("-")[0];
      if (isMounted && typeof window !== "undefined") {
        const hostname = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : "";
        if (hostname.includes("localhost") || hostname.startsWith("127.0.0.1")) {
          return `${window.location.protocol}//${prefix}.localhost${port}`;
        }
      }
      return `https://${prefix}.errymaplegroup.ac.zw`;
    }
    return href;
  };
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "High School",
    grade: "",
    message: ""
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
          formType: "quick_admissions",
          ...formData,
        }),
      });
      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setActiveModal(null);
          setFormSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            school: "High School",
            grade: "",
            message: ""
          });
        }, 3000);
      } else {
        alert("Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const stats = [
    { label: "Schools", value: "3", icon: School, desc: "High, Junior & International" },
    { label: "Heritage", value: "Since 2011", icon: Calendar, desc: "A decade of educational excellence" },
    { label: "Qualifications", value: "Dual Paths", icon: Award, desc: "Cambridge, ZIMSEC, HEXCO & City & Guilds" },
    { label: "STEM & AI", value: "Robotics", icon: Cpu, desc: "State-of-the-art innovation programs" },
    { label: "Enrollment Options", value: "Boarding & Day", icon: ShieldCheck, desc: "Flexible high-end boarding & day study" },
    { label: "Leadership", value: "Character", icon: UserCheck, desc: "Structured leadership development" },
  ];

  const schools = [
    {
      name: "Errymaple High School",
      desc: "A leading secondary school offering ZIMSEC, HEXCO and Français examinations while nurturing academic excellence, leadership and innovation.",
      btnText: "Visit High School",
      href: "/high-school",
      themeClass: "border-blue-500/20 hover:border-blue-500/40 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100",
      accentBg: "bg-blue-600 hover:bg-blue-700",
      accentText: "text-blue-600",
      accentBorder: "border-blue-500/30",
      accentDot: "bg-blue-600",
      btnTheme: "bg-blue-600 text-white hover:bg-blue-700",
      features: ["Boarding & Day School", "STEM Education", "Leadership Development", "Sports Excellence"],
      logo: "/images/ehs_crest.jpg",
      icon: Award,
    },
    {
      name: "Errymaple Junior School",
      desc: "Providing quality education from ECD A to Grade 7 through Cambridge and ZIMSEC curricula while building strong academic foundations and character.",
      btnText: "Visit Junior School",
      href: "/junior-school",
      themeClass: "border-emerald-500/20 hover:border-emerald-500/40 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100",
      accentBg: "bg-emerald-600 hover:bg-emerald-700",
      accentText: "text-emerald-600",
      accentBorder: "border-emerald-500/30",
      accentDot: "bg-emerald-600",
      btnTheme: "bg-emerald-600 text-white hover:bg-emerald-700",
      features: ["ECD A to Grade 7", "Cambridge Curriculum", "ZIMSEC Curriculum", "Child-Centred Learning"],
      logo: "/images/ejs_crest.png",
      icon: Compass,
    },
    {
      name: "Errymaple International School",
      desc: "A future-focused international school offering Cambridge, City & Guilds and Français qualifications while preparing students for global success.",
      btnText: "Visit International School",
      href: "/international-school",
      themeClass: "border-purple-500/20 hover:border-purple-500/40 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100",
      accentBg: "bg-purple-600 hover:bg-purple-700",
      accentText: "text-purple-600",
      accentBorder: "border-purple-500/30",
      accentDot: "bg-purple-600",
      btnTheme: "bg-purple-600 text-white hover:bg-purple-700",
      features: ["Cambridge Curriculum", "City & Guilds", "International Perspective", "Technology Integration"],
      logo: "/images/eis_crest.png",
      icon: Globe,
    },
  ];

  const reasons = [
    {
      title: "Academic Excellence",
      desc: "Dual-track educational pathways combining prestigious international certifications with local exam boards for maximum choice and high pass rates.",
      icon: Award,
      color: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/5 dark:to-transparent",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Innovation & Technology",
      desc: "Modern robotics laboratories, integrated artificial intelligence studies, and coding tracks starting from primary school to prepare students for tomorrow's careers.",
      icon: Cpu,
      color: "from-amber-500/10 to-amber-600/5 dark:from-amber-500/5 dark:to-transparent",
      iconColor: "text-amber-600 dark:text-school-gold",
    },
    {
      title: "Character Development",
      desc: "Structured leadership councils, character-building programs, discipline, and core moral training that ensure academic brilliance goes hand-in-hand with integrity.",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/5 dark:to-transparent",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Holistic Education",
      desc: "Comprehensive co-curricular activities, including professional sports training, physical swimming lanes, premium golf green experience, arts, and drama clubs.",
      icon: GraduationCap,
      color: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/5 dark:to-transparent",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];


  const news = [
    {
      title: "Cambridge Academic Honors",
      desc: "Errymaple students achieve top-in-country awards for Cambridge examinations, demonstrating outstanding academic capacity.",
      date: "June 15, 2026",
      img: "/images/news_cambridge.png",
      badge: "Academic",
      author: "School Administration",
      content: [
        "Errymaple Group of Schools is proud to announce outstanding academic achievements in the Cambridge International Examinations.",
        "Several students achieved Top in Country honors, reflecting the commitment of our educators and the exceptional diligence of our learners. This academic success reinforces our reputation as a leading provider of high-quality international education."
      ]
    },
    {
      title: "National Robotics Champions",
      desc: "Our high school STEM robotics squad takes first place in the national engineering olympiad, qualifying for global finals.",
      date: "May 28, 2026",
      img: "/images/news_robotics.png",
      badge: "Innovation",
      author: "ICT Department",
      content: [
        "Our high school STEM robotics squad took first place in the national engineering olympiad, qualifying for the global finals.",
        "The team designed, assembled, and programmed a smart search-and-rescue vehicle using microcontrollers and custom coding scripts. This milestone highlights our emphasis on technology, innovation, and practical problem-solving in preparation for future careers."
      ]
    },
    {
      title: "David Ruswa Tournament 2026",
      desc: "Ten schools compete in our annual tournament celebrating sporting excellence, teamwork, and discipline, with Errymaple scoring multiple key championship titles.",
      date: "June 26, 2026",
      img: "/images/news_ruswa.jpg",
      badge: "Sports",
      author: "Charlton Chipandambira",
      content: [
        "The David Ruswa Tournament 2026, hosted by Errymaple Group of Schools on 26 June 2026, was successfully held at Errymaple International School, bringing together ten schools in a celebration of sporting excellence, teamwork, discipline, and friendship. The annual tournament, held in honour of the visionary founder Mr. David Ruswa, showcased exceptional talent across a variety of sporting disciplines while strengthening relationships among participating schools.",
        "From the opening whistle to the final matches, athletes displayed remarkable determination, sportsmanship, and competitive spirit. Spectators were treated to exciting contests in basketball, netball, volleyball, soccer, and tennis, making the event one of the most memorable editions of the tournament.",
        "After an action-packed day of competition, the champions in each category emerged as follows:",
        "• Basketball Boys: Errymaple Group of Schools\n• Basketball Girls: Oakleigh House College\n• Soccer: Zvishavane High School\n• Netball Girls: Mandava High School\n• Volleyball Boys: Eddrovale College\n• Volleyball Girls: Mandava High School\n• Tennis Under-15 Boys: Errymaple Group of Schools\n• Tennis Under-15 Girls: Camelot College\n• Tennis Under-17 Boys: Oakley House College\n• Tennis Under-17 Girls: Junior High School",
        "The tournament highlighted the high standard of school sport within the region and provided young athletes with an excellent platform to develop their talents, build confidence, and foster lifelong friendships. Congratulations to all the winning teams and to every participant whose dedication and passion made the tournament a tremendous success.",
        "Errymaple Group of Schools extends its sincere appreciation to the participating schools, coaches, officials, parents, supporters, sponsors, and the organising committee whose collective efforts ensured the smooth running of the event. Your commitment and cooperation contributed immensely to the success of the tournament.",
        "As the curtain falls on another outstanding edition of the David Ruswa Tournament, the legacy of promoting excellence, unity, and holistic education through sport continues to grow. Errymaple Group of Schools looks forward to welcoming even more schools for an even bigger and better tournament next year."
      ]
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Background Image with Navy Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/images/school_hero_bg.png')" }}
        >
          {/* Lighter, more premium navy blue gradient overlay to let the background image shine through */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-900/25 to-slate-950/55" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center space-y-10">
          
          {/* Prominent logo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="bg-slate-950/40 p-4 rounded-full border border-school-gold/30 backdrop-blur-md shadow-2xl relative">
              <div className="absolute inset-0 bg-school-gold/5 rounded-full blur-xl animate-pulse" />
              <img 
                src="/images/egs_logo.jpg" 
                alt="Errymaple Group Seal" 
                className="h-28 w-28 object-contain rounded-full border-2 border-school-gold" 
              />
            </div>
          </motion.div>

          {/* Subheading Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-school-gold/20 text-school-gold border border-school-gold/30 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <span>Dreamers | Believers | Achievers</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-7xl font-extrabold text-white font-serif tracking-tight leading-tight"
          >
            Three Schools. <span className="text-gradient-gold">One Vision.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-200 text-base sm:text-xl max-w-4xl mx-auto leading-relaxed font-sans"
          >
            Welcome to Errymaple Group of Schools, a family of institutions committed to developing future leaders through academic excellence, innovation, leadership, and holistic education.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a href="#schools" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full font-bold shadow-lg hover:shadow-school-gold/30">
                Explore Our Schools
              </Button>
            </a>
            <a href="#admissions" className="w-full sm:w-auto">
              <Button variant="outlineGold" size="lg" className="w-full font-bold text-white hover:text-slate-900 border-white/40 hover:border-school-gold">
                Apply Now
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* INSTITUTIONAL HERITAGE SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden border-b border-slate-100 dark:border-slate-900">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 text-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-school-blue dark:text-school-gold">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Institutional Heritage
            </h2>
          </div>
          <div className="text-slate-600 dark:text-slate-350 text-base sm:text-lg leading-relaxed font-sans space-y-6 text-justify sm:text-center max-w-4xl mx-auto">
            <p>
              Errymaple Group of Schools is a growing educational institution dedicated to providing quality, holistic, and skills-oriented education in Zimbabwe. The group began with the establishment of Errymaple High School in 2011, which laid the foundation for a vision of academic excellence, discipline, and character development. As the institution expanded to meet the educational needs of the community, Errymaple Junior School was established in 2016 to provide a strong foundation for young learners through quality primary education and child-centred learning.
            </p>
            <p>
              Building on its success, the group further expanded with the establishment of Errymaple International School in 2022, offering learners access to internationally aligned educational opportunities and modern learning experiences. Today, Errymaple Group of Schools continues to grow as a centre of excellence, combining strong academic programmes with practical skills training, innovation, technology, and co-curricular activities to prepare learners for success in a rapidly changing world.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK FACTS */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-school-gold">
              Key Insights
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Quick Facts
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Why our group represents one of the region's leading hubs of education and academic character.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-school-blue/10 dark:bg-school-blue/20 p-3.5 rounded-2xl text-school-blue dark:text-school-gold group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white font-serif">
                        {stat.value}
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                    {stat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: CHOOSE YOUR SCHOOL */}
      <section id="schools" className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-school-blue dark:text-school-gold">
              Academic Wings
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Choose Your School
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore the customized curricula, grade requirements, and visual identities of our three premium school divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {schools.map((school, index) => {
              const Icon = school.icon;
              return (
                <motion.div
                  key={school.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="flex"
                >
                  <div 
                    className={`flex flex-col justify-between p-8 rounded-3xl border w-full transition-all duration-300 shadow-xl ${school.themeClass} hover:-translate-y-2 group relative overflow-hidden`}
                  >
                    {/* Visual Highlight Dot */}
                    <span className={`absolute top-6 right-6 h-3 w-3 rounded-full ${school.accentDot} animate-pulse`} />

                    <div>
                      {/* Logo container */}
                      <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-full shadow-md flex items-center justify-center h-28 w-28 group-hover:scale-105 transition-transform duration-300 mx-auto border border-slate-100 dark:border-slate-700">
                        <img src={school.logo} alt={`${school.name} Crest`} className="h-full w-full object-contain rounded-full" />
                      </div>

                      {/* Header */}
                      <h3 className="text-2xl font-bold font-serif text-center mt-6 text-slate-900 dark:text-white leading-tight">
                        {school.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-slate-500 dark:text-slate-405 text-sm text-center mt-4 leading-relaxed font-sans min-h-[72px]">
                        {school.desc}
                      </p>

                      {/* Divider */}
                      <div className={`my-6 border-t ${school.accentBorder}`} />

                      {/* Features */}
                      <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Key Features:
                        </span>
                        {school.features.map((feat) => (
                          <div key={feat} className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-300 text-sm">
                            <CheckCircle2 className={`h-4.5 w-4.5 ${school.accentText} shrink-0`} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                      {school.href.startsWith("/") ? (
                        <a
                          href={getSubdomainLink(school.href)}
                          className="block w-full"
                        >
                          <Button 
                            className={`w-full justify-between font-bold py-6 rounded-2xl transition-all duration-300 ${school.btnTheme}`}
                          >
                            <span>{school.btnText}</span>
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </a>
                      ) : (
                        <a
                          href={school.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          <Button 
                            className={`w-full justify-between font-bold py-6 rounded-2xl transition-all duration-300 ${school.btnTheme}`}
                          >
                            <span>{school.btnText}</span>
                            <ArrowUpRight className="h-5 w-5" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: WHY FAMILIES CHOOSE ERRYMAPLE */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-school-blue dark:text-school-gold">
              Our Value Proposition
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Why Families Choose Errymaple
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              We focus on building well-rounded individuals equipped to succeed in a demanding global workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${item.color} bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
                >
                  <div className="space-y-4">
                    <div className={`${item.iconColor} bg-white dark:bg-slate-900 p-3.5 rounded-2xl w-fit shadow-md border border-slate-100/50 dark:border-slate-800`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* SECTION 6: NEWS & ACHIEVEMENTS */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-school-blue dark:text-school-gold">
              Announcements & Victories
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              News & Achievements
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Stay up to date with accomplishments and highlights across our campuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onClick={() => setActiveNews(item)}
                className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-school-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center text-slate-450 text-xs gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-school-gold" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white leading-tight group-hover:text-school-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span className="inline-flex items-center text-xs font-bold text-school-blue dark:text-school-gold hover:underline gap-1">
                    <span>Read More</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: ADMISSIONS */}
      <section id="admissions" className="py-32 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-school-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-950 text-white rounded-[40px] border border-school-gold/30 p-8 sm:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-school-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-school-gold text-xs font-bold uppercase tracking-widest block">
                Enrollment Gateway
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
                Applications Now Open
              </h2>
              <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Take the first step toward joining the Errymaple educational family. Select an action below to apply, explore, or visit our campuses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 relative z-10"
            >
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full sm:w-auto font-bold shadow-lg hover:shadow-school-gold/20"
                onClick={() => setActiveModal("apply")}
              >
                Apply Online
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto font-bold text-white border-white/20 hover:border-white hover:bg-white/10"
                onClick={() => setActiveModal("prospectus")}
              >
                Request Prospectus
              </Button>
              <Button 
                variant="outlineGold" 
                size="lg" 
                className="w-full sm:w-auto font-bold text-school-gold border-school-gold/30 hover:bg-school-gold/10"
                onClick={() => setActiveModal("visit")}
              >
                Book a School Visit
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POPUP MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
              onClick={() => setActiveModal(null)}
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative z-10 p-6 sm:p-8 text-slate-800 dark:text-slate-100"
            >
              <button 
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setActiveModal(null)}
              >
                <X className="h-5 w-5" />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950 p-4 rounded-full w-fit mx-auto text-emerald-600 dark:text-emerald-400">
                    <Check className="h-10 w-10 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    Request Received
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                    Thank you! Our admissions coordinator will contact you at your provided details shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-school-gold">
                      {activeModal === "apply" ? "Admissions Form" : activeModal === "prospectus" ? "Prospectus Request" : "Visit Booking"}
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">
                      {activeModal === "apply" ? "Submit Application" : activeModal === "prospectus" ? "Download Prospectus" : "Schedule Campus Tour"}
                    </h3>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-school-gold transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Email
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="johndoe@example.com"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-school-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+263 77 000 0000"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-school-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Preferred Campus
                        </label>
                        <select 
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-school-gold transition-colors"
                        >
                          <option value="High School">Errymaple High School</option>
                          <option value="Junior School">Errymaple Junior School</option>
                          <option value="International School">Errymaple International School</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Target Grade / Year
                        </label>
                        <input 
                          type="text" 
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          required
                          placeholder="Grade 1 / Form 1"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-school-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Questions / Message
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any specific inquiry..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-school-gold transition-colors resize-none"
                      />
                    </div>

                    <Button variant="gold" className="w-full py-6 font-bold text-base shadow-lg mt-2">
                      Submit Request
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Article Modal */}
      <AnimatePresence>
        {activeNews && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col relative z-50"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveNews(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-450" />
              </button>

              <div className="overflow-y-auto p-8 sm:p-10 space-y-6">
                {/* Meta details */}
                <div className="space-y-4">
                  <span className="inline-block bg-blue-500/10 text-blue-600 dark:text-school-gold text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                    {activeNews.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-snug">
                    {activeNews.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-school-gold" />
                      {activeNews.date}
                    </span>
                    {activeNews.author && (
                      <span className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-school-gold" />
                        By {activeNews.author}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hero image */}
                <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-850">
                  <img src={activeNews.img} alt={activeNews.title} className="w-full h-full object-cover" />
                </div>

                {/* Article body paragraphs */}
                <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans text-justify">
                  {activeNews.content ? (
                    activeNews.content.map((para: string, pIdx: number) => {
                      if (para.startsWith("•") || para.includes("\n•")) {
                        return (
                          <ul key={pIdx} className="list-disc pl-6 space-y-2 py-2 text-left bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            {para.split("\n").map((line, lIdx) => (
                              <li key={lIdx} className="font-semibold text-slate-800 dark:text-slate-200">
                                {line.replace("• ", "").trim()}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })
                  ) : (
                    <p>{activeNews.desc}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </main>
      <Footer />
    </>
  );
}
