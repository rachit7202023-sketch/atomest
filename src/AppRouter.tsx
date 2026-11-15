import { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "wouter";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { ScrollToTop } from "@/components/ScrollToTop";

const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Work = lazy(() => import("@/pages/Work"));
const DigitalProducts = lazy(() => import("@/pages/DigitalProducts"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Account = lazy(() => import("@/pages/auth/Account"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

// ── Service Division Detail Routes ──
const AIVoiceReceptionist = lazy(() => import("@/pages/services/AIVoiceReceptionist"));
const LeadAutomation = lazy(() => import("@/pages/services/LeadAutomation"));
const CRMWorkflowAutomation = lazy(() => import("@/pages/services/CRMWorkflowAutomation"));
const AICustomerSupport = lazy(() => import("@/pages/services/AICustomerSupport"));
const PremiumBusinessWebsites = lazy(() => import("@/pages/services/PremiumBusinessWebsites"));

// ── Solution / Technology Division Routes ──
const SolutionWebsites = lazy(() => import("@/pages/solutions/Websites"));
const SolutionAutomation = lazy(() => import("@/pages/solutions/Automation"));
const SolutionAgents = lazy(() => import("@/pages/solutions/Agents"));

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

          {/* ── Primary Public Navigation Routes ── */}
          <Route path="/services" component={Services} />
          <Route path="/services/ai-voice-receptionist" component={AIVoiceReceptionist} />
          <Route path="/services/lead-automation" component={LeadAutomation} />
          <Route path="/services/crm-workflow-automation" component={CRMWorkflowAutomation} />
          <Route path="/services/ai-customer-support" component={AICustomerSupport} />
          <Route path="/services/premium-business-websites" component={PremiumBusinessWebsites} />
          <Route path="/work" component={Work} />
          <Route path="/products" component={DigitalProducts} />
          <Route path="/digital-products" component={DigitalProducts} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />

          {/* ── Technology Division Routes ── */}
          <Route path="/solutions/websites" component={SolutionWebsites} />
          <Route path="/solutions/automation" component={SolutionAutomation} />
          <Route path="/solutions/agents" component={SolutionAgents} />

          {/* ── Client / Account Operations (preserved for admin / internal use) ── */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/account" component={Account} />
          <Route path="/dashboard" component={Dashboard} />

          {/* ── Legacy Route Fallbacks ── */}
          <Route path="/solutions/products">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/tools">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/tools/:rest*">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/categories">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/categories/:rest*">{() => <Redirect to="/solutions/automation" replace />}</Route>
          <Route path="/ai-products">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/ai-products/:rest*">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/originals/:rest*">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/employees/:rest*">{() => <Redirect to="/solutions/agents" replace />}</Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}
