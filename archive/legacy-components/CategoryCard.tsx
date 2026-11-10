import { Link } from "wouter";
import { motion } from "framer-motion";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link href={`/categories/${category.id}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="group relative bg-card border border-white/5 rounded-2xl p-7 transition-all duration-300 shadow-sm hover:shadow-2xl hover:border-primary/30 cursor-pointer h-full flex flex-col items-center text-center overflow-hidden depth-base hover:depth-floating"
      >
        {/* Magnetic Spotlight Glow */}
        <div className="spotlight-overlay opacity-0 group-hover:opacity-100" />

        <div className="relative z-10 w-full flex flex-col items-center h-full">
          <div className={`p-4 rounded-[18px] bg-muted mb-5 transition-transform duration-300 ease-out-expo group-hover:scale-110 shadow-sm ${category.color}`}>
            <Icon className="h-8 w-8 drop-shadow-sm" />
          </div>
          <h3 className="font-extrabold text-[1.1rem] text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">{category.name}</h3>
          <p className="text-[14px] text-muted-foreground mb-6 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {category.description}
          </p>
          <div className="mt-auto text-[11px] font-bold bg-secondary/80 text-secondary-foreground px-4 py-1.5 rounded-full tracking-wider uppercase border border-border/50 group-hover:border-primary/20 transition-colors duration-300 shadow-sm">
            {category.toolCount} <span className="text-muted-foreground font-semibold">tools</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
