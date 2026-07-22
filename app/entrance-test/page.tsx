"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Clock, CheckCircle2, ShieldCheck, 
  ArrowRight, ArrowLeft, RefreshCw, Printer, BookOpen, User, Phone, Building2, MapPin, AlertTriangle, AlertCircle, ShieldAlert, FileText
} from "lucide-react";

// --- READING COMPREHENSION PASSAGE ---

const lanternFestivalPassage = {
  title: "The Lantern Festival of Rowanvale",
  paragraphs: [
    { num: 1, text: "At the end of every harvest season, the small town of Rowanvale came alive with the annual Lantern Festival. Families spent weeks crafting paper lanterns in vibrant shades of gold, crimson, and sapphire. Some children folded their lanterns into intricate boat shapes so they could float them gently down the Silver River." },
    { num: 2, text: "Maria, a young girl who had recently moved to Rowanvale from a distant village, stood quietly near the riverbank. She felt shy among the gathered crowds and clutched her simple, unpainted star-shaped lantern tightly. An elderly resident named Mrs. Okafor noticed Maria standing alone and kindly invited her to sit alongside her family by the water's edge." },
    { num: 3, text: "As dusk settled over the town, a heavy bell echoed from the old stone bridge. At that moment, hundreds of lanterns were ignited simultaneously. The river immediately transformed into a glowing ribbon of light. Maria watched with wonder as the warm flames illuminated the faces of laughing children and proud parents. For the first time since moving, she felt a comforting sense of belonging." },
    { num: 4, text: "\"The festival is not just about celebration,\" Mrs. Okafor explained gently to Maria. \"It was started over a century ago to give thanks for a fruitful harvest and to welcome new neighbors into our community. The river carries the light forward, just as our town carries its traditions into the future.\" Smiling, Maria launched her star lantern onto the water, watching it drift gracefully alongside the others." }
  ]
};

// --- QUESTION DATA SOURCE ---

interface Question {
  id: number;
  subject: "Mathematics" | "English";
  section: string;
  question: string;
  options: string[];
  correct: number;
  hasPassage?: boolean;
}

