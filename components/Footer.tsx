import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-slate-950 text-slate-100 border-t border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-800 shadow-lg bg-slate-900 flex items-center justify-center p-0.5">
                <img src="/images/egs_logo.jpg" alt="Errymaple Logo" className="h-full w-full object-contain rounded-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider uppercase font-serif text-white leading-tight">
                  Errymaple
                </span>
                <span className="text-[10px] tracking-widest text-school-gold font-bold uppercase leading-none">
                  Group of Schools
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A family of premier institutions dedicated to providing quality, holistic, and skills-oriented education. Building future leaders through academic excellence, innovation, and character.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
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
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-school-blue hover:border-school-blue transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: School Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-school-gold">
              Our Institutions
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="https://high.errymapletrustschool.ac.zw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-school-gold flex items-center gap-1.5 transition-colors group"
                >
                  <span>Errymaple High School</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://junior.errymapletrustschool.ac.zw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-school-gold flex items-center gap-1.5 transition-colors group"
                >
                  <span>Errymaple Junior School</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://international.errymapletrustschool.ac.zw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-school-gold flex items-center gap-1.5 transition-colors group"
                >
                  <span>Errymaple International School</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-school-gold">
              Inquiries
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-school-gold shrink-0" />
                <span>+263 77 699 4154 / +263 77 553 9914</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">High School</span>
                    <a href="mailto:errymaple@errymaplehigh.co.zw" className="hover:text-white transition-colors text-xs sm:text-sm">
                      errymaple@errymaplehigh.co.zw
                    </a>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Junior School</span>
                    <a href="mailto:errymaplejunior@gmail.com" className="hover:text-white transition-colors text-xs sm:text-sm">
                      errymaplejunior@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">International School</span>
                    <a href="mailto:errymaple@live.com" className="hover:text-white transition-colors text-xs sm:text-sm">
                      errymaple@live.com
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-school-gold">
              Campuses
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">High School</span>
                  <span className="text-xs">1474 Makwasha, Zvishavane</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Junior School</span>
                  <span className="text-xs">1 Musuki Plots, Zvishavane</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-300 font-bold uppercase tracking-wider">International School</span>
                  <span className="text-xs">1699 Musuki Plots, Zvishavane</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p>© {currentYear} Errymaple Group of Schools. All rights reserved.</p>
            <p className="text-slate-600 text-[10px] tracking-wider uppercase font-semibold">Designed By Errymaple Group of Schools ICT Department</p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
