import { ReactNode } from "react";
import { motion } from "framer-motion";

interface OriginalLayoutProps {
  children: ReactNode;
  theme?: "dark" | "light"; // Future support if needed, defaults dark
}

export function OriginalLayout({ children, theme = "dark" }: OriginalLayoutProps) {
  return (
    <div className={`relative min-h-screen bg-background flex flex-col overflow-x-hidden ${theme === 'dark' ? 'dark-theme-override' : ''}`}>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col relative z-10">
        {children}
      </main>
      
      {/* Global Ambient Background specific to Originals */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-black opacity-40" />
      </div>
    </div>
  );
}
