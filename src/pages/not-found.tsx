import { Link } from "wouter";
import { ArrowLeft, Compass } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Atomest</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        <section className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="max-w-lg w-full text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-6">
              <Compass className="w-8 h-8 text-[#8B5CF6]" />
            </div>

            {/* Code */}
            <div className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest mb-3">
              404 • Not Found
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#F5F6FA] mb-4 leading-tight">
              This page doesn't exist.
            </h1>

            <p className="text-sm sm:text-base text-[#A0A5B5] leading-relaxed mb-8 max-w-sm mx-auto">
              It may have been moved, removed, or never existed. Navigate back to explore Atomest's AI solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="atomest-btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <Link
                to="/contact"
                className="atomest-btn-secondary inline-flex items-center gap-2"
              >
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-10 pt-8 border-t border-[#1C1F2B]">
              <p className="text-xs text-[#646A80] mb-3 font-mono uppercase tracking-wider">Or explore</p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                <Link to="/solutions/automation" className="text-[#A0A5B5] hover:text-[#F5F6FA] transition-colors">
                  AI Automation
                </Link>
                <span className="text-[#252938]">•</span>
                <Link to="/solutions/websites" className="text-[#A0A5B5] hover:text-[#F5F6FA] transition-colors">
                  AI Websites
                </Link>
                <span className="text-[#252938]">•</span>
                <Link to="/solutions/agents" className="text-[#A0A5B5] hover:text-[#F5F6FA] transition-colors">
                  AI Agents
                </Link>
                <span className="text-[#252938]">•</span>
                <Link to="/solutions/products" className="text-[#A0A5B5] hover:text-[#F5F6FA] transition-colors">
                  AI Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
