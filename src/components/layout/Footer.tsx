import { Link } from "wouter";
import { categories } from "@/data/categories";
import { GoogleAd } from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/config/ads";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const topCategories = categories.slice(0, 5);

  return (
    <footer className="relative bg-background overflow-hidden border-t border-border/40">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 pointer-events-none depth-ambient" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight-head mb-6">
            The Internet's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Toolbox.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Free, fast, and secure utilities designed for creators, developers, and everyday problem-solvers. No registration required.
          </p>
        </div>

        <GoogleAd adSlot={AD_SLOTS.FOOTER_BANNER} className="w-full max-w-4xl mx-auto mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-2 pr-8">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group inline-flex">
              <img src="/logo.svg" width="32" height="32" alt="Atomest" className="rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
              <span className="font-extrabold text-xl tracking-tight-head">Atomest</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-8 max-w-xs leading-relaxed">
              We build tools that run entirely in your browser. Lightning fast, completely private, and free forever.
            </p>
            <div className="flex gap-4">
              {/* Social links */}
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all hover:-translate-y-0.5 duration-200" aria-label="Twitter">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all hover:-translate-y-0.5 duration-200" aria-label="GitHub">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-sm tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">All Tools</Link></li>
              <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Categories</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">About Us</Link></li>
              <li><Link href="/originals" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Atomest Originals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-sm tracking-wide">Top Categories</h3>
            <ul className="space-y-4">
              {topCategories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-sm tracking-wide">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Atomest. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Built with <Heart className="h-3.5 w-3.5 text-primary fill-current animate-pulse" /> for the open web
          </div>
        </div>
      </div>
    </footer>
  );
}

function Heart(props: any) {
  return (
    <svg
      xmlns="http://www.0000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
