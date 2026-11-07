import { Link } from "wouter";
import { Globe, GitFork, Bot, Layers, ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#08090D] overflow-hidden border-t border-[#252938]">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#8B5CF6]/5 to-transparent" />
      </div>

      <div className="atomest-container pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex" aria-label="Atomest Home">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center font-bold text-white text-base shadow-md shadow-[#8B5CF6]/30 group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-xl font-display tracking-tight text-[#F5F6FA]">
                  ATOMEST
                </span>
                <span className="text-[9px] font-mono text-[#8B5CF6] uppercase tracking-wider font-semibold">
                  AI Solutions
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A0A5B5] max-w-sm leading-relaxed">
              We build intelligent websites, powerful automations and AI systems that help ambitious businesses operate smarter and grow faster.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C4B5FD]">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              <span>Production-grade engineering & zero data retention standard</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F5F6FA] uppercase tracking-wider text-xs">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-[#A0A5B5]">
              <li>
                <Link href="/solutions/websites" className="hover:text-white transition-colors">
                  AI Website Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/automation" className="hover:text-white transition-colors">
                  AI Automation Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/agents" className="hover:text-white transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/solutions/products" className="hover:text-white transition-colors">
                  AI Products & Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F5F6FA] uppercase tracking-wider text-xs">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#A0A5B5]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Atomest
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <a href="mailto:hello@atomest.com" className="hover:text-white transition-colors">
                  hello@atomest.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F5F6FA] uppercase tracking-wider text-xs">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-[#A0A5B5]">
              <li>
                <span className="cursor-default">Zero-Data Retention</span>
              </li>
              <li>
                <span className="cursor-default">SOC2 Ready Architecture</span>
              </li>
              <li>
                <span className="cursor-default">Confidentiality & Mutual NDA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C1F2B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0A5B5]">
          <p>
            &copy; {currentYear} Atomest Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px]">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
