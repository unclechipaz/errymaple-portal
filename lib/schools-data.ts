import { 
  Award, BookOpen, Compass, Cpu, GraduationCap, ShieldCheck, 
  School, Calendar, Trophy, Globe, Brain, Users, Leaf,
  Briefcase, Mail, BookMarked, Landmark, HelpCircle, FileText,
  Clock, MapPin, Building, Flame, Compass as CompassIcon, CheckCircle2,
  Heart, Shield, Eye, Rocket, Star, ShieldAlert
} from "lucide-react";

export type SchoolSlug = "high-school" | "junior-school" | "international-school";

export interface SchoolData {
  name: string;
  shortName: string;
  tagline: string;
  motto: string;
  slug: SchoolSlug;
  logo: string;
  bgGradient: string; // Tailwind class
  accentBg: string;
  accentBgHover: string;
  accentText: string;
  accentBorder: string;
  accentDot: string;
  btnTheme: string;
  primaryColorHex: string;
  accentColorHex: string;
  email: string;
  phone: string;
  address: string;
  aboutText: string;
  welcomeText: string;
  welcomeAuthor: string;
  welcomeRole: string;
  leadershipIntro?: string;
  facilitiesIntro?: string;
  chooseReasons?: string[];
  historyTitle?: string;
  historyIntro?: string;
  historyOutro?: string;
  visionText: string;
  missionText: string;
  coreValues: { name: string; desc: string; icon: any }[];
  stats: { label: string; value: string; desc: string; icon: any }[];
  milestones: { year: string; title: string; desc: string; icon: any }[];
  staff: { name: string; role: string; qualification: string; desc: string; email: string }[];
  departments: { title: string; desc: string; subjects: string[] }[];
  facilities: { name: string; desc: string; image: string }[];
  fees: { termly: string; boarding?: string; uniform: string; application: string; note: string }[];
  scholarships: { title: string; eligibility: string; coverage: string }[];
  boarding: { title: string; desc: string; features: string[] };
  faqs: { question: string; answer: string }[];
  curriculum: { title: string; desc: string; highlights: string[] }[];
  results: { year: string; oLevelPass: string; aLevelPass: string; universityPlacement: string }[];
  library: { title: string; desc: string; sections: string[] };
  sports: { name: string; desc: string; achievements: string }[];
  clubs: { name: string; desc: string; achievements: string }[];
  events: { title: string; date: string; time: string; location: string; category: string }[];
  gallery: { name: string; img: string; category: string }[];
  downloads: { name: string; size: string; type: string; link?: string }[];
  calendar: { event: string; date: string; type: string }[];
  testimonials: { quote: string; author: string; role: string }[];
  landingImages?: {
    classroom: string;
    sports: string;
    stem: string;
    leadership: string;
  };
}

