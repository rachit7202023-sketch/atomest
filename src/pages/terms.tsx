import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, Lock } from "lucide-react";

export default function Terms() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Terms of Service | Atomest</title>
        <meta
          name="description"
          content="Atomest Terms of Service: the terms governing your use of our website and services."
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
                <span>Terms of Service</span>
              </div>
              <h1 className="atomest-section-title text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Terms of Service
              </h1>
              <p className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-8">
                Effective date: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <div className="space-y-6 text-slate-400 leading-relaxed text-sm sm:text-base">
                <p>
                  Welcome to Atomest. These terms govern your use of our website and services. By contacting us or engaging Atomest for services, you agree to these terms.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">1. Services</h2>
                <p>
                  Atomest provides AI solutions, business automation, CRM and workflow automation, AI customer support, and premium business websites. Each engagement is scoped individually through a written proposal and service agreement.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">2. Pricing & Payment</h2>
                <p>
                  Pricing is quoted per project based on scope. A deposit may be required before work begins. Final payment is due on delivery unless otherwise agreed in writing.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">3. Deliverables & Timelines</h2>
                <p>
                  Timelines are estimates based on information provided at the time of quoting. Delivery dates may shift if requirements change or client-provided materials are delayed. We do not guarantee unsupported business outcomes.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">4. Client Responsibilities</h2>
                <p>
                  You are responsible for providing accurate information, timely feedback, and access to accounts (domain, CRM, analytics) needed to complete the work.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">5. Intellectual Property</h2>
                <p>
                  Upon final payment, you own the website code, content, and automation workflows we build for you. Atomest retains ownership of reusable frameworks, templates, and background IP.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">6. Confidentiality</h2>
                <p>
                  Both parties agree to keep project details, business information, and customer data confidential. NDAs can be signed upon request.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">7. Limitation of Liability</h2>
                <p>
                  Atomest's liability is limited to the fees paid for the specific engagement. We are not liable for indirect, incidental, or consequential damages.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">8. Termination</h2>
                <p>
                  Either party may terminate with written notice. Fees for work completed up to termination are payable in full.
                </p>

                <h2 className="font-display font-bold text-lg text-slate-50 mb-2 mt-6">9. Contact Us</h2>
                <p>
                  Questions? Contact us at <a href="mailto:hello@atomest.com" className="text-indigo-400 hover:underline font-mono">hello@atomest.com</a>.
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
