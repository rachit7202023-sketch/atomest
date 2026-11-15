import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ChevronDown,
  Globe,
  GitFork,
  Bot,
  Menu,
  ArrowRight,
  Phone,
  Cpu,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
        setIsSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsSolutionsOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  const solutions = [
    {
      title: "AI Website Solutions",
      description: "High-performance digital flagships & lead funnels",
      href: "/solutions/websites",
      icon: Globe,
    },
    {
      title: "AI Automation Solutions",
      description: "Autonomous data, CRM & communication pipelines",
      href: "/solutions/automation",
      icon: GitFork,
    },
    {
      title: "AI Agents",
      description: "Grounded business assistants & copilots",
      href: "/solutions/agents",
      icon: Bot,
    },
  ];

  const serviceItems = [
    {
      title: "AI Voice Receptionist",
      description: "24/7 intelligent call handling & booking",
      href: "/services/ai-voice-receptionist",
      icon: Phone,
    },
    {
      title: "Lead Automation",
      description: "Instant capture, qualification & CRM sync",
      href: "/services/lead-automation",
      icon: GitFork,
    },
    {
      title: "CRM & Workflow Automation",
      description: "Connect apps & automate operations",
      href: "/services/crm-workflow-automation",
      icon: Cpu,
    },
    {
      title: "AI Customer Support",
      description: "Grounded 24/7 support assistant",
      href: "/services/ai-customer-support",
      icon: Bot,
    },
    {
      title: "Premium Business Websites",
      description: "High-converting web platforms",
      href: "/services/premium-business-websites",
      icon: Globe,
    },
  ];

  return (
    <nav
      className="fixed top-0 inset-x-0 z-[60] bg-slate-950/80 backdrop-blur-[20px] border-b border-slate-800/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="atomest-container h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Atomest Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[1.1rem] tracking-tight text-slate-50">
                ATOMEST
              </span>
              <span className="text-[9px] font-mono text-indigo-400 tracking-wider uppercase font-semibold">
                AI Automation Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-5 text-xs font-medium">
            <Link
              href="/"
              className={`transition-colors py-1 ${
                isActive("/") && location === "/" ? "text-slate-50" : "text-slate-400 hover:text-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen((p) => !p)}
                className={`flex items-center gap-1.5 transition-colors py-1 ${
                  isActive("/services") || location.startsWith("/services/")
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-50"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? { duration: 0.01 } : { duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50"
                  >
                    <div className="px-3 py-2 text-[10px] font-mono text-indigo-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                      Service Divisions
                    </div>
                    <div className="space-y-0.5">
                      {serviceItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group text-left"
                            onClick={setIsServicesOpen.bind(null, false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white shrink-0 mt-0.5 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-50 group-hover:text-white transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-slate-400 leading-snug">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                      <div className="pt-2 px-3">
                        <Link
                          href="/services"
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800/50 transition-colors text-[11px] font-mono text-indigo-400 hover:text-indigo-300"
                          onClick={setIsServicesOpen.bind(null, false)}
                        >
                          View all services
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsSolutionsOpen((p) => !p)}
                className={`flex items-center gap-1.5 transition-colors py-1 ${
                  isActive("/solutions")
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-50"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSolutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? { duration: 0.01 } : { duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50"
                  >
                    <div className="px-3 py-2 text-[10px] font-mono text-indigo-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                      Technology Divisions
                    </div>
                    <div className="space-y-0.5">
                      {solutions.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group text-left"
                            onClick={setIsSolutionsOpen.bind(null, false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white shrink-0 mt-0.5 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-50 group-hover:text-white transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-slate-400 leading-snug">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/work"
              className={`transition-colors py-1 ${
                isActive("/work") ? "text-slate-50" : "text-slate-400 hover:text-slate-50"
              }`}
            >
              Work
            </Link>

            <Link
              href="/products"
              className={`transition-colors py-1 ${
                isActive("/products") ? "text-slate-50" : "text-slate-400 hover:text-slate-50"
              }`}
            >
              Products
            </Link>

            <Link
              href="/about"
              className={`transition-colors py-1 ${
                isActive("/about") ? "text-slate-50" : "text-slate-400 hover:text-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`transition-colors py-1 ${
                isActive("/contact") ? "text-slate-50" : "text-slate-400 hover:text-slate-50"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right Action: Let's Talk CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex atomest-btn-primary items-center gap-2 text-xs py-2 px-4"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Navigation Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-50 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[360px] bg-slate-950 border-l border-slate-800 p-6 text-slate-50"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? { duration: 0.01 } : { duration: 0.2, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                    A
                  </div>
                  <span className="font-display font-bold text-base text-slate-50">ATOMEST</span>
                </div>

                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                    Navigation
                  </div>
                  <div className="flex flex-col space-y-2 text-sm">
                    <Link href="/" className="py-1 text-slate-400 hover:text-white transition-colors">
                      Home
                    </Link>
                    <Link href="/services" className="py-1 text-slate-400 hover:text-white transition-colors">
                      Services
                    </Link>
                    <Link href="/work" className="py-1 text-slate-400 hover:text-white transition-colors">
                      Work / Portfolio
                    </Link>
                    <Link href="/products" className="py-1 text-slate-400 hover:text-white transition-colors">
                      Digital Products
                    </Link>
                    <Link href="/about" className="py-1 text-slate-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                    <Link href="/contact" className="py-1 text-slate-400 hover:text-white transition-colors">
                      Contact & Consultation
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                    Solutions
                  </div>
                  <div className="space-y-2">
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-indigo-400" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <Link
                    href="/contact"
                    className="atomest-btn-primary flex items-center justify-center gap-2 w-full text-xs py-3"
                  >
                    <span>Let's Talk</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
