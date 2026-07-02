import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { STAGGER_CONTAINER, FADE_UP } from "../ripple/utils/animations";

interface OriginalStepProps {
  children: ReactNode;
  isActive: boolean;
  onEnter?: () => void;
  className?: string;
}

export function OriginalStep({ children, isActive, className = "" }: OriginalStepProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!isActive) return null;

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : STAGGER_CONTAINER}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={`min-h-[40vh] flex flex-col justify-center items-center py-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function OriginalStepContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div variants={prefersReducedMotion ? undefined : FADE_UP} className={`w-full max-w-2xl mx-auto text-center ${className}`}>
      {children}
    </motion.div>
  );
}
