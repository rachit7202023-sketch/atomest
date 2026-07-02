import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FADE_UP } from "../ripple/utils/animations";

interface OriginalInsightCardProps {
  children: ReactNode;
  accentColor?: string; // e.g., "bg-indigo-500"
  className?: string;
}

export function OriginalInsightCard({ children, accentColor = "bg-primary", className = "" }: OriginalInsightCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : FADE_UP}
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-card/40 backdrop-blur-3xl p-8 sm:p-12 shadow-2xl ${className}`}
    >
      {/* Subtle ambient glow behind the card content */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${accentColor} opacity-[0.03] rounded-full blur-[80px] pointer-events-none`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
