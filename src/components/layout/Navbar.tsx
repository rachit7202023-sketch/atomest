import { Link } from "wouter";
import { Search, Moon, Sun, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";

// Unified nav link styles
const NAV_LINK_BASE = "text-[0.8125rem] font-medium tracking-[-0.01em] leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-sm py-1";
const NAV_LINK_DEFAULT = `${NAV_LINK_BASE} text-muted-foreground hover:text-foreground`;
const NAV_LINK_ACTIVE = `${NAV_LINK_BASE} text-foreground`;

// Mobile nav link styles
const MOBILE_LINK_BASE = "text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-150 py-1";
const MOBILE_LINK_DEFAULT = `${MOBILE_LINK_BASE} text-muted-foreground hover:text-foreground`;

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLocation("/");
  };

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/65 backdrop-blur-2xl border-b border-white/5 dark:border-white/5 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Atomest Home">
            <img src="/logo.svg" width="32" height="32" alt="Atomest" className="rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out flex-shrink-0 shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-[1.05rem] tracking-tight-head">Atomest</span>
              <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-micro mt-[1px]">The Internet's Toolbox</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={isActive("/") && location === "/" ? NAV_LINK_ACTIVE : NAV_LINK_DEFAULT}>Home</Link>
            <Link href="/products" className={`${isActive("/products") ? NAV_LINK_ACTIVE : NAV_LINK_DEFAULT} flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 font-semibold">AI Products</span>
            </Link>
            <Link href="/tools" className={isActive("/tools") ? NAV_LINK_ACTIVE : NAV_LINK_DEFAULT}>Free Tools</Link>
            <Link href="/#pricing" className={NAV_LINK_DEFAULT}>Pricing</Link>
            <Link href="/about" className={isActive("/about") ? NAV_LINK_ACTIVE : NAV_LINK_DEFAULT}>About</Link>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {user ? (
            <div className="hidden md:flex items-center gap-1 mr-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className={`${NAV_LINK_BASE} px-3 h-8 ${isActive("/dashboard") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  Dashboard
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="sm" className={`${NAV_LINK_BASE} px-3 h-8 ${isActive("/account") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  Account
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className={`${NAV_LINK_BASE} px-3 h-8 text-muted-foreground hover:text-foreground`} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1.5 mr-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="h-8 text-[0.8125rem] font-medium">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="h-8 text-[0.8125rem] font-medium bg-primary hover:bg-primary/90">Sign Up</Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSearchOpen(true)} aria-label="Search" data-testid="button-search">
            <Search className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" aria-label="Menu" data-testid="button-menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-5 mt-8">
                <Link href="/" className={MOBILE_LINK_DEFAULT}>Home</Link>
                <Link href="/products" className={`${MOBILE_LINK_DEFAULT} flex items-center gap-2`}>
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 font-semibold">AI Products</span>
                </Link>
                <Link href="/tools" className={MOBILE_LINK_DEFAULT}>Free Tools</Link>
                <Link href="/#pricing" className={MOBILE_LINK_DEFAULT}>Pricing</Link>
                <Link href="/about" className={MOBILE_LINK_DEFAULT}>About</Link>
                
                <div className="h-px bg-border/40 my-2" />
                
                {user ? (
                  <>
                    <Link href="/dashboard" className={MOBILE_LINK_DEFAULT}>Dashboard</Link>
                    <Link href="/account" className={MOBILE_LINK_DEFAULT}>Account</Link>
                    <button onClick={handleLogout} className={`text-left ${MOBILE_LINK_BASE} text-red-400 hover:text-red-300`}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className={MOBILE_LINK_DEFAULT}>Log In</Link>
                    <Link href="/signup" className={`${MOBILE_LINK_BASE} text-primary hover:text-primary/80`}>Sign Up</Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
