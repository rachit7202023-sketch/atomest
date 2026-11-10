import { Link } from "wouter";
import { Product } from "@/data/products";

export function ProductFooter({ product }: { product: Product }) {
  const Icon = product.icon;
  return (
    <footer className="border-t border-white/5 mt-20 bg-background/50 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <span className="font-semibold text-muted-foreground">{product.name}</span>
          <span className="text-muted-foreground/50 mx-2">•</span>
          <Link href="/" className="text-sm font-medium hover:text-foreground transition-colors">
            Built by Atomest
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
