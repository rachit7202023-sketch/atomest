import { Link } from "wouter";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link href={`/categories/${category.id}`}>
      <div className="group bg-card hover:bg-accent/30 border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-primary/30 cursor-pointer h-full flex flex-col items-center text-center">
        <div className={`p-4 rounded-full bg-muted/50 mb-4 group-hover:scale-110 transition-transform ${category.color}`}>
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="font-bold text-foreground mb-2">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {category.description}
        </p>
        <div className="mt-auto text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
          {category.toolCount} tools
        </div>
      </div>
    </Link>
  );
}