const rawEnglishQuestions: Question[] = [
  { id: 201, subject: "English", section: "Reading Comprehension", question: "Where was the Lantern Festival held, and at what time of year?", options: ["In Harare at Christmas", "In Rowanvale at the end of harvest season", "In Zvishavane during spring", "On a mountain in Nyanga during winter"], correct: 1, hasPassage: true },
  { id: 202, subject: "English", section: "Reading Comprehension", question: "Why did some children fold their lanterns into boat shapes?", options: ["To make them float on water", "Because paper was scarce", "To sell them to visitors", "It was required by town rules"], correct: 0, hasPassage: true },
  { id: 203, subject: "English", section: "Reading Comprehension", question: "How did Maria feel at the start of the festival?", options: ["Excited and loud", "Shy among strangers", "Angry at her family", "Bored and sleepy"], correct: 1, hasPassage: true },
  { id: 204, subject: "English", section: "Reading Comprehension", question: "What kind action did Mrs. Okafor take toward Maria?", options: ["She gave her money", "She invited her to sit with her family", "She built a lantern for her", "She scolded her for being quiet"], correct: 1, hasPassage: true },
  { id: 205, subject: "English", section: "Reading Comprehension", question: "What happened when the bell rang from the stone bridge?", options: ["The festival ended", "Everyone lit their lanterns at once", "Fireworks exploded", "The crowd went home"], correct: 1, hasPassage: true },
  { id: 206, subject: "English", section: "Reading Comprehension", question: "Which word in paragraph 3 means 'surprise and admiration'?", options: ["Wonder", "Belonged", "Simple", "Drifted"], correct: 0, hasPassage: true },
  { id: 207, subject: "English", section: "Reading Comprehension", question: "What were the two historical purposes of the festival?", options: ["Giving thanks for harvest and welcoming newcomers", "Raising taxes and selecting leaders", "Racing boats and trading goods", "Lighting roads and warning villagers"], correct: 0, hasPassage: true },
  { id: 208, subject: "English", section: "Reading Comprehension", question: "What did Mrs. Okafor mean by 'The river carries the light forward'?", options: ["The town progresses and cares for its people together", "Water travels fast down the stream", "Paper lanterns are dangerous", "Old traditions should be stopped"], correct: 0, hasPassage: true },
  { id: 209, subject: "English", section: "Reading Comprehension", question: "How did Maria's feelings change by the end of the story?", options: ["She felt lonely and isolated", "She felt a sense of belonging and made friends", "She wanted to move back to her old town", "She decided not to make lanterns next year"], correct: 1, hasPassage: true },
  { id: 210, subject: "English", section: "Reading Comprehension", question: "What is the main lesson of the passage?", options: ["Living in a town requires lots of money", "Sharing traditions helps new places feel like home", "Lanterns should only be shaped like stars", "Rivers are dangerous at night"], correct: 1, hasPassage: true },
  { id: 211, subject: "English", section: "Language Structures", question: "By the time we arrived at the cinema, the film _______ (already / start).", options: ["already started", "had already started", "has already starting", "was already start"], correct: 1 },
  { id: 212, subject: "English", section: "Language Structures", question: "Maria's family moved into _______ old house near _______ river.", options: ["a / a", "an / the", "the / a", "an / an"], correct: 1 },
  { id: 213, subject: "English", section: "Language Structures", question: "Passive voice of: 'The children made the lanterns themselves.'", options: ["The lanterns were made by the children themselves.", "The lanterns are made by children.", "Children were making lanterns.", "Lanterns made the children."], correct: 0 },
  { id: 214, subject: "English", section: "Language Structures", question: "Mrs. Okafor invited Maria to sit _______ her family.", options: ["with", "at", "on", "under"], correct: 0 },
  { id: 215, subject: "English", section: "Language Structures", question: "Correct form of word: 'The festival has a long and _______ (tradition) history.'", options: ["traditioned", "traditional", "traditionally", "traditioning"], correct: 1 },
  { id: 216, subject: "English", section: "Language Structures", question: "Combine: 'Maria felt shy. She did not know anyone.'", options: ["Maria felt shy because she did not know anyone.", "Maria felt shy although she knew everyone.", "Maria felt shy so she knew everyone.", "Maria felt shy unless she knew anyone."], correct: 0 },
  { id: 217, subject: "English", section: "Language Structures", question: "Neither the teacher nor the students _______ ready for the fire drill.", options: ["was", "were", "is", "being"], correct: 1 },
  { id: 218, subject: "English", section: "Language Structures", question: "Correct the error: 'She don't like walking home alone.'", options: ["She doesn't like walking home alone.", "She not like walking home alone.", "She isn't like walking home alone.", "She don't liked walking home alone."], correct: 0 },
  { id: 219, subject: "English", section: "Language Structures", question: "The woman _______ helped Maria was named Mrs. Okafor.", options: ["which", "who", "whom", "whose"], correct: 1 },
  { id: 220, subject: "English", section: "Language Structures", question: "Reported speech of: Mrs. Okafor said, 'The river carries the light forward.'", options: ["Mrs. Okafor said that the river carried the light forward.", "Mrs. Okafor says that the river carry light.", "Mrs. Okafor told that the river is carrying light.", "Mrs. Okafor asked if the river carried light."], correct: 0 },
  { id: 221, subject: "English", section: "Language Structures", question: "This year's festival was _______ (good) than last year's.", options: ["gooder", "better", "best", "more good"], correct: 1 },
  { id: 222, subject: "English", section: "Language Structures", question: "Part of speech of 'softly' in: 'The lanterns floated softly down the river.'", options: ["Noun", "Verb", "Adjective", "Adverb"], correct: 3 },
  { id: 223, subject: "English", section: "Language Structures", question: "You _______ always ask an adult for help if you feel lost.", options: ["should", "might", "could", "would"], correct: 0 },
  { id: 224, subject: "English", section: "Language Structures", question: "Correctly punctuated sentence:", options: ['"The lanterns," she said, "are ready for the festival tonight."', '"the lanterns she said are ready for the festival tonight"', 'The lanterns she said, are ready for the festival tonight.', '"The lanterns she said are ready for the festival tonight"'], correct: 0 },
  { id: 225, subject: "English", section: "Language Structures", question: "Correct subject-verb agreement:", options: ["Each of the students was given a paper lantern.", "Each of the students were given a paper lantern.", "Each of the students are given a paper lantern.", "Each of the students have been given a paper lantern."], correct: 0 },
];

