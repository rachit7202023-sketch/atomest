import { Link } from "wouter";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Product } from "@/data/products";

export function ProductNavbar({ product }: { product: Product }) {
  const { theme, setTheme } = useTheme();
  const Icon = product.icon;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/65 backdrop-blur-2xl border-b border-white/5 dark:border-white/5 transition-all duration-300">
      <div 
        className="absolute inset-x-0 bottom-0 h-px opacity-50"
        style={{
          background: `linear-gradient(to right, transparent, ${product.brand.accentFrom}, transparent)`
        }} 
      />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link href={`/tools/${product.slug}`} className="flex items-center gap-3 group">
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-lg shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${product.brand.accentFrom}, ${product.brand.accentTo})`,
            }}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-[1.1rem] tracking-tight">{product.name}</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Built by</span>
            <img src="/logo.svg" width="16" height="16" alt="Atomest" className="rounded-md" />
            <span className="font-bold text-sm tracking-tight-head">Atomest</span>
          </Link>
          
          <div className="w-px h-4 bg-border mx-1" />

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
