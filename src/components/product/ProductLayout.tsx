import { ReactNode } from "react";
import { Product } from "@/data/products";
import { ProductNavbar } from "./ProductNavbar";
import { ProductFooter } from "./ProductFooter";

interface ProductLayoutProps {
  product: Product;
  children: ReactNode;
}

export function ProductLayout({ product, children }: ProductLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background ambient mesh gradient based on product accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-10 pointer-events-none rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(ellipse at center, ${product.brand.accentFrom}, transparent 70%)`
        }}
      />
      
      <ProductNavbar product={product} />
      
      <main className="flex-1 relative z-10 flex flex-col">
        {children}
      </main>

      <ProductFooter product={product} />
    </div>
  );
}
