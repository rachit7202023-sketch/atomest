import { Sparkles, Target } from "lucide-react";

export interface OriginalProduct {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: string;
  badge: string;
  icon: any;
  coverImage?: string;
  theme: string;
  accentColor: string;
  launchPhase: number;
  isFeatured: boolean;
  isPublic: boolean;
  displayOrder: number;
}

export const originals: OriginalProduct[] = [
  {
    slug: "ripple",
    title: "Ripple",
    tagline: "Every decision creates a ripple. See where it leads.",
    description: "An interactive decision mapping engine that helps you visualize the long-term compounding effects of your daily choices.",
    status: "Design Phase",
    badge: "Atomest Original",
    icon: Sparkles,
    theme: "dark",
    accentColor: "from-indigo-500 to-purple-500",
    launchPhase: 1,
    isFeatured: true,
    isPublic: true,
    displayOrder: 1,
  },
  {
    slug: "reality-check",
    title: "Reality Check",
    tagline: "Find out whether your biggest life goals are actually achievable.",
    description: "A brutally honest reality simulator that calculates the time, money, and probability required to reach your goals.",
    status: "Research",
    badge: "Exclusive",
    icon: Target,
    theme: "dark",
    accentColor: "from-rose-500 to-orange-500",
    launchPhase: 1,
    isFeatured: true,
    isPublic: true,
    displayOrder: 2,
  }
];
