"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/high-school/PageHeader";
import { Tag, Clock, ArrowRight, Sparkles, X, User } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ school: string }>;
}

export default function SchoolNews({ params }: PageProps) {
  const { school } = use(params);
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];

  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  if (!schoolInfo) {
    notFound();
  }

  // Create news items dynamically based on milestones or custom entries
  const newsList = [
    {
      title: "Errymaple High School Celebrates Excellence While Embracing an AI-Powered Future",
      date: "August 4, 2026",
      author: "Charlton Chipandambira",
      desc: "Beyond Excellence: Empowering the Next Generation Through AI and Innovation. Errymaple High School held its 2026 Prize Giving Day in Makwasha, Zvishavane, showcasing robotics exhibitions and future-ready learning.",
      category: "Prize Giving",
      img: "/images/prizegiving_1.jpg",
      content: [
        "**MAKWASHA, ZVISHAVANE – 4 August 2026** – Errymaple High School reaffirmed its commitment to academic excellence, innovation and future-ready education during its 2026 Prize Giving Day, held under the inspiring theme **\"Beyond Excellence: Empowering the Next Generation Through AI and Innovation.\"** The event brought together students, parents, guardians, staff members, invited guests and education stakeholders to celebrate outstanding achievement while charting a bold course for the future of education in the era of artificial intelligence.",
        "The ceremony showcased not only the school's impressive academic accomplishments but also its deliberate investment in practical learning, technological advancement and innovation, reflecting its vision of preparing learners to compete confidently in a rapidly changing global landscape.",
        "IMAGE:/images/prizegiving_1.jpg",
        "## Innovation Takes Centre Stage",
        "The day's proceedings began with a series of exhibitions mounted by various academic departments, transforming the school grounds into a vibrant showcase of creativity, research and practical learning.",
        "Visitors toured exhibitions presented by the:",
        "• Robotics and Artificial Intelligence Department\n• Computer Servicing and Maintenance Department\n• Commercials Department\n• Geography Department\n• Agriculture Department",
        "The Robotics and Artificial Intelligence exhibition attracted significant attention as students demonstrated projects illustrating how AI technologies can be integrated into education, problem-solving and everyday life. Learners confidently explained the principles behind their innovations, highlighting how artificial intelligence is becoming an essential tool across various professions.",
        "The Computer Servicing and Maintenance Department displayed practical skills in computer assembly, troubleshooting, networking and hardware maintenance, demonstrating the school's commitment to producing technically competent graduates equipped with industry-relevant skills.",
        "The Commercials Department exhibited entrepreneurial projects, accounting concepts and business innovations, while Geography learners presented environmental research, mapping techniques and sustainable development initiatives. Agriculture students impressed visitors with displays focusing on modern farming practices, crop production and agricultural innovation, reinforcing the importance of agriculture in Zimbabwe's economic development.",
        "The exhibitions reflected the school's practical approach to education, where classroom learning is complemented by hands-on experience, creativity and real-world application.",
        "IMAGE:/images/prizegiving_4.jpg",
        "## Celebrating Excellence",
        "Following the exhibitions, guests gathered for the official Prize Giving Ceremony, where exceptional students were recognised for outstanding achievements in academics, leadership, sports and co-curricular activities.",
        "The ceremony celebrated learners whose hard work, discipline and commitment had distinguished them throughout the academic year. Parents applauded proudly as students received awards for their dedication and excellence across various disciplines.",
        "The event served as a reminder that excellence extends beyond examination results to include innovation, character, leadership, creativity and service to the community.",
        "IMAGE:/images/prizegiving_2.jpg",
        "## Director Calls for Responsible Adoption of Artificial Intelligence",
        "One of the highlights of the day was an inspiring address by **Mrs R. Gengezha**, Director of Errymaple High School.",
        "In her speech, Mrs Gengezha challenged students, teachers and parents to embrace technological change rather than fear it, emphasising that artificial intelligence represents an opportunity for growth when used responsibly.",
        "She delivered one of the day's most memorable messages:",
        "> \"Artificial Intelligence is not going to replace human beings; it will replace human beings who refuse to use Artificial Intelligence.\"",
        "Her remarks underscored the importance of continuous learning and adaptability in a world increasingly shaped by emerging technologies. She encouraged learners to develop digital literacy alongside critical thinking, creativity, ethical leadership and strong interpersonal skills—qualities that remain uniquely human and increasingly valuable in an AI-driven world.",
        "Mrs Gengezha reaffirmed the school's commitment to integrating technology into teaching and learning while maintaining the human values that define quality education.",
        "IMAGE:/images/prizegiving_3.jpg",
        "## Guest of Honour Challenges Learners to Lead the Future",
        "The Guest of Honour, **Mr Munyaradzi Gwatidzo**, congratulated the school on its remarkable achievements and praised its vision of combining academic excellence with innovation.",
        "Addressing students, he encouraged them to embrace emerging technologies while remaining disciplined, hardworking and ethically grounded. He noted that the future belongs to young people who are willing to continuously acquire new skills, solve real-world problems and adapt to changing circumstances.",
        "He commended Errymaple High School for positioning itself as a forward-looking institution that recognises the transformative role of artificial intelligence in education while ensuring learners develop the character and values needed to use technology responsibly.",
        "IMAGE:/images/prizegiving_5.jpg",
        "## Principal Reflects on a Successful Year",
        "The school's Principal, **Mr M. Mhuri**, reflected on the institution's achievements over the past academic year, expressing gratitude to parents, teachers, support staff and learners for their collective dedication.",
        "He acknowledged the commitment demonstrated by the teaching staff in maintaining high academic standards while embracing innovative teaching approaches that prepare students for the future.",
        "Mr Mhuri encouraged students to remain focused on their educational journeys, reminding them that true success is built through perseverance, integrity, discipline and a willingness to embrace lifelong learning.",
        "He also thanked parents and guardians for their unwavering support, describing the partnership between home and school as essential in nurturing responsible, innovative and successful young people.",
        "## Preparing Learners for Tomorrow",
        "The 2026 Prize Giving Day highlighted Errymaple High School's determination to move beyond traditional models of education by integrating artificial intelligence, robotics and practical technological skills into the learning experience.",
        "The event demonstrated that the school is not only rewarding past achievements but also investing in future possibilities. By exposing learners to AI, digital technologies and innovation alongside conventional academic subjects, the institution continues to prepare graduates capable of thriving in an increasingly digital economy.",
        "The exhibitions, speeches and awards collectively reinforced the central message of the day: excellence must evolve with the changing world, and education must empower learners to become innovators rather than merely consumers of technology.",
        "## A Vision Beyond Excellence",
        "As the celebrations concluded, one message resonated throughout the school community: the future belongs to those who are willing to learn, innovate and adapt.",
        "With the theme **\"Beyond Excellence: Empowering the Next Generation Through AI and Innovation,\"** Errymaple High School demonstrated that education in the twenty-first century extends beyond examination success. It is about cultivating thinkers, innovators, entrepreneurs and responsible leaders who will harness technology to improve society.",
        "The 2026 Prize Giving Day will be remembered not only as a celebration of achievement but also as a declaration of the school's vision—to equip every learner with the knowledge, skills and mindset required to succeed in a future where human potential and artificial intelligence work together to create new opportunities.",
        "Through visionary leadership, committed educators and ambitious learners, Errymaple High School continues to set a benchmark for educational excellence, ensuring that today's students are prepared to become tomorrow's innovators and leaders."
      ]
    },
    {
      title: "David Ruswa Tournament 2026 a Resounding Success",
      date: "June 26, 2026",
      author: "Charlton Chipandambira",
      desc: "The David Ruswa Tournament 2026, hosted by Errymaple Group of Schools on 26 June 2026, was successfully held at Errymaple International School, bringing together ten schools in a celebration of sporting excellence, teamwork, discipline, and friendship.",
      category: "Sports",
      img: "/images/news_ruswa.jpg",
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
    {
      title: `${schoolInfo.shortName} Achieves High Distinction Results`,
      date: "June 15, 2026",
      author: "School Administration",
      desc: "We celebrate our recent academic cohort for securing high passing percentage marks in core subjects, aligning with our targets of academic integrity and student leadership.",
      category: "Academic",
      img: "/images/news_cambridge.png",
      content: [
        "We celebrate our recent academic cohort for securing high passing percentage marks in core subjects, aligning with our targets of academic integrity and student leadership.",
        "Through dedication, consistent assessment tracking, and tailored tutoring camps, our learners exceeded national pass boundaries, demonstrating the premium standard of learning at Errymaple."
      ]
    },
    {
      title: "School STEM robotics squad modernization",
      date: "May 28, 2026",
      author: "ICT Department",
      desc: "Our STEM division has integrated advanced microcontrollers and Python logic programming modules into daily lab schedules, accelerating smart vehicle coding assembly projects.",
      category: "Innovation",
      img: "/images/news_robotics.png",
      content: [
        "Our STEM division has integrated advanced microcontrollers and Python logic programming modules into daily lab schedules, accelerating smart vehicle coding assembly projects.",
        "Students explore robotics, programming, automation, and artificial intelligence through practical projects that prepare them for careers in the Fourth Industrial Revolution."
      ]
    },
    {
      title: "Co-Curricular Sports Academy Upgrades",
      date: "April 10, 2026",
      author: "Sports Department",
      desc: "Inauguration of training lanes, practice greens, and volleyball courts has boosted physical coordination and fitness development for all grade levels.",
      category: "Sports",
      img: "/images/news_golf.png",
      content: [
        "Inauguration of training lanes, practice greens, and volleyball courts has boosted physical coordination and fitness development for all grade levels.",
        "Students enjoy a variety of sporting activities including football, netball, volleyball, basketball, athletics, and tennis, promoting physical fitness, teamwork, and leadership."
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageHeader 
        title="News & Achievements" 
        subtitle="Latest Updates"
        breadcrumbs={[
          { label: "News & Accolades" }
        ]}
      />

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Latest Announcements
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Read recent announcements covering academic distinctions, tech innovations, and co-curricular achievements at {schoolInfo.name}.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveArticle(item)}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-slate-200">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/news_robotics.png'; }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-1 text-slate-450 text-xs">
                    <Clock className="h-3.5 w-3.5 text-school-gold" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-slate-950 dark:text-white leading-snug group-hover:text-school-gold transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-school-gold hover:underline gap-1">
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* Full Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-450" />
              </button>

              <div className="overflow-y-auto p-8 sm:p-10 space-y-6">
                {/* Meta details */}
                <div className="space-y-4">
                  <span className="inline-block bg-blue-500/10 text-blue-600 dark:text-school-gold text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                    {activeArticle.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight leading-snug">
                    {activeArticle.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800 pb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-school-gold" />
                      {activeArticle.date}
                    </span>
                    {activeArticle.author && (
                      <span className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-school-gold" />
                        By {activeArticle.author}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hero image */}
                <div className="rounded-2xl overflow-hidden bg-slate-900/5 dark:bg-slate-950 shadow-md flex items-center justify-center p-2 max-h-[500px]">
                  <img 
                    src={activeArticle.img} 
                    alt={activeArticle.title} 
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/news_robotics.png'; }}
                    className="w-full max-h-[480px] object-contain rounded-xl" 
                  />
                </div>

                {/* Article body paragraphs */}
                <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans text-justify">
                  {activeArticle.content ? (
                    activeArticle.content.map((para: string, pIdx: number) => {
                      if (para.startsWith("## ")) {
                        return (
                          <h3 key={pIdx} className="text-xl font-bold font-serif text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                            {para.replace("## ", "")}
                          </h3>
                        );
                      }
                      if (para.startsWith("> ")) {
                        return (
                          <blockquote key={pIdx} className="p-5 my-4 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-school-gold rounded-r-2xl italic text-slate-800 dark:text-amber-100 font-serif text-base sm:text-lg leading-relaxed shadow-sm">
                            {para.replace("> ", "")}
                          </blockquote>
                        );
                      }
                      if (para.startsWith("•") || para.includes("\n•")) {
                        return (
                          <ul key={pIdx} className="list-disc pl-6 space-y-2 py-3 text-left bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            {para.split("\n").map((line: string, lIdx: number) => (
                              <li key={lIdx} className="font-semibold text-slate-800 dark:text-slate-200">
                                {line.replace("• ", "").trim()}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (para.startsWith("IMAGE:")) {
                        const imgUrl = para.replace("IMAGE:", "").trim();
                        return (
                          <div key={pIdx} className="my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-950 flex items-center justify-center p-2 max-h-[500px]">
                            <img 
                              src={imgUrl} 
                              alt="Errymaple Prize Giving Event" 
                              onError={(e) => { (e.target as HTMLImageElement).src = '/images/news_robotics.png'; }}
                              className="w-full max-h-[480px] object-contain rounded-xl" 
                            />
                          </div>
                        );
                      }
                      if (para.includes("**")) {
                        const parts = para.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={pIdx}>
                            {parts.map((part, i) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return <strong key={i} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })
                  ) : (
                    <p>{activeArticle.desc}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
