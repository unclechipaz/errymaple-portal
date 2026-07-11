"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";

interface FooterProps {
  schoolSlug?: SchoolSlug;
}

export default function HighSchoolFooter({ schoolSlug: propSchoolSlug }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const params = useParams();

  // Extract the active school slug from the params, pathname or prop
  const schoolSlug = propSchoolSlug || (params?.school || pathname.split("/")[1] || "high-school") as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug] || schoolsData["high-school"];

  const isJuniorPath = schoolSlug === "junior-school" && pathname.startsWith("/junior");
  const hasPrefix = pathname.startsWith(`/${schoolSlug}`) || isJuniorPath;
  const getLink = (href: string) => {
    if (isJuniorPath) {
      return href.replace("/junior-school", "/junior");
    }
    if (hasPrefix) {
      return href;
    }
    const stripped = href.replace(`/${schoolSlug}`, "");
    return stripped === "" ? "/" : stripped;
  };

  return (
    <footer className="bg-slate-950 text-slate-100 border-t border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          
          {/* Column 1: Brand & Backlink to Group */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-800 shadow-lg bg-slate-900 flex items-center justify-center p-0.5">
                <img src={schoolInfo.logo} alt="Errymaple Logo" className="h-full w-full object-contain rounded-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider uppercase font-serif text-white leading-tight">
                  Errymaple
                </span>
                <span className="text-[10px] tracking-widest text-school-gold font-bold uppercase leading-none">
                  {schoolInfo.shortName}
                </span>
              </div>
            </div>
            <p className="text-slate-450 text-xs sm:text-sm leading-relaxed">
              {schoolInfo.aboutText} Shaping future leaders through academic excellence, tech innovation, and moral character.
            </p>
            
            {/* Back to Group Portal Link */}
            <div className="pt-2">
              <Link
                href={hasPrefix ? "/" : "https://errymaplegroup.ac.zw"}
                className="inline-flex items-center gap-2 text-xs font-bold text-school-gold hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Return to Group Portal</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-school-gold">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm text-slate-400">
              <li><Link href={getLink(`/${schoolSlug}`)} className="hover:text-school-gold transition-colors">Home</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/about/history`)} className="hover:text-school-gold transition-colors">History</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/about/leadership`)} className="hover:text-school-gold transition-colors">Leadership</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/academics/curriculum`)} className="hover:text-school-gold transition-colors">Curriculum</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/academics/results`)} className="hover:text-school-gold transition-colors">Results</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/admissions/apply`)} className="hover:text-school-gold transition-colors">Apply</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/student-life/sports`)} className="hover:text-school-gold transition-colors">Sports</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/student-life/gallery`)} className="hover:text-school-gold transition-colors">Gallery</Link></li>
              <li><Link href={getLink(`/${schoolSlug}/contact`)} className="hover:text-school-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Inquiries */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-school-gold">
              Inquiries
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <Phone className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <span className="text-xs sm:text-sm">{schoolInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Admissions</span>
                  <a href={`mailto:${schoolInfo.email}`} className="hover:text-white transition-colors text-xs sm:text-sm break-all">
                    {schoolInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3 pt-2">
                {[
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Address */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-school-gold">
              Location
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Campus Address</span>
                  <span className="text-xs leading-relaxed block mt-1">
                    {schoolInfo.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p>© {currentYear} {schoolInfo.name}. All rights reserved.</p>
            <p className="text-slate-600 text-[10px] tracking-wider uppercase font-semibold">Designed By Errymaple Group of Schools ICT Department</p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
