import { Link } from "wouter";
import { Search, Moon, Sun, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/65 backdrop-blur-2xl border-b border-white/5 dark:border-white/5 transition-all duration-300">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/logo.svg" width="36" height="36" alt="Atomest" className="rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out flex-shrink-0 shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-[1.15rem] tracking-tight-head">Atomest</span>
              <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-micro mt-[1px]">The Internet's Toolbox</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-[14px] font-medium tracking-tight">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Home</Link>
            <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors duration-200">All Tools</Link>
            <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Categories</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200">About</Link>
            <Link href="/ai" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 duration-200">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 font-bold">Atomest AI</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Search" data-testid="button-search">
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" data-testid="button-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
                <Link href="/tools" className="text-lg font-medium hover:text-primary transition-colors">All Tools</Link>
                <Link href="/categories" className="text-lg font-medium hover:text-primary transition-colors">Categories</Link>
                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">About</Link>
                <Link href="/ai" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Atomest AI</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
