import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Globe, GitFork, Bot, Layers, Sparkles, Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
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
    {
      title: "AI Products",
      description: "Proprietary software pipeline & waitlist",
      href: "/solutions/products",
      icon: Layers,
    },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#08090D]/85 backdrop-blur-xl border-b border-[#252938]" role="navigation" aria-label="Main navigation">
      <div className="atomest-container h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Atomest Home">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center font-bold text-white text-base shadow-md shadow-[#8B5CF6]/30 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-[1.1rem] font-display tracking-tight text-[#F5F6FA]">
                ATOMEST
              </span>
              <span className="text-[9px] font-mono text-[#8B5CF6] tracking-wider uppercase font-semibold">
                Digital Solutions Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium">
            <Link
              href="/"
              className={`transition-colors py-1 ${
                isActive("/") && location === "/" ? "text-[#F5F6FA]" : "text-[#A0A5B5] hover:text-[#F5F6FA]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/services"
              className={`transition-colors py-1 ${
                isActive("/services") ? "text-[#F5F6FA]" : "text-[#A0A5B5] hover:text-[#F5F6FA]"
              }`}
            >
              Services
            </Link>

            {/* Solutions Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                className={`flex items-center gap-1 transition-colors py-1 ${
                  isActive("/solutions") ? "text-[#F5F6FA]" : "text-[#A0A5B5] hover:text-[#F5F6FA]"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`} />
              </button>

              {isSolutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#10121A] border border-[#252938] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[10px] font-mono text-[#8B5CF6] uppercase tracking-wider border-b border-[#1C1F2B] mb-1">
                    Technology Divisions
                  </div>
                  <div className="space-y-1">
                    {solutions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#151824] transition-colors group text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white shrink-0 transition-colors mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#F5F6FA] group-hover:text-white transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-[#A0A5B5] leading-snug">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/work"
              className={`transition-colors py-1 ${
                isActive("/work") ? "text-[#F5F6FA]" : "text-[#A0A5B5] hover:text-[#F5F6FA]"
              }`}
            >
              Work
            </Link>

            <Link
              href="/about"
              className={`transition-colors py-1 ${
                isActive("/about") ? "text-[#F5F6FA]" : "text-[#A0A5B5] hover:text-[#F5F6FA]"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`transition-colors py-1 ${
                isActive("/contact") ? "text-[#F5F6FA]" : "text-[#A0A5B5] hover:text-[#F5F6FA]"
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
                className="md:hidden p-2 rounded-xl bg-[#151824] border border-[#252938] text-[#F5F6FA] hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-[#08090D] border-l border-[#252938] p-6 text-[#F5F6FA]">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2 pb-4 border-b border-[#252938]">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center font-bold text-white text-xs">
                    A
                  </div>
                  <span className="font-display font-bold text-base text-[#F5F6FA]">ATOMEST</span>
                </div>

                <div className="space-y-3">
                  <div className="text-[11px] font-mono uppercase text-[#8B5CF6] tracking-wider">
                    Navigation
                  </div>
                  <div className="flex flex-col space-y-2 text-sm">
                    <Link href="/" className="py-1 text-[#A0A5B5] hover:text-white transition-colors">
                      Home
                    </Link>
                    <Link href="/services" className="py-1 text-[#A0A5B5] hover:text-white transition-colors">
                      Services
                    </Link>
                    <Link href="/work" className="py-1 text-[#A0A5B5] hover:text-white transition-colors">
                      Work
                    </Link>
                    <Link href="/about" className="py-1 text-[#A0A5B5] hover:text-white transition-colors">
                      About Us
                    </Link>
                    <Link href="/contact" className="py-1 text-[#A0A5B5] hover:text-white transition-colors">
                      Contact & Consultation
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#1C1F2B]">
                  <div className="text-[11px] font-mono uppercase text-[#8B5CF6] tracking-wider">
                    Solutions
                  </div>
                  <div className="space-y-2">
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 py-1.5 text-xs text-[#A0A5B5] hover:text-white transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-[#8B5CF6]" />
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
