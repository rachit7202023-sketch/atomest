import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  BarChart3, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  UploadCloud,
  Cpu
} from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  {
    icon: UploadCloud,
    title: "Bulk Resume Parsing",
    description: "Upload thousands of resumes at once. Our AI extracts skills, experience, and contact info instantly, regardless of the PDF format."
  },
  {
    icon: Cpu,
    title: "Semantic Matching",
    description: "Go beyond keyword search. RecruiterAI understands the context of a candidate's experience to match them with your exact job requirements."
  },
  {
    icon: BarChart3,
    title: "Interview Insights",
    description: "Automatically generate tailored interview questions and technical assessment criteria based on the candidate's unique background."
  }
];

const workflowSteps = [
  {
    title: "Upload Job Description",
    description: "Paste your job requirements. The AI instantly builds an ideal candidate profile."
  },
  {
    title: "Ingest Resumes",
    description: "Drop in hundreds of applicants. We parse and normalize every document in seconds."
  },
  {
    title: "Rank & Review",
    description: "Get a ranked list of top candidates with detailed, AI-generated reasoning for each match."
  },
  {
    title: "Hire Faster",
    description: "Move straight to the interview stage with generated technical questions tailored to their resume."
  }
];

const faqs = [
  {
    q: "How does the AI evaluate candidates?",
    a: "RecruiterAI uses advanced Large Language Models to semantically understand both your job description and the candidates' resumes. It doesn't just look for exact keyword matches; it understands equivalent skills, career trajectories, and context."
  },
  {
    q: "Is it biased?",
    a: "We have engineered strict safeguards into our pipeline to strip out PII (Personally Identifiable Information) such as name, age, and gender before the semantic matching phase, ensuring purely merit-based ranking."
  },
  {
    q: "What file formats are supported?",
    a: "Currently, we support PDF, DOCX, and TXT files for massive bulk uploads."
  },
  {
    q: "When will this be available?",
    a: "We are currently in private beta with select enterprise partners and will be opening up access very soon. Join the waitlist to get early access."
  }
];

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 perspective-1000">
      <motion.div 
        initial={{ rotateX: 20, y: 50, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-2xl shadow-2xl"
      >
        {/* Mockup Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto px-24 py-1 text-xs text-white/40 bg-white/5 rounded-md font-mono">
            app.atomest.com/recruiter-ai
          </div>
        </div>

        {/* Mockup Body */}
        <div className="p-6 grid grid-cols-12 gap-6 h-[400px] sm:h-[500px]">
          {/* Sidebar */}
          <div className="col-span-3 hidden sm:flex flex-col gap-3 border-r border-white/5 pr-6">
            <div className="h-8 bg-white/5 rounded w-full mb-4" />
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-6 bg-white/5 rounded w-3/4" />
            ))}
          </div>
          
          {/* Main Content */}
          <div className="col-span-12 sm:col-span-9 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <div className="h-8 bg-white/10 rounded w-1/3" />
              <div className="h-8 bg-blue-500/20 rounded w-1/4" />
            </div>

            {/* Candidate Cards */}
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex-shrink-0" />
                <div className="flex-grow flex flex-col gap-2">
                  <div className="h-4 bg-white/20 rounded w-1/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
                <div className="w-16 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <div className="h-2 bg-green-500/50 rounded w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradients to make it look premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </motion.div>
    </div>
  );
}

export default function RecruiterAi() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-blue-500/30">
      <SEO 
        title="RecruiterAI by Atomest | Hire Faster With AI" 
        description="Upload resumes and discover your strongest candidates in minutes. The ultimate AI-powered recruitment platform."
        canonicalPath="/products/recruiter-ai"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-indigo-600 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8"
          >
            <Briefcase className="w-4 h-4" />
            <span>RecruiterAI</span>
            <span className="w-1 h-1 rounded-full bg-blue-400 mx-1" />
            <span className="text-blue-400/70">Launching Soon</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Hire <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">faster</span> with AI.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light"
          >
            Upload thousands of resumes and instantly discover your strongest candidates. Let AI handle the screening so you can focus on the interview.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 rounded-full">
                Get Started Free
              </Button>
            </Link>
          </motion.div>

          <DashboardMockup />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Eliminate the manual screening process.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our models are trained specifically to understand technical terminology, career trajectories, and hidden potential.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-black/50 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">How RecruiterAI works</h2>
              <div className="space-y-8">
                {workflowSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 font-bold text-sm">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Abstract Representation of Workflow */}
            <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/10 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                 <div className="absolute w-48 h-48 border border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                 <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
                 <Briefcase className="absolute w-8 h-8 text-blue-400" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">The ROI of AI Automation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              "Reduce time-to-hire by up to 40%",
              "Eliminate human bias in initial screening",
              "Never miss a highly qualified candidate",
              "Standardize interview technical questions",
              "Process 10,000+ resumes in minutes",
              "Enterprise-grade security and compliance"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black/30 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white/5 border border-white/10 rounded-xl px-6 data-[state=open]:border-blue-500/30 transition-colors">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA / Waitlist Section */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Ready to scale your hiring?</h2>
          <p className="text-xl text-muted-foreground mb-10">Join the waitlist today to get early access to RecruiterAI before it launches to the public.</p>
          
          <WaitlistForm />
          
          <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product: "recruiter-ai" })
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-green-400 p-4 border border-green-500/20 rounded-xl bg-green-500/10 max-w-md mx-auto">
        <CheckCircle2 className="w-6 h-6" />
        <p className="font-semibold">You're on the list!</p>
        <p className="text-sm text-green-400/80">We'll notify you when RecruiterAI opens up.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
      <Input 
        type="email" 
        placeholder="name@company.com" 
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="h-12 bg-black/50 border-white/10 focus-visible:ring-blue-500" 
      />
      <Button 
        type="submit" 
        disabled={status === "loading" || !email}
        className="h-12 px-8 bg-white text-black hover:bg-gray-200 font-bold w-full sm:w-auto"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </Button>
      {status === "error" && <p className="text-red-400 text-sm absolute -bottom-6">Something went wrong. Please try again.</p>}
    </form>
  );
}
