import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, Lock } from "lucide-react";

export default function Privacy() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Atomest</title>
        <meta
          name="description"
          content="Atomest Privacy Policy: how we collect, use, and protect your personal information when you contact us or use our services."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        <section className="atomest-section pt-8 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mx-auto">
              <div className="atomest-badge-indigo mb-4 inline-flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Privacy Policy</span>
              </div>
              <h1 className="atomest-section-title text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Privacy Policy
              </h1>
              <p className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-8">
                Effective date: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <div className="space-y-6 text-slate-400 leading-relaxed text-sm sm:text-base">
                <p>
                  Atomest Technologies ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and protect information when you contact us through our website.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">1. Information We Collect</h2>
                <p>
                  When you submit our contact or enquiry form, we collect: full name, email address, company name (optional), website (optional), budget range, project description, and the service area you're interested in. We do not collect sensitive personal data.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">2. How We Use Your Information</h2>
                <p>
                  We use your information to: respond to your enquiry, scope and quote your project, deliver services, and send occasional service-related updates. We never sell your data to third parties.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">3. Data Storage & Security</h2>
                <p>
                  Enquiries are stored in our secure Supabase database with row-level security enabled. Access is restricted to authorized Atomest personnel only. We follow a zero-data-retention standard for client project data once engagement ends, unless otherwise agreed.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">4. Sharing & Disclosure</h2>
                <p>
                  We do not share your personal information with third parties except as required by law or with your explicit consent (for example, to integrate with a CRM you specify).
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">5. Your Rights</h2>
                <p>
                  You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:hello@atomest.com" className="text-indigo-400 hover:underline font-mono">hello@atomest.com</a>.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">6. Cookies & Analytics</h2>
                <p>
                  Our site may use analytics to improve your experience. No personally identifiable information is tracked without your consent.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">7. Contact Us</h2>
                <p>
                  Questions about this policy? Contact us at <a href="mailto:hello@atomest.com" className="text-indigo-400 hover:underline font-mono">hello@atomest.com</a>.
                </p>

                <div className="mt-8 p-4 rounded-xl border border-slate-800 bg-slate-900 text-xs text-slate-400">
                  © {currentYear} Atomest Technologies. All rights reserved.
                </div>
              </div>

              <div className="mt-12 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <Link href="/" className="text-xs font-mono uppercase text-indigo-400 hover:text-indigo-300 transition-colors">
                  Return to homepage
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