export const schoolsData: Record<SchoolSlug, SchoolData> = {
  "high-school": {
    name: "Errymaple High School",
    shortName: "High School",
    tagline: "Developing Leaders for Tomorrow",
    motto: "Dreamers, Believers, Achievers",
    slug: "high-school",
    logo: "/images/egs_logo.jpg",
    bgGradient: "from-blue-600/10 via-blue-600/5 to-transparent",
    accentBg: "bg-blue-600",
    accentBgHover: "hover:bg-blue-700",
    accentText: "text-blue-600",
    accentBorder: "border-blue-500/30",
    accentDot: "bg-blue-600",
    btnTheme: "bg-blue-600 text-white hover:bg-blue-700",
    primaryColorHex: "#0F2942",
    accentColorHex: "#C5A059",
    email: "errymaple@errymaplehigh.co.zw",
    phone: "+263 77 508 9740",
    address: "1474 Makwasha, Zvishavane, Zimbabwe",
    aboutText: "Errymaple High School offers Ordinary (O) and Advanced (A) level education. We lead in STEM integration, vocational IT qualifications, and French language certifications.",
    welcomeText: "At Errymaple High School, our target is to nurture academic distinction alongside practical career skills. Through our dual-track ZIMSEC and HEXCO programs, students graduate with both university entry qualifications and industry-certified expertise. We welcome you to our family.",
    welcomeAuthor: "Mr. M. Mhuri",
    welcomeRole: "Principal",
    leadershipIntro: "Our leadership team is committed to providing visionary leadership, maintaining academic excellence, and creating a nurturing environment where every learner can thrive. Through dedication, professionalism, and a shared commitment to excellence, they guide Errymaple High School towards achieving its mission of developing ethical, innovative, and globally competitive citizens.",
    facilitiesIntro: "Errymaple High School provides a modern, secure, and inspiring learning environment where students are empowered to excel academically, socially, and personally. Our campus combines quality educational facilities with practical learning spaces that prepare learners for the future.",
    chooseReasons: [
      "Modern learning facilities",
      "Practical STEM and vocational education",
      "Robotics and Artificial Intelligence programmes",
      "Cambridge, ZIMSEC, and HEXCO curriculum",
      "Safe boarding and day school environment",
      "Excellent sports and extracurricular programmes",
      "Experienced and dedicated teaching staff",
      "Consistent record of academic excellence"
    ],
    visionText: "To become a world class provider of real education",
    missionText: "To nurture ethical, innovative, technological & practical oriented global leaders",
    coreValues: [
      { name: "Financial Literacy", desc: "Equipping learners with budgeting, smart saving, and investments foundations.", icon: Landmark },
      { name: "Leadership", desc: "Embodying moral responsibility, empathy, and administrative capability.", icon: Users },
      { name: "Team working", desc: "Collaborating with respect, collective problem solving, and mutual respect.", icon: Heart },
      { name: "Entrepreneurship", desc: "Encouraging problem-solving, start-up thinking, and creative risk-taking.", icon: Compass },
    ],
    stats: [
      { label: "Est. Since", value: "2011", icon: Calendar, desc: "A history of leadership" },
      { label: "Avg Pass Rate", value: "98%", icon: Award, desc: "ZIMSEC O & A Level" },
      { label: "STEM Projects", value: "15+", icon: Cpu, desc: "AI and coding curriculum" },
      { label: "Boarders", value: "350+", icon: School, desc: "Secure residency rooms" },
    ],
    milestones: [
      { year: "2011", title: "Errymaple High School Established", desc: "Started as a study group with a vision of providing quality secondary education and nurturing future leaders.", icon: Building },
      { year: "2012", title: "ZIMSEC Examination Centre", desc: "Became a registered ZIMSEC examination centre, enabling students to write national examinations at the school.", icon: Award },
      { year: "2014", title: "Introduction of HEXCO Programmes", desc: "Launched HEXCO vocational education beginning with Computer Operations and Packages (COPS).", icon: Cpu },
      { year: "2015", title: "Megafest Education Sector Award", desc: "Received the Megafest Award in recognition of excellence in Zimbabwe's education sector.", icon: Award },
      { year: "2016", title: "Cambridge Centre Status", desc: "Accredited as an official Cambridge examination centre, expanding access to internationally recognised qualifications.", icon: BookOpen },
      { year: "2018", title: "French Language Introduced", desc: "Added French to the curriculum, promoting multilingual learning and global competitiveness.", icon: Globe },
      { year: "2022", title: "Computer Servicing & Maintenance", desc: "Introduced Computer Servicing and Maintenance to equip learners with practical ICT skills.", icon: Cpu },
      { year: "2023", title: "Construction of School Hall", desc: "Completed a modern multipurpose hall for assemblies, examinations, conferences, and events.", icon: Building },
      { year: "2026", title: "National Academic Excellence Award", desc: "Won the Ministry of Primary and Secondary Education National Award for Best O-Level Results among Independent Colleges in Zimbabwe.", icon: Trophy },
    ],
    staff: [
      { name: "M. Mhuri", role: "Principal", qualification: "Strategic Leadership & Management", desc: "Provides strategic leadership for the school, ensuring excellence in academics, administration, student welfare, and institutional development.", email: "principal@errymaplehigh.co.zw" },
      { name: "R. Masuka", role: "Deputy Principal", qualification: "Academic & Administrative Operations", desc: "Oversees the day-to-day academic and administrative operations of the school while supporting the implementation of the school's vision and strategic goals.", email: "rmasuka@errymaplehigh.co.zw" },
      { name: "I. Murambasvina", role: "Senior Master", qualification: "Discipline & Co-Curricular Coordination", desc: "Responsible for student discipline, staff coordination, and ensuring the smooth running of academic and co-curricular programmes.", email: "imurambasvina@errymaplehigh.co.zw" },
      { name: "P. Jengeta", role: "Senior Woman", qualification: "Pastoral Care & Learner Welfare", desc: "Provides pastoral care and guidance to students, promoting learner welfare, personal development, and a positive school culture.", email: "pjengeta@errymaplehigh.co.zw" },
    ],
    departments: [
      { title: "Sciences & Mathematics", desc: "Fostering analytical thinkers through Chemistry, Physics, Biology, and Advanced Math.", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"] },
      { title: "Commercials & Humanities", desc: "Structuring financial and societal awareness for international careers.", subjects: ["Accounting", "Business Studies", "Economics", "History", "Geography"] },
      { title: "Languages & Practical Arts", desc: "Developing bilingual capability and hands-on professional expertise.", subjects: ["English Language", "Literature in English", "Français (DELF)", "Computer Servicing (HEXCO)"] },
    ],
    facilities: [
      { name: "Robotics & Artificial Intelligence Laboratory", desc: "Learners explore robotics, programming, automation, and artificial intelligence through practical projects that prepare them for careers in the Fourth Industrial Revolution.", image: "/images/robotics_gallery.png" },
      { name: "Technical & Vocational Workshops", desc: "Students gain practical skills through our HEXCO programmes, including Computer Servicing and Maintenance, helping them develop industry-ready competencies.", image: "/images/robotics_gallery.png" },
      { name: "School Library", desc: "The library offers a quiet and resource-rich environment with textbooks, reference materials, and digital resources that support independent learning and research.", image: "/images/school_library.jpg" },
      { name: "Multipurpose Hall", desc: "Our modern hall hosts assemblies, examinations, prize-giving ceremonies, conferences, cultural events, and indoor activities throughout the year.", image: "/images/cultural_gallery.png" },
      { name: "Boarding Facilities", desc: "Our boarding facilities provide a safe, comfortable, and supportive home away from home, with dedicated boarding staff committed to student welfare and personal development.", image: "/images/leadership_gallery.png" },
      { name: "Sports Facilities", desc: "Students enjoy a variety of sporting activities including football, netball, volleyball, basketball, athletics, and tennis, promoting physical fitness, teamwork, and leadership.", image: "/images/sports_gallery.png" },
      { name: "Dining Hall", desc: "Nutritious meals are prepared and served in a clean and welcoming dining environment that supports students' health and wellbeing.", image: "/images/dining_hall.jpg" },
      { name: "School Transport", desc: "Our reliable school buses provide safe transportation for educational trips, sporting events, and other official school activities.", image: "/images/school_bus.jpg" },
      { name: "Safe & Secure Environment", desc: "The campus is maintained to high standards of cleanliness and safety, providing a secure environment where students can learn with confidence.", image: "/images/safe_environment.png" },
      { name: "Green Learning Environment", desc: "Beautiful surroundings and landscaped grounds create a peaceful atmosphere that encourages learning, creativity, and personal growth.", image: "/images/leadership_gallery.png" },
    ],
    fees: [
      { termly: "USD 380", boarding: "USD 1,000", uniform: "USD 250", application: "USD 20", note: "Registration fees are USD 100 for Boarders and USD 50 for Day Scholars. Day Scholars also have a USD 10 grocery fee while Boarders have a grocery list or USD 40 equivalent." }
    ],
    scholarships: [
      { title: "Academic Excellence Bursary", eligibility: "Top 3 students entering Form 1 or Lower Sixth", coverage: "50% to 100% Tuition Waiver" },
      { title: "STEM Innovator Award", eligibility: "Outstanding performance in coding/robotics competitions", coverage: "30% Tuition Waiver + Free Boarding Support" },
    ],
    boarding: {
      title: "Boarding Residency at Eastlea",
      desc: "Our boarding facility provides a safe, disciplined environment supporting academic study and character growth.",
      features: [
        "Structured study sessions supervised by resident tutors",
        "Nutritious termly menus prepared by qualified chefs",
        "Active sports programs and recreation halls for weekends",
        "24/7 campus security, CCTV surveillance, and resident medical staff"
      ]
    },
    faqs: [
      { question: "What curricula do you offer?", answer: "We offer the ZIMSEC curriculum (O & A Level) combined with HEXCO National Foundation Certificates in Computer Servicing, and French DELF certificates." },
      { question: "Is boarding compulsory?", answer: "No, we accommodate both day scholars and boarders. Resident boarders reside in our Eastlea campus hostels." },
      { question: "How do I apply?", answer: "You can apply online through our dynamic wizard, attach school reports, and pay the registration fee." }
    ],
    curriculum: [
      { title: "ZIMSEC Ordinary & Advanced Levels", desc: "Comprehensive examinations in Science, Commerce, and Arts.", highlights: ["Nationally accredited certificates", "Broad subject choices", "Dedicated exam preparation camps"] },
      { title: "HEXCO Computer Servicing", desc: "Direct vocational qualifications in hardware, networking, and support.", highlights: ["Hands-on lab assemblies", "Accredited by Higher Education Ministry", "Career-ready software skills"] }
    ],
    results: [
      { year: "2025", oLevelPass: "96.5%", aLevelPass: "100%", universityPlacement: "92%" },
      { year: "2024", oLevelPass: "95.1%", aLevelPass: "98.5%", universityPlacement: "89%" },
      { year: "2023", oLevelPass: "93.8%", aLevelPass: "98.0%", universityPlacement: "85%" }
    ],
    library: {
      title: "High School Central Library",
      desc: "A rich physical and digital library catalog containing reference materials, study cubes, and dynamic computer learning stations.",
      sections: ["Science & STEM Journals", "Commercial Reference Section", "Bilingual French Fiction", "E-Learning Digital Database"]
    },
    sports: [
      { name: "Golf Academy", desc: "Professional putting green, bunker training, and club selection masterclasses.", achievements: "Winner of National Inter-High Golf Championship (2025)" },
      { name: "Swimming Club", desc: "Training in competitive speed strokes and lifesaver drills in school pools.", achievements: "Gold medals in regional junior relay gala" },
    ],
    clubs: [
      { name: "STEM Robotics Club", desc: "Assembling custom robots and programming algorithms using C++ and Python.", achievements: "Accredited national qualifiers for Singapore Robotics Finals" },
      { name: "Debate & Public Speaking", desc: "Honing rhetorical skills, analytical reasoning, and global relations debates.", achievements: "Champions of the National Schools Debate League" }
    ],
    events: [
      { title: "Term 2 Inter-House Athletics Meet", date: "July 14, 2026", time: "08:00 AM", location: "School Fields", category: "Sports" },
      { title: "Robotics Olympiad Bootcamp", date: "August 3, 2026", time: "10:00 AM", location: "STEM Lab", category: "Academics" },
    ],
    gallery: [
      { name: "Science Laboratory", img: "/images/science_lab_gallery.png", category: "Laboratories" },
      { name: "Modern Lecture Room", img: "/images/classrooms_gallery.png", category: "Classrooms" },
      { name: "Golf Academy training", img: "/images/golf_gallery.png", category: "Golf" },
      { name: "Swimming Practice Lanes", img: "/images/swimming_gallery.png", category: "Swimming" },
    ],
    downloads: [
      { name: "List of Requirements (Boarding & Day) 2026", size: "10.4 MB", type: "PDF", link: "/documents/errymaple_requirements.pdf" },
      { name: "High School Admission Form 2026", size: "1.4 MB", type: "PDF" },
      { name: "School Fees Schedule & Bank Details", size: "850 KB", type: "PDF" },
      { name: "Boarding Hostel Rules & Dress Code", size: "1.1 MB", type: "PDF" }
    ],
    calendar: [
      { event: "Schools Open - Term 2", date: "May 12, 2026", type: "Academic" },
      { event: "Mid-Term Academic Progress Reports", date: "June 25, 2026", type: "Academic" },
      { event: "Schools Close - Term 2", date: "August 6, 2026", type: "Holiday" }
    ],
    testimonials: [
      { quote: "Sending our son to Errymaple High School was the best investment we made. The dual-track combination of ZIMSEC and HEXCO computer servicing gave him both university eligibility and practical IT engineering credentials.", author: "Mrs. Sarah Sibanda", role: "Parent of 2025 Graduate" },
      { quote: "The robotics labs and coding tracks at Errymaple inspired me to pursue Software Engineering. Winning the national robotics Olympiad was a highlight of my school years, and the leadership mentors taught me how to manage team projects.", author: "Kudzai Chanda", role: "Alumni (Class of 2024, now at NUST)" },
      { quote: "Boarding at Errymaple taught me discipline, independent organization, and collaborative respect. The environment is supportive, and the teachers guide us to achieve top academic standards while exploring sports like golf.", author: "Tinashe Mandeya", role: "Current Form 6 Student & Head Boy" }
    ],
    landingImages: {
      classroom: "/images/classrooms_gallery.png",
      sports: "/images/golf_gallery.png",
      stem: "/images/robotics_gallery.png",
      leadership: "/images/leadership_gallery.png"
    }
  },
  "junior-school": {
    name: "Errymaple Junior School",
    shortName: "Junior School",
    tagline: "Nurturing Foundations for Greatness",
    motto: "Dreamers, Believers, Achievers",
    slug: "junior-school",
    logo: "/images/egs_logo.jpg",
    bgGradient: "from-emerald-600/10 via-emerald-600/5 to-transparent",
    accentBg: "bg-emerald-600",
    accentBgHover: "hover:bg-emerald-700",
    accentText: "text-emerald-600",
    accentBorder: "border-emerald-500/30",
    accentDot: "bg-emerald-600",
    btnTheme: "bg-emerald-600 text-white hover:bg-emerald-700",
    primaryColorHex: "#064E3B",
    accentColorHex: "#C5A059",
    email: "admissions@errymaplejunior.co.zw",
    phone: "+263 54 252 400 / +263 774 125 456",
    address: "88 Woodlands Suburbs, Zvishavane, Zimbabwe",
    aboutText: "Errymaple Junior School caters to ECD A through Grade 7, integrating early STEM skills with the core national curriculum to build child confidence.",
    welcomeText: "Welcome to Errymaple Junior School. We believe that early child education is the most critical stage in building lifelong character and curiosity. Our dedicated teachers and interactive classrooms are designed to make learning a joyful adventure.",
    welcomeAuthor: "Mrs. A. Sibasa",
    welcomeRole: "Headmistress",
    visionText: "To build the foundational pillars of critical learning and moral character.",
    missionText: "To deliver play-infused and structured primary education preparing children for secondary success.",
    coreValues: [
      { name: "Academic Curiosity", desc: "Encouraging early logic exploration and reading joy.", icon: BookOpen },
      { name: "Teamwork", desc: "Cooperating respectfully with classmates and teachers.", icon: Heart },
      { name: "Creativity", desc: "Promoting self-expression through music, art, and coding projects.", icon: Flame },
      { name: "Discipline", desc: "Nurturing personal responsibility and classroom respect.", icon: Shield },
    ],
    stats: [
      { label: "Est. Since", value: "2016", icon: Calendar, desc: "A foundation of trust" },
      { label: "Grade 7 Pass Rate", value: "100%", icon: Award, desc: "ZIMSEC Exams" },
      { label: "ECD Classrooms", value: "8", icon: School, desc: "Safe, child-friendly layout" },
      { label: "Active Sports", value: "6", icon: Trophy, desc: "Early coordination training" },
    ],
    milestones: [
      { year: "2016", title: "Foundation of Junior School", desc: "Established to support early development classes (ECD) and primary grades.", icon: Building },
      { year: "2019", title: "Woodlands Campus Inauguration", desc: "Moved into a purpose-built primary campus with playgrounds and a kids' library.", icon: Building },
      { year: "2023", title: "Junior Computer Lab launch", desc: "Installed child-friendly desktop stations and began basic logic coding classes.", icon: Cpu },
    ],
    staff: [
      { name: "Mrs. A. Sibasa", role: "Headmistress", qualification: "B.Ed in Early Childhood Development", desc: "Providing dynamic child-centered leadership and managing curriculum quality.", email: "headmistress@errymaplejunior.co.zw" },
      { name: "Mr. P. Ncube", role: "Senior Teacher", qualification: "Diploma in Primary Education", desc: "Managing sports days, Grade 7 exam preparation, and co-curricular programs.", email: "pncube@errymaplejunior.co.zw" }
    ],
    departments: [
      { title: "Early Childhood (ECD A - B)", desc: "Play-based coordination, vocabulary builder, and basic counting classes.", subjects: ["Language Arts", "Numbers & Logic", "Expressive Arts", "Physical Activity"] },
      { title: "Junior Primary (Grade 1 - 3)", desc: "Developing strong reading comprehension and arithmetic foundations.", subjects: ["English Language", "Mathematics", "Science & Technology", "Shona/Ndebele"] },
      { title: "Senior Primary (Grade 4 - 7)", desc: "Advanced subject learning and ZIMSEC exam preparation.", subjects: ["Mathematics", "English", "General Paper", "Agriculture & Tech"] }
    ],
    facilities: [
      { name: "Woodlands Kids Playground", desc: "Secure outdoor climbing frames, swings, and sandboxes under shading.", image: "/images/cultural_gallery.png" },
      { name: "Junior Computer Corner", desc: "A child-friendly IT room teaching basic mouse control, keyboarding, and logic games.", image: "/images/robotics_gallery.png" },
      { name: "Primary Reading Room", desc: "Colorful space with children's literature, picture books, and story circles.", image: "/images/classrooms_gallery.png" }
    ],
    fees: [
      { termly: "$450", uniform: "$150", application: "$10", note: "Fees include morning fruit snacks and access to all co-curricular clubs." }
    ],
    scholarships: [
      { title: "Primary Star Scholarship", eligibility: "Grade 3 top performer showing exceptional character", coverage: "50% Tuition Waiver" },
    ],
    boarding: {
      title: "Day School Services & Boarding Prep",
      desc: "We focus on day scholar services but offer structured boarding prep programs for Grade 7 pupils planning to enter high school.",
      features: [
        "Supervised afternoon care and homework clubs",
        "School bus transport covering major residential zones",
        "Healthy school lunch plans available termly",
        "Introductory boarding weekend sessions for Grade 7 scholars"
      ]
    },
    faqs: [
      { question: "What age does ECD A start?", answer: "ECD A children must be at least 4 years old at the beginning of the academic calendar year." },
      { question: "What are the school hours?", answer: "ECD classes run from 08:00 AM to 12:30 PM. Grades 1 to 7 run from 08:00 AM to 03:30 PM." },
      { question: "Do you offer Cambridge Primary?", answer: "We focus on the ZIMSEC primary syllabus infused with Cambridge English and science resources to ensure balanced learning." }
    ],
    curriculum: [
      { title: "ZIMSEC Primary Framework", desc: "National core syllabus preparing students for Grade 7 public examinations.", highlights: ["Strong mathematical foundation", "Agriculture & Environmental science", "Local language fluency"] },
      { title: "Cambridge Primary English & Math resources", desc: "Supplementing our textbooks with international logic problems.", highlights: ["Global comprehension tasks", "Creative story construction", "Interactive science projects"] }
    ],
    results: [
      { year: "2025", oLevelPass: "100%", aLevelPass: "N/A", universityPlacement: "N/A" },
      { year: "2024", oLevelPass: "100%", aLevelPass: "N/A", universityPlacement: "N/A" }
    ],
    library: {
      title: "Woodlands Primary Library",
      desc: "A bright room stocked with children's storybooks, basic science cards, maps, and tablets loaded with primary learning applications.",
      sections: ["ECD Picture Books", "Junior Reader Series", "Primary Geography & Maps", "Digital Learning Tablets"]
    },
    sports: [
      { name: "Primary Athletics", desc: "Focusing on early physical coordination, short sprint running, and fun hurdles.", achievements: "Champions of Zvishavane Primary Schools Sports Gala (2025)" },
      { name: "Mini-Football & Netball", desc: "Early teamwork development, ball control, and passing training.", achievements: "Gold medals in regional junior netball tournaments" }
    ],
    clubs: [
      { name: "Music & Drama Circle", desc: "Learning basic recorder playing, singing, and stage acting for school plays.", achievements: "Outstanding Performance Prize at National Arts Festival" },
      { name: "Young STEM club", desc: "Making simple paper plane models, block lego assemblies, and color chemistry.", achievements: "Hosted Junior Science & Tech Exhibition" }
    ],
    events: [
      { title: "Junior Sports Day Gala", date: "July 22, 2026", time: "09:00 AM", location: "Junior Fields", category: "Sports" },
      { title: "ECD Parents Reading Circle", date: "August 10, 2026", time: "02:00 PM", location: "School Library", category: "Events" }
    ],
    gallery: [
      { name: "Creative Art Class", img: "/images/cultural_gallery.png", category: "Classrooms" },
      { name: "Woodlands Play Area", img: "/images/leadership_gallery.png", category: "Playground" },
      { name: "Junior Computer Session", img: "/images/robotics_gallery.png", category: "STEM" },
    ],
    downloads: [
      { name: "Junior School Application Form 2026", size: "980 KB", type: "PDF" },
      { name: "Required Stationery & Uniform list", size: "450 KB", type: "PDF" }
    ],
    calendar: [
      { event: "Primary Schools Open", date: "May 12, 2026", type: "Academic" },
      { event: "Woodlands Sports Gala", date: "July 22, 2026", type: "Sports" },
      { event: "Primary School Closing", date: "August 6, 2026", type: "Holiday" }
    ],
    testimonials: [
      { quote: "Our daughter loves Errymaple Junior School. The teachers are so gentle and parent communication is always fast. She has learned basic computer mouse skills and simple coding while excelling in reading.", author: "Mrs. Chipo Moyo", role: "Parent of ECD B Student" },
      { quote: "Being Head Boy at Errymaple Junior taught me to lead by example and support my fellow primary students. The classrooms are clean and colorful, and the library has the best adventure books.", author: "Shawn Mpofu", role: "Grade 7 Head Boy (Class of 2025)" }
    ],
    landingImages: {
      classroom: "/images/classrooms_gallery.png",
      sports: "/images/golf_gallery.png",
      stem: "/images/robotics_gallery.png",
      leadership: "/images/leadership_gallery.png"
    }
  },
  "international-school": {
    name: "Errymaple International School",
    shortName: "International School",
    tagline: "Providing Global Perspectives in Education",
    motto: "Dreamers, Believers, Achievers",
    slug: "international-school",
    logo: "/images/egs_logo.jpg",
    bgGradient: "from-red-600/10 via-red-600/5 to-transparent",
    accentBg: "bg-red-600",
    accentBgHover: "hover:bg-red-700",
    accentText: "text-red-600",
    accentBorder: "border-red-500/30",
    accentDot: "bg-red-600",
    btnTheme: "bg-[#1877F2] text-white hover:bg-[#1565C0]",
    primaryColorHex: "#7F1D1D",
    accentColorHex: "#C5A059",
    email: "errymaple@live.com",
    phone: "+263 77 553 9914 / +263 77 699 4154",
    address: "1698 Musuki Plots, Masvingo Road, Zvishavane, Zimbabwe",
    aboutText: "Errymaple International School offers Cambridge IGCSE, AS, and A-Level courses with bilingual study pathways to prepare students for global university placement.",
    welcomeText: "Welcome to Errymaple International School. Our commitment is to prepare students to face global academic standards. By delivering the Cambridge Assessment International Education framework and DELF French qualifications, we pave pathways to top universities worldwide.",
    welcomeAuthor: "Mr. J. Jengeta",
    welcomeRole: "Principal",
    visionText: "To become a world class provider of real education",
    missionText: "To nurture ethical, innovative, technological & practical oriented global leaders",
    coreValues: [
      { name: "Financial Literacy", desc: "Equipping learners with budgeting, smart saving, and investments foundations.", icon: Landmark },
      { name: "Leadership", desc: "Embodying moral responsibility, empathy, and administrative capability.", icon: Users },
      { name: "Team working", desc: "Collaborating with respect, collective problem solving, and mutual respect.", icon: Heart },
      { name: "Entrepreneurship", desc: "Encouraging problem-solving, start-up thinking, and creative risk-taking.", icon: Compass },
    ],
    stats: [
      { label: "Est. Since", value: "2022", icon: Calendar, desc: "A global vision" },
      { label: "Cambridge Pass", value: "97.8%", icon: Award, desc: "IGCSE & A Level" },
      { label: "Languages", value: "Bilingual", icon: Globe, desc: "English & French tracks" },
      { label: "Uni Placements", value: "94%", icon: School, desc: "International entries" },
    ],
    historyTitle: "🏫 ERRYMAPLE INTERNATIONAL SCHOOL: A JOURNEY OF GROWTH, INNOVATION & EXCELLENCE",
    historyIntro: "From opening our doors to achieving record-breaking academic success, every year has marked a bold new chapter in our journey.",
    historyOutro: "Five years. Five major milestones. One unstoppable vision.\n\nFrom a bold beginning in 2022 to record-breaking excellence in 2026, Errymaple International School continues to grow, innovate and redefine educational excellence.\n\nWe are Dreamers. We are Believers. We are Achievers.\n🌍 Top of the Best.",
    milestones: [
      { year: "2022", title: "THE BEGINNING", desc: "Errymaple International School officially opened its doors to the public — beginning a new era of world-class education, innovation and opportunity.", icon: Rocket },
      { year: "2023", title: "RAISING THE BAR IN SPORTS", desc: "We opened a state-of-the-art sporting facility, creating an environment where talent, teamwork and excellence could thrive beyond the classroom.", icon: Trophy },
      { year: "2024", title: "BUILDING FOR THE FUTURE", desc: "We unveiled a magnificent multi-purpose hall with a capacity of 2,000 people — a landmark facility designed for major school events, conferences, performances and community gatherings.", icon: Building },
      { year: "2025", title: "ADVANCING SCIENCE & TECHNOLOGY", desc: "We strengthened 21st-century learning through state-of-the-art Computer and Science Laboratories, empowering learners with practical skills, scientific discovery and digital innovation.", icon: Cpu },
      { year: "2026", title: "RECORD-BREAKING ACADEMIC EXCELLENCE", desc: "A defining year of outstanding achievement: 100% A-Level Pass Rate and 92% IGCSE Pass Rate.", icon: Award },
    ],
    staff: [
      { name: "Mr. J. Jengeta", role: "Principal", qualification: "M.Ed in Educational Management & Administration", desc: "Responsible for the overall academic excellence, student character development, and strategic management of the international school.", email: "jjengeta@errymapleinternational.co.zw" },
      { name: "Mrs. C. Moreau", role: "Head of French Department", qualification: "M.A in French as a Foreign Language (Paris Sorbonne)", desc: "Managing the DELF/DALF pathways and international study tour exchanges.", email: "cmoreau@errymapleinternational.co.zw" }
    ],
    departments: [
      { title: "Cambridge Mathematics & Sciences", desc: "Rigorous scientific investigation following IGCSE and A-level specs.", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Environmental Management"] },
      { title: "Commercials & Global Perspectives", desc: "Exploring geopolitical relationships and corporate accounting.", subjects: ["Global Perspectives", "Economics", "Business Studies", "Accounting"] },
      { title: "Languages & Humanities", desc: "Developing native-level English and French language proficiency.", subjects: ["Cambridge English Language", "French Language (CEFR)", "Geography", "Sociology"] }
    ],
    facilities: [
      { name: "Sporting Arena", desc: "A state-of-the-art outdoor sporting facility, providing premium basketball and court sports infrastructure to foster talent and physical excellence.", image: "/images/facilities_arena.jpg" },
      { name: "Cambridge Science Laboratories", desc: "Advanced laboratory setups designed for international practical exams.", image: "/images/science_lab_international.jpg" },
      { name: "Dining Hall", desc: "A premium, lodge-style dining facility offering structured, healthy, and high-quality meal plans to support student health, collaboration, and community boarding life.", image: "/images/facilities_dining.jpg" },
      { name: "Well-Equipped Library", desc: "A vast repository of academic resources, literature, and study spaces, providing learners with a quiet environment for research, reflection, and reading.", image: "/images/facilities_library.jpg" },
      { name: "Computer Laboratory", desc: "A state-of-the-art computer lab equipped with high-performance systems and high-speed internet, empowering students to excel in coding, research, and digital skills.", image: "/images/facilities_computer_lab.png" }
    ],
    fees: [
      { termly: "$750", boarding: "$1,600", uniform: "$350", application: "$50", note: "International fees include all Cambridge practical lab charges and textbooks." }
    ],
    scholarships: [
      { title: "Cambridge Learner Bursary", eligibility: "Outstanding performance in check-point or IGCSE exams", coverage: "Up to 75% Tuition Waiver" },
      { title: "Bilingual Excellence Award", eligibility: "Distinction in DELF B2 examinations", coverage: "40% Tuition Waiver" }
    ],
    boarding: {
      title: "Executive Residence Halls",
      desc: "Our international boarding house offers comfortable accommodation and intensive study support for international students.",
      features: [
        "Spacious double-occupancy rooms with built-in heating systems",
        "Dedicated college counselor support within the hostel office",
        "Nutritious buffet menu offering local and continental meals",
        "Supervised weekend study camps and university admission bootcamps"
      ]
    },
    faqs: [
      { question: "Is Cambridge accepted in Zimbabwean universities?", answer: "Yes, Cambridge IGCSE, AS, and A-Levels are highly respected and fully recognized for direct entry into all local and international universities." },
      { question: "Do you register private candidates?", answer: "No, we only host Cambridge exams for students enrolled in our full-time school sessions." },
      { question: "What is Global Perspectives?", answer: "It is a Cambridge subject focused on research, critical thinking, and debating on global challenges like climate change, poverty, and technology." }
    ],
    curriculum: [
      { title: "Cambridge Secondary (IGCSE)", desc: "General certificate syllabus for forms 3 and 4, ensuring broad academic preparation.", highlights: ["Internationally recognized certificates", "Rigorous practical training", "Preparation for Advanced Levels"] },
      { title: "Cambridge Advanced Levels (AS & A)", desc: "Two-year pathway for university entrance, requiring detailed subject focus.", highlights: ["In-depth study of selected topics", "Required for global science programs", "Research-oriented projects"] }
    ],
    results: [
      { year: "2025", oLevelPass: "98.2% (IGCSE)", aLevelPass: "97.5% (A-Level)", universityPlacement: "96%" },
      { year: "2024", oLevelPass: "97.5% (IGCSE)", aLevelPass: "96.2% (A-Level)", universityPlacement: "93%" }
    ],
    library: {
      title: "Bilingual Resource Center & Library",
      desc: "Fully digital catalog giving students credentials to access Cambridge research libraries and Alliance Française databases.",
      sections: ["Cambridge IGCSE Guides", "International Science Journals", "French DALF Study Materials", "University Admission Portals"]
    },
    sports: [
      { name: "Golf & Tennis Academy", desc: "Professional sports training on school greens and hardcourt tennis bays.", achievements: "Bilateral sports trophies with regional academies" },
      { name: "Swimming Practice", desc: "Focused speed exercises and stroke mechanics in our semi-olympic pools.", achievements: "Outstanding performance awards in regional inter-school meets" }
    ],
    clubs: [
      { name: "Model United Nations (MUN)", desc: "Debating international policy, mimicking the General Assembly, and drafting resolutions.", achievements: "Hosted the Zvishavane MUN Conference (2025)" },
      { name: "Toastmasters Youth Gavel Club", desc: "Practicing prepared speaking, evaluation, and impromptu speeches.", achievements: "Top speakers certified by international representatives" }
    ],
    events: [
      { title: "Cambridge IGCSE Practice Exams", date: "July 6, 2026", time: "08:30 AM", location: "Main Hall", category: "Academics" },
      { title: "Alliance Française French Day", date: "July 28, 2026", time: "11:00 AM", location: "Auditorium", category: "Events" }
    ],
    gallery: [
      { name: "Physics Lab Assembly", img: "/images/science_lab_gallery.png", category: "Laboratories" },
      { name: "Golf Academy practice", img: "/images/golf_gallery.png", category: "Golf" },
      { name: "Cambridge Lecture Room", img: "/images/classrooms_gallery.png", category: "Classrooms" },
    ],
    downloads: [
      { name: "Cambridge Admission Prospectus 2026", size: "2.1 MB", type: "PDF" },
      { name: "Cambridge Fee Structure & Deposit Policies", size: "950 KB", type: "PDF" },
      { name: "DELF French Certification Registration Guide", size: "1.2 MB", type: "PDF" }
    ],
    calendar: [
      { event: "Schools Open - Cambridge Track", date: "May 12, 2026", type: "Academic" },
      { event: "Cambridge Mock Exam Session", date: "July 6, 2026", type: "Exams" },
      { event: "Cambridge Winter Closing", date: "August 6, 2026", type: "Holiday" }
    ],
    testimonials: [
      { quote: "The Cambridge track combined with French immersion at Errymaple International School is outstanding. My son transitioned seamlessly to study engineering in Canada.", author: "Dr. David Jenkins", role: "Dean of Admissions Liaison" },
      { quote: "Participating in MUN and Toastmasters gavels gave me the confidence to present my research projects. Receiving Cambridge Learner awards was the highlight of my A-Levels.", author: "Amina Gumbo", role: "Alumni (Class of 2024, now at Oxford)" }
    ],
    landingImages: {
      classroom: "/images/classrooms_international.jpg",
      sports: "/images/sports_international.jpg",
      stem: "/images/stem_international.jpg",
      leadership: "/images/leadership_international.jpg"
    }
  }
};
