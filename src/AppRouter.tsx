import { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "wouter";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { ScrollToTop } from "@/components/ScrollToTop";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Account = lazy(() => import("@/pages/auth/Account"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

// ── Atomest V2: Solution & Consultation Routes ──
const SolutionWebsites = lazy(() => import("@/pages/solutions/Websites"));
const SolutionAutomation = lazy(() => import("@/pages/solutions/Automation"));
const SolutionAgents = lazy(() => import("@/pages/solutions/Agents"));
const SolutionProducts = lazy(() => import("@/pages/solutions/Products"));
const Contact = lazy(() => import("@/pages/Contact"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-7 h-7 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export default function AppRouter() {
  const isClient = typeof window !== "undefined";

  return (
    <>
      {isClient && <ScrollToTop />}
      <GoogleAnalytics />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />

          {/* ── Atomest V2 Primary Routes ── */}
          <Route path="/solutions/websites" component={SolutionWebsites} />
          <Route path="/solutions/automation" component={SolutionAutomation} />
          <Route path="/solutions/agents" component={SolutionAgents} />
          <Route path="/solutions/products" component={SolutionProducts} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />

          {/* ── Client / Account Operations ── */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/account" component={Account} />
          <Route path="/dashboard" component={Dashboard} />

          {/* ── Legacy Route Fallbacks (HTTP 301 handled at hosting level by vercel.json) ── */}
          <Route path="/tools">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/tools/:rest*">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/categories">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/categories/:rest*">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/products">{() => <Redirect to="/solutions/products" replace />}</Route>
          <Route path="/ai-products">{() => <Redirect to="/solutions/products" replace />}</Route>
          <Route path="/ai-products/:rest*">{() => <Redirect to="/solutions/products" replace />}</Route>
          <Route path="/originals/:rest*">{() => <Redirect to="/solutions/products" replace />}</Route>
          <Route path="/employees/:rest*">{() => <Redirect to="/solutions/agents" replace />}</Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}
