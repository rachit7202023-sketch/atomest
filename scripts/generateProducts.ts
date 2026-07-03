import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

const CATEGORY_GRADIENTS = {
  text:        ["#6366f1", "#8b5cf6"],
  developer:   ["#10b981", "#06b6d4"],
  generators:  ["#f59e0b", "#ef4444"],
  calculators: ["#6366f1", "#3b82f6"],
  color:       ["#ec4899", "#f43f5e"],
  image:       ["#f43f5e", "#fb923c"],
  utilities:   ["#64748b", "#6366f1"],
  ai:          ["#8b5cf6", "#6366f1"],
  default:     ["#7c3aed", "#a78bfa"],
};

const products = tools.map(t => {
  const [from, to] = CATEGORY_GRADIENTS[t.category as keyof typeof CATEGORY_GRADIENTS] || CATEGORY_GRADIENTS.default;
  return {
    ...t,
    tagline: `The ultimate ${t.name} companion.`,
    valueProp: `Experience seamless productivity with our dedicated ${t.name} product.`,
    type: "utility",
    modules: [{ id: "main", label: "Core" }],
    brand: {
      accentFrom: from,
      accentTo: to
    }
  };
});

const originals = [
  {
    id: "ripple",
    name: "Ripple",
    description: "Ripple helps you generate stunning text graphics.",
    metaDescription: "Transform text into beautiful, shareable graphics in seconds with Ripple.",
    category: "ai",
    keywords: ["ripple", "graphics", "social", "text-to-image"],
    icon: 'Type',
    slug: "ripple",
    tagline: "Transform text into viral graphics instantly.",
    valueProp: "Create beautiful, shareable typographic graphics in seconds. No design skills required.",
    type: "original",
    modules: [{ id: "main", label: "Creator" }],
    brand: {
      accentFrom: "#000000",
      accentTo: "#333333"
    },
    featured: true
  },
  {
    id: "reality-check",
    name: "Reality Check",
    description: "Analyze any text for hidden biases and logical fallacies.",
    metaDescription: "Reality Check helps you analyze text for logical fallacies and emotional manipulation.",
    category: "ai",
    keywords: ["bias", "analysis", "truth", "reality"],
    icon: 'Search',
    slug: "reality-check",
    tagline: "Uncover the truth behind the narrative.",
    valueProp: "Analyze text for bias, logical fallacies, and emotional manipulation.",
    type: "original",
    modules: [{ id: "main", label: "Scanner" }],
    brand: {
      accentFrom: "#ef4444",
      accentTo: "#b91c1c"
    },
    featured: true
  }
];

let out = `import { Type, Braces, Link as LinkIcon, Hash, Fingerprint, CalendarClock, Shield, QrCode, Dices, Shuffle, Coins, FileJson, Image as ImageIcon, FileImage, Palette, Droplet, Brush, Calculator, Percent, Landmark, Activity, AlignLeft, ArrowDownUp, Minimize, SplitSquareHorizontal, Layers, Copy, FileText, FileCode2, Search } from "lucide-react";

export type ProductModule = {
  id: string;
  label: string;
  componentKey?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  valueProp: string;
  description: string;
  metaDescription: string;
  category: string;
  keywords: string[];
  icon: any;
  type: "utility" | "original";
  modules: ProductModule[];
  brand: {
    accentFrom: string;
    accentTo: string;
    favicon?: string;
    ogImage?: string;
  };
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  howItWorks?: { step: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  benefits?: string[];
  relatedProductSlugs?: string[];
};

export const products: Product[] = [\n`;

products.forEach(p => {
  out += `  {
    id: "${p.id}",
    name: "${p.name}",
    description: ` + JSON.stringify(p.description) + `,
    metaDescription: ` + JSON.stringify(p.metaDescription) + `,
    category: "${p.category}",
    keywords: ` + JSON.stringify(p.keywords) + `,
    icon: ${p.icon.name || p.icon},
    slug: "${p.slug}",
    tagline: ` + JSON.stringify(p.tagline) + `,
    valueProp: ` + JSON.stringify(p.valueProp) + `,
    type: "${p.type}",
    modules: ` + JSON.stringify(p.modules) + `,
    brand: ` + JSON.stringify(p.brand) + `,
`;
  if (p.featured) out += `    featured: true,\n`;
  if (p.popular) out += `    popular: true,\n`;
  if (p.new) out += `    new: true,\n`;
  if (p.seoTitle) out += `    seoTitle: ` + JSON.stringify(p.seoTitle) + `,\n`;
  if (p.seoDescription) out += `    seoDescription: ` + JSON.stringify(p.seoDescription) + `,\n`;
  if (p.howItWorks) out += `    howItWorks: ` + JSON.stringify(p.howItWorks) + `,\n`;
  if (p.faqs) out += `    faqs: ` + JSON.stringify(p.faqs) + `,\n`;
  if (p.benefits) out += `    benefits: ` + JSON.stringify(p.benefits) + `,\n`;
  if (p.relatedToolSlugs) out += `    relatedProductSlugs: ` + JSON.stringify(p.relatedToolSlugs) + `,\n`;
  out += `  },\n`;
});

originals.forEach(p => {
  out += `  {
    id: "${p.id}",
    name: "${p.name}",
    description: ` + JSON.stringify(p.description) + `,
    metaDescription: ` + JSON.stringify(p.metaDescription) + `,
    category: "${p.category}",
    keywords: ` + JSON.stringify(p.keywords) + `,
    icon: ${p.icon},
    slug: "${p.slug}",
    tagline: ` + JSON.stringify(p.tagline) + `,
    valueProp: ` + JSON.stringify(p.valueProp) + `,
    type: "${p.type}",
    modules: ` + JSON.stringify(p.modules) + `,
    brand: ` + JSON.stringify(p.brand) + `,
    featured: true
  },\n`;
});

out += `];\n`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/products.ts'), out);
console.log('Successfully generated src/data/products.ts');
