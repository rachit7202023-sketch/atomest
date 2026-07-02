import { Variants } from "framer-motion";

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] // Custom ease-out expo
    } 
  }
};

export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};