const rawMathQuestions: Question[] = [
  { id: 101, subject: "Mathematics", section: "Section A: Number", question: "456 + 789 = ?", options: ["1145", "1235", "1245", "1345"], correct: 2 },
  { id: 102, subject: "Mathematics", section: "Section A: Number", question: "902 − 356 = ?", options: ["546", "556", "646", "536"], correct: 0 },
  { id: 103, subject: "Mathematics", section: "Section A: Number", question: "24 × 15 = ?", options: ["340", "350", "360", "370"], correct: 2 },
  { id: 104, subject: "Mathematics", section: "Section A: Number", question: "144 ÷ 12 = ?", options: ["11", "12", "13", "14"], correct: 1 },
  { id: 105, subject: "Mathematics", section: "Section A: Number", question: "Which of the following is the largest number?", options: ["0.45", "0.5", "0.405", "0.54"], correct: 3 },
  { id: 106, subject: "Mathematics", section: "Section A: Number", question: "Round 3872 to the nearest hundred.", options: ["3800", "3870", "3900", "4000"], correct: 2 },
  { id: 107, subject: "Mathematics", section: "Section A: Number", question: "−8 + 15 = ?", options: ["−23", "−7", "7", "23"], correct: 2 },
  { id: 108, subject: "Mathematics", section: "Section A: Number", question: "−5 × −3 = ?", options: ["−15", "−8", "8", "15"], correct: 3 },
  { id: 109, subject: "Mathematics", section: "Section A: Number", question: "What is 7²?", options: ["14", "35", "49", "56"], correct: 2 },
  { id: 110, subject: "Mathematics", section: "Section A: Number", question: "Find the value of √81.", options: ["7", "8", "9", "10"], correct: 2 },
  { id: 111, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "1/2 + 1/4 = ?", options: ["1/6", "2/6", "3/4", "3/8"], correct: 2 },
  { id: 112, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "3/5 of 40 = ?", options: ["20", "22", "24", "26"], correct: 2 },
  { id: 113, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "Convert 0.75 to a fraction in its simplest form.", options: ["1/4", "1/2", "3/4", "7/10"], correct: 2 },
  { id: 114, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "Convert 3/8 to a decimal.", options: ["0.325", "0.375", "0.38", "0.425"], correct: 1 },
  { id: 115, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "20% of 150 = ?", options: ["20", "25", "30", "35"], correct: 2 },
  { id: 116, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "Express 45 out of 60 as a percentage.", options: ["60%", "65%", "70%", "75%"], correct: 3 },
  { id: 117, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "Simplify the fraction 18/24.", options: ["2/3", "3/4", "4/5", "5/6"], correct: 1 },
  { id: 118, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "2 1/3 + 1 1/2 = ?", options: ["3 1/6", "3 5/6", "4 1/6", "3 2/3"], correct: 1 },
  { id: 119, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "Which of these fractions is the smallest?", options: ["1/3", "2/5", "3/8", "5/12"], correct: 0 },
  { id: 120, subject: "Mathematics", section: "Section B: Fractions & Decimals", question: "Increase 80 by 25%.", options: ["95", "100", "105", "110"], correct: 1 },
  { id: 121, subject: "Mathematics", section: "Section C: Ratio & Proportion", question: "Simplify the ratio 15 : 20.", options: ["2 : 3", "3 : 4", "4 : 5", "1 : 2"], correct: 1 },
  { id: 122, subject: "Mathematics", section: "Section C: Ratio & Proportion", question: "Share $60 in the ratio 2 : 3. What is the smaller share?", options: ["$20", "$24", "$30", "$36"], correct: 1 },
  { id: 123, subject: "Mathematics", section: "Section C: Ratio & Proportion", question: "5 pens cost $2.50. What is the cost of 8 pens?", options: ["$3.20", "$3.75", "$4.00", "$4.50"], correct: 2 },
  { id: 124, subject: "Mathematics", section: "Section C: Ratio & Proportion", question: "A map scale is 1 : 50 000. 3 cm on map represents what actual distance?", options: ["0.5 km", "1.5 km", "5 km", "15 km"], correct: 1 },
  { id: 125, subject: "Mathematics", section: "Section D: Algebra", question: "Simplify: 3x + 5x", options: ["8x", "8x²", "15x", "2x"], correct: 0 },
  { id: 126, subject: "Mathematics", section: "Section D: Algebra", question: "Solve: x + 7 = 15", options: ["x = 6", "x = 7", "x = 8", "x = 22"], correct: 2 },
  { id: 127, subject: "Mathematics", section: "Section D: Algebra", question: "Solve: 3x = 21", options: ["x = 6", "x = 7", "x = 8", "x = 63"], correct: 1 },
  { id: 128, subject: "Mathematics", section: "Section D: Algebra", question: "Expand: 2(x + 5)", options: ["2x + 5", "2x + 7", "2x + 10", "x + 10"], correct: 2 },
  { id: 129, subject: "Mathematics", section: "Section D: Algebra", question: "If y = 3x − 2 and x = 4, find y.", options: ["8", "9", "10", "11"], correct: 2 },
  { id: 130, subject: "Mathematics", section: "Section D: Algebra", question: "Simplify: 5a − 2a + 3a", options: ["4a", "6a", "8a", "10a"], correct: 1 },
  { id: 131, subject: "Mathematics", section: "Section E: Geometry", question: "The sum of the angles in a triangle is:", options: ["90°", "180°", "270°", "360°"], correct: 1 },
  { id: 132, subject: "Mathematics", section: "Section E: Geometry", question: "A square has sides of length 6 cm. Find its area.", options: ["12 cm²", "24 cm²", "30 cm²", "36 cm²"], correct: 3 },
  { id: 133, subject: "Mathematics", section: "Section E: Geometry", question: "Find perimeter of a rectangle with length 8 cm and width 5 cm.", options: ["13 cm", "18 cm", "26 cm", "40 cm"], correct: 2 },
  { id: 134, subject: "Mathematics", section: "Section E: Geometry", question: "Angles on a straight line add up to:", options: ["90°", "180°", "270°", "360°"], correct: 1 },
  { id: 135, subject: "Mathematics", section: "Section E: Geometry", question: "How many degrees are there in a right angle?", options: ["45°", "90°", "180°", "360°"], correct: 1 },
  { id: 136, subject: "Mathematics", section: "Section E: Geometry", question: "Convert 2.5 km to metres.", options: ["25 m", "250 m", "2 500 m", "25 000 m"], correct: 2 },
  { id: 137, subject: "Mathematics", section: "Section F: Statistics", question: "Find the mean of 4, 6, 8, 10, 12.", options: ["6", "7", "8", "9"], correct: 2 },
  { id: 138, subject: "Mathematics", section: "Section F: Statistics", question: "Find the mode of 3, 5, 5, 7, 9, 5, 2.", options: ["2", "3", "5", "7"], correct: 2 },
  { id: 139, subject: "Mathematics", section: "Section F: Statistics", question: "Find the median of 3, 7, 9, 2, 5.", options: ["3", "5", "7", "9"], correct: 1 },
  { id: 140, subject: "Mathematics", section: "Section F: Statistics", question: "Find the range of 12, 18, 7, 25, 10.", options: ["11", "15", "18", "25"], correct: 2 },
];

