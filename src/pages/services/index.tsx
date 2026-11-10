import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const categories = [
    {
      title: 'Web Development',
      icon: 'Globe',
      description: 'Modern, fast, SEO‑optimized websites, landing pages and custom web applications that generate leads and conversions.',
      items: [
        'Business & corporate websites',
        'High‑conversion landing pages',
        'Lead‑gen funnels',
        'Full redesigns & modernization',
        'E‑commerce storefronts (within scope)',
      ],
    },
    {
      title: 'Business Automation',
      icon: 'GitFork',
      description: 'Repeatable, self‑healing workflows that connect forms, CRMs, messaging and databases – eliminating manual friction.',
      items: [
        'Inbound lead capture & routing',
        'CRM synchronization',
        'Appointment & booking automation',
        'Data sync & reporting pipelines',
        'Custom operational event logic',
      ],
    },
    {
      title: 'AI Solutions',
      icon: 'Bot',
      description: 'Grounded AI assistants that handle customer inquiries, support internal teams and augment business processes.',
      items: [
        'FAQ chatbots for websites',
        'Customer‑support agents',
        'AI‑driven email assistants',
        'Internal knowledge copilots',
        'Custom AI agents for niche tasks',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Atomest | Services – Web Development, Automation, AI</title>
        <meta name="description" content="Atomest offers three core service pillars – Web Development, Business Automation, and AI Solutions – to help SMBs operate smarter, grow faster, and stay competitive." />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />
        <main className="atomest-container py-24">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-center mb-12">Our Services</h1>
          <div className="grid gap-8 md:grid-cols-3">
            {categories.map((cat) => (
              <section key={cat.title} className="bg-[#10121A] rounded-xl border border-[#252938] p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  {/* simple placeholder icon using lucide-react classname */}
                  <span className="text-[#8B5CF6] text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold">{cat.title}</h2>
                </div>
                <p className="text-[#A0A5B5] mb-4">{cat.description}</p>
                <ul className="list-disc list-inside space-y-1 mb-4 text-[#A0A5B5]">
                  {cat.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 text-[#8B5CF6] hover:underline">
                  Enquire about {cat.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </section>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

