import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, History, CreditCard, Settings,
  ChevronLeft, ChevronRight, LogOut, Zap, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/hooks/use-credits";
import { useLiveModules } from "@/hooks/use-modules";
import { supabase } from "@/lib/supabase";

const NAV_ITEMS = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/employees", icon: Users,            label: "AI Employees" },
  { href: "/dashboard/history",   icon: History,          label: "History" },
  { href: "/dashboard/billing",   icon: CreditCard,       label: "Billing" },
  { href: "/dashboard/settings",  icon: Settings,         label: "Settings" },
];

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  const handleSignOut = () => void supabase.auth.signOut();
  const { data: credits } = useCredits();
  const liveModules = useLiveModules();

  const initials = (user?.user_metadata?.full_name as string | undefined)
    ?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    ?? user?.email?.[0].toUpperCase()
    ?? 'U';

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      
      {/* ── Mobile Overlay ──────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed md:relative flex flex-col border-r border-white/8 transition-all duration-300 shrink-0 z-50 h-full ${
          collapsed ? 'w-[60px]' : 'w-[220px]'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ background: 'hsl(var(--sidebar))' }}
      >
        {/* Wordmark */}
        <div className="flex items-center justify-between px-4 border-b border-white/8 shrink-0" style={{ height: 'var(--sp-nav-h)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-semibold text-foreground tracking-tight text-sm">Atomest</span>
            )}
          </div>
          {mobileMenuOpen && (
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = location === item.href || location.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}

          {/* Live modules sub-nav */}
          {!collapsed && liveModules.length > 0 && (
            <div className="pt-3 pb-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">
                My Employees
              </p>
              {liveModules.map(mod => (
                <Link key={mod.id} href={`/employees/${mod.id}`}>
                  <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    location.startsWith(`/employees/${mod.id}`)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}>
                    <mod.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{mod.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/8 p-2 space-y-1">
          {/* Credits */}
          {!collapsed && credits && (
            <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 mb-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Credits</p>
              <p className="text-sm font-semibold text-foreground">{credits.balance.toLocaleString()}</p>
            </div>
          )}

          {/* User */}
          <div className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg ${!collapsed ? '' : 'justify-center'}`}>
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-primary">{initials}</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {user?.user_metadata?.full_name ?? user?.email}
                </p>
              </div>
            )}
            {!collapsed && (
              <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-full flex items-center justify-center py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 border-b border-white/8 shrink-0" style={{ height: 'var(--sp-nav-h)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-foreground tracking-tight text-sm">Atomest</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="text-muted-foreground p-1">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