// Continuous Array: ENGLISH FIRST (Q1-Q25), then MATHEMATICS (Q26-Q65)
const allOrderedQuestions: Question[] = [...rawEnglishQuestions, ...rawMathQuestions];

export default function ContinuousOnlineEntranceTest() {
  const [stage, setStage] = useState<"welcome" | "instructions" | "exam" | "results">("welcome");
  
  // Registration Form Fields matching the screenshot UI
  const [candidateName, setCandidateName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [primarySchool, setPrimarySchool] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [activeQuestions, setActiveQuestions] = useState<Question[]>(allOrderedQuestions);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 120 minutes
  const [timeTaken, setTimeTaken] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Tab Security State
  const [warningCount, setWarningCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [lastWarningTime, setLastWarningTime] = useState(0);
  const [autoSubmittedBySecurity, setAutoSubmittedBySecurity] = useState(false);

  // Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleFinishExam();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Tab Switching Invigilation
  useEffect(() => {
    if (stage !== "exam") return;

    const triggerTabWarning = () => {
      const now = Date.now();
      if (now - lastWarningTime < 2500) return;
      setLastWarningTime(now);

      setWarningCount((prev) => {
        const nextCount = prev + 1;
        if (nextCount >= 3) {
          setShowWarningModal(false);
          setTimerActive(false);
          setAutoSubmittedBySecurity(true);
          setStage("results");
        } else {
          setShowWarningModal(true);
        }
        return nextCount;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerTabWarning();
      }
    };

    const handleBlur = () => {
      triggerTabWarning();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [stage, lastWarningTime]);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      alert("Please enter candidate's full name.");
      return;
    }
    setAgreedToTerms(false);
    setStage("instructions");
  };

  const handleBeginExam = () => {
    if (!agreedToTerms) return;
    setActiveQuestions(allOrderedQuestions); // Sequential Order: ALL English (Q1-Q25) first, then ALL Maths (Q26-Q65)
    setAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(7200);
    setTimeTaken(0);
    setWarningCount(0);
    setShowWarningModal(false);
    setAutoSubmittedBySecurity(false);
    setStage("exam");
    setTimerActive(true);
  };

  const handleOptionSelect = (qId: number, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFinishExam = () => {
    setTimerActive(false);
    setShowWarningModal(false);
    setStage("results");
  };

  // Score Calculations
  const totalQuestions = activeQuestions.length;
  let totalCorrect = 0;
  let mathCorrect = 0;
  let mathTotal = rawMathQuestions.length; // 40
  let englishCorrect = 0;
  let englishTotal = rawEnglishQuestions.length; // 25

  activeQuestions.forEach((q) => {
    const isCorrect = answers[q.id] === q.correct;
    if (isCorrect) {
      totalCorrect++;
      if (q.subject === "Mathematics") mathCorrect++;
      if (q.subject === "English") englishCorrect++;
    }
  });

  const overallPercentage = Math.round((totalCorrect / totalQuestions) * 100);
  const mathPercentage = Math.round((mathCorrect / mathTotal) * 100);
  const englishPercentage = Math.round((englishCorrect / englishTotal) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const getPlacementRecommendation = (pct: number) => {
    if (pct >= 80) return { title: "Strong Placement", desc: "Proceed directly to Form 1 Cambridge IGCSE track with distinction honors.", badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300" };
    if (pct >= 55) return { title: "Sound Placement", desc: "Proceed with targeted revision of core concepts during Term 1.", badgeClass: "bg-blue-100 text-blue-800 border-blue-300" };
    if (pct >= 30) return { title: "Developing Placement", desc: "Recommend bridging foundation support before standard Form 1 pace.", badgeClass: "bg-amber-100 text-amber-800 border-amber-300" };
    return { title: "Foundational Support Required", desc: "Recommend intensive remedial support and preliminary bridging modules.", badgeClass: "bg-rose-100 text-rose-800 border-rose-300" };
  };

  const recommendation = getPlacementRecommendation(overallPercentage);
  const currentQ = activeQuestions[currentQIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-50/30 text-slate-800 font-sans p-4 md:p-8 relative flex flex-col justify-center items-center">
      
      {/* SECURITY TAB WARNING MODAL */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border-2 border-rose-500 shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle className="w-9 h-9 animate-bounce" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full mb-2 border border-rose-200">
                  SECURITY WARNING {warningCount} OF 3
                </span>
                <h3 className="text-2xl font-black text-slate-900">Tab Switching Detected!</h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  You navigated away from the exam tab. Navigating away <strong>3 times</strong> will automatically end and submit your examination.
                </p>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs font-bold text-rose-900 flex items-center justify-between">
                <span>Warnings Used:</span>
                <span className="text-base text-rose-600 font-mono">{warningCount} / 3 Strikes</span>
              </div>

              <button
                onClick={() => setShowWarningModal(false)}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-rose-600/30"
              >
                I Understand & Resume Exam
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl mx-auto">
        
        {/* STAGE 1: CANDIDATE REGISTRATION CARD */}
        {stage === "welcome" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-200/90 p-8 md:p-10 shadow-2xl shadow-blue-950/10 relative overflow-hidden text-center"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950"></div>

            {/* Official Crest */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative w-36 h-36 mb-2">
                <Image 
                  src="/images/eis_crest.png" 
                  alt="Errymaple International School Crest" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-black tracking-wide text-[#031b4e]">
                ERRYMAPLE INTERNATIONAL SCHOOL
              </h1>
              <p className="text-xs font-bold text-amber-600 italic mt-1">
                "Dreamers, Believers, Achievers"
              </p>
              <div className="mt-2 inline-block px-3 py-1 bg-blue-50 text-blue-900 border border-blue-100 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                Online Entrance Examination • Cambridge Track
              </div>
            </div>

            {/* Title Header */}
            <div className="flex items-center justify-center gap-2 mb-6 border-t border-slate-100 pt-6">
              <ShieldCheck className="w-5 h-5 text-blue-900" />
              <h2 className="text-xl font-extrabold text-blue-950 tracking-tight">
                Candidate Registration
              </h2>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="space-y-5 text-left">
              
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Enter candidate's full name"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-100 transition-all text-sm shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Parent/Guardian Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Parent/Guardian Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input 
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="e.g. +263 77 123 4567"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-100 transition-all text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Field 3: Current Primary School */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Primary School
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    value={primarySchool}
                    onChange={(e) => setPrimarySchool(e.target.value)}
                    placeholder="Enter primary school name"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-100 transition-all text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Field 4: City / Town */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  City / Town
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    value={cityTown}
                    onChange={(e) => setCityTown(e.target.value)}
                    placeholder="Enter candidate's city/town"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-100 transition-all text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full mt-4 bg-[#031b4e] hover:bg-[#02143b] text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-blue-950/20 transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>Start Examination</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

            </form>
          </motion.div>
        )}

        {/* STAGE 2: EXAMINATION INSTRUCTIONS CARD */}
        {stage === "instructions" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-200/90 p-8 md:p-10 shadow-2xl shadow-blue-950/10 relative overflow-hidden space-y-6"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950"></div>

            {/* Header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Examination Instructions
              </h2>
              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                Welcome, <strong className="text-slate-900 uppercase font-black">{candidateName}</strong>. Please review the rules before beginning.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Card 1: Subjects & Question Format */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-blue-100 text-blue-900 rounded-xl mt-0.5 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Subjects & Question Format</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    The entrance exam contains multiple-choice questions covering <strong className="text-slate-900">English (Questions 1 – 25)</strong> followed directly by <strong className="text-slate-900">Mathematics (Questions 26 – 65)</strong>.
                  </p>
                </div>
              </div>

              {/* Card 2: Duration & Auto-Submission */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-blue-100 text-blue-900 rounded-xl mt-0.5 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Duration & Auto-Submission</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    You have <strong className="text-slate-900">120 minutes (2 hours)</strong> to complete the exam. A countdown timer remains visible at the top. The exam will submit automatically when the timer reaches zero.
                  </p>
                </div>
              </div>

              {/* Card 3: Autosave & Exam Integrity */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl mt-0.5 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800 text-base">Autosave & Exam Integrity</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Every answer choice is autosaved instantly. You can refresh or log back in to resume. However, <strong className="text-rose-600 font-bold">right-clicking, copying, pasting, and exiting the screen (tab switching) are strictly forbidden</strong>. Violating tab limits will flag or lock your exam session.
                  </p>
                </div>
              </div>

              {/* Amber Warning Box */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  Ensure you have a stable internet connection and are in a quiet room. Do not leave the browser tab once you start, or you will trigger cheating warnings.
                </p>
              </div>

            </div>

            {/* Checkbox Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 accent-[#031b4e] rounded mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium leading-relaxed group-hover:text-slate-900">
                  I have read the instructions and agree to sit the entrance examination under the security policies mentioned.
                </span>
              </label>
            </div>

            {/* Start Exam Now Button */}
            <button
              disabled={!agreedToTerms}
              onClick={handleBeginExam}
              className={`w-full font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 text-base ${
                agreedToTerms 
                  ? "bg-[#031b4e] hover:bg-[#02143b] text-white shadow-xl shadow-blue-950/20 cursor-pointer" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Start Exam Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </motion.div>
        )}

        {/* STAGE 3: CONTINUOUS EXAM RUNNER (ENGLISH FIRST Q1-Q25, THEN MATHS Q26-Q65) */}
        {stage === "exam" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 w-full max-w-3xl mx-auto">
            
            {/* Header Bar with Crest */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/images/eis_crest.png" alt="EIS Crest" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{candidateName}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      currentQ.subject === "English" ? "bg-indigo-100 text-indigo-900" : "bg-blue-100 text-blue-900"
                    }`}>
                      {currentQ.subject}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{currentQ.section}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
                  warningCount === 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"
                }`}>
                  Warnings: {warningCount} / 3
                </div>

                <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl text-amber-900 text-xs font-mono font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-900 to-indigo-700 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* READING COMPREHENSION PASSAGE BOX (Displayed for English Reading Questions 1-10) */}
            {currentQ.hasPassage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50/90 border-2 border-blue-200 rounded-3xl p-6 md:p-8 shadow-md space-y-4"
              >
                <div className="flex items-center gap-2.5 border-b border-blue-200/80 pb-3">
                  <FileText className="w-5 h-5 text-blue-900" />
                  <h4 className="font-extrabold text-blue-950 text-lg">
                    Reading Passage: {lanternFestivalPassage.title}
                  </h4>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-2 text-slate-800 text-sm leading-relaxed font-serif">
                  {lanternFestivalPassage.paragraphs.map((p) => (
                    <p key={p.num} className="bg-white/80 p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                      <strong className="text-blue-900 font-bold font-sans block mb-1">Paragraph {p.num}:</strong>
                      {p.text}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Question Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-10 shadow-xl space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>QUESTION {currentQIndex + 1} OF {activeQuestions.length}</span>
                <span>ANSWERED: {Object.keys(answers).length}/{activeQuestions.length}</span>
              </div>

              <p className="text-xl font-bold text-slate-900 leading-relaxed">{currentQ.question}</p>

              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  const optionLetters = ["A", "B", "C", "D"];
                  return (
                    <motion.button
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      key={idx}
                      onClick={() => handleOptionSelect(currentQ.id, idx)}
                      className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                        isSelected 
                          ? "bg-blue-50 border-blue-900 text-blue-950 font-bold shadow-md" 
                          : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                        isSelected ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {optionLetters[idx]}
                      </span>
                      <span className="text-base font-medium">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Nav Controls */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => prev - 1)}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold disabled:opacity-40 flex items-center gap-2 hover:bg-slate-50 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQIndex((prev) => prev + 1)}
                  className="px-7 py-3 bg-[#031b4e] hover:bg-[#02143b] text-white font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-950/20"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishExam}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-600/30"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Submit Examination</span>
                </button>
              )}
            </div>

            {/* Quick Grid Navigator grouped by Subject */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">65-Question Sequential Navigator</p>
                <div className="flex gap-3 text-[10px] font-bold">
                  <span className="text-indigo-700">English: Q1 – Q25</span>
                  <span className="text-blue-700">Maths: Q26 – Q65</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
                {activeQuestions.map((q, idx) => {
                  const isAns = answers[q.id] !== undefined;
                  const isCurr = currentQIndex === idx;
                  const isEnglish = q.subject === "English";
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                        isCurr 
                          ? "ring-4 ring-blue-100 bg-blue-900 text-white shadow-md" 
                          : isAns 
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                          : isEnglish
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100"
                          : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}

        {/* STAGE 4: OFFICIAL REPORT SLIP */}
        {stage === "results" && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 w-full max-w-3xl mx-auto">
            
            {autoSubmittedBySecurity && (
              <div className="bg-rose-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <AlertTriangle className="w-6 h-6 shrink-0 animate-bounce" />
                <div>
                  <h4 className="font-extrabold text-base">Automatic Submission Triggered</h4>
                  <p className="text-xs text-rose-100">This examination was automatically submitted due to 3 tab switching security violations.</p>
                </div>
              </div>
            )}

            {/* Official Report Slip Container */}
            <div id="report-slip" className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 space-y-8 text-center">
              
              {/* Official Logo Header */}
              <div className="flex flex-col items-center border-b-2 border-slate-900 pb-6">
                <div className="relative w-36 h-36 mb-2">
                  <Image src="/images/eis_crest.png" alt="Official EIS Crest" fill className="object-contain" priority />
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-wide text-[#031b4e]">
                  ERRYMAPLE INTERNATIONAL SCHOOL
                </h1>
                <p className="text-xs font-bold text-amber-600 italic mt-0.5">
                  "Dreamers, Believers, Achievers"
                </p>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mt-2">
                  Official Continuous Entrance Examination Report Slip
                </p>
                <div className="mt-2 inline-block px-4 py-1 bg-slate-100 border border-slate-300 rounded-full text-xs font-bold text-slate-700">
                  Cambridge IGCSE Track • Session 2026/2027
                </div>
              </div>

              {/* Candidate Info Details Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm text-left">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Candidate Name</span>
                  <span className="font-extrabold text-slate-900">{candidateName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Parent Contact</span>
                  <span className="font-extrabold text-slate-900">{parentPhone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Primary School</span>
                  <span className="font-extrabold text-slate-900">{primarySchool || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">City / Town</span>
                  <span className="font-extrabold text-slate-900">{cityTown || "N/A"}</span>
                </div>
              </div>

              {/* Subject Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-indigo-50/80 border border-indigo-200 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-700 uppercase">English Language Score (Q1-Q25)</span>
                    <h4 className="text-2xl font-black text-indigo-950 mt-1">{englishCorrect} / {englishTotal} points</h4>
                  </div>
                  <div className="text-2xl font-black text-indigo-700 bg-white px-4 py-2 rounded-xl border border-indigo-200 shadow-sm">
                    {englishPercentage}%
                  </div>
                </div>

                <div className="bg-blue-50/80 border border-blue-200 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase">Mathematics Score (Q26-Q65)</span>
                    <h4 className="text-2xl font-black text-blue-950 mt-1">{mathCorrect} / {mathTotal} points</h4>
                  </div>
                  <div className="text-2xl font-black text-blue-700 bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-sm">
                    {mathPercentage}%
                  </div>
                </div>
              </div>

              {/* Composite Performance Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl text-center flex flex-col justify-center shadow-md">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Total Score Obtained</span>
                  <div className="text-4xl font-black text-amber-400">{totalCorrect} <span className="text-lg text-slate-400 font-medium">/ 65</span></div>
                  <span className="text-xs text-slate-400 mt-1">Combined Points</span>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl text-center flex flex-col justify-center shadow-md">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Composite Performance</span>
                  <div className="text-4xl font-black text-emerald-400">{overallPercentage}%</div>
                  <span className="text-xs text-slate-400 mt-1">Overall Percentage</span>
                </div>

                <div className={`p-6 rounded-2xl border text-center flex flex-col justify-center shadow-md ${recommendation.badgeClass}`}>
                  <span className="text-xs font-bold uppercase tracking-wider mb-1">Placement Recommendation</span>
                  <div className="text-xl font-extrabold">{recommendation.title}</div>
                  <span className="text-xs mt-1 leading-snug font-medium">{recommendation.desc}</span>
                </div>
              </div>

              {/* Authentication Footnote */}
              <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-5 h-5 text-blue-900" />
                  <span>Verified & Authenticated by Errymaple Online Admissions System</span>
                </div>
                <span className="font-mono text-slate-400">Ref: ERRY-INT-REG-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>

            </div>

            {/* Action Triggers */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl transition-colors flex items-center gap-2 shadow-xl"
              >
                <Printer className="w-5 h-5" />
                <span>Print / Save Composite Report Slip (PDF)</span>
              </button>

              <button
                onClick={() => setStage("welcome")}
                className="px-7 py-3.5 bg-[#031b4e] hover:bg-[#02143b] text-white font-extrabold rounded-2xl transition-colors flex items-center gap-2 shadow-xl"
              >
                <RefreshCw className="w-5 h-5" />
                <span>New Registration</span>
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
