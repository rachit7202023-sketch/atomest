import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";

const Home = lazy(() => import("@/pages/Home"));
const Tools = lazy(() => import("@/pages/Tools"));
const ToolPage = lazy(() => import("@/pages/ToolPage"));
const Categories = lazy(() => import("@/pages/Categories"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AiProducts = lazy(() => import("@/pages/AiProducts"));
const Products = lazy(() => import("@/pages/Products"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Account = lazy(() => import("@/pages/auth/Account"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const RecruiterAiLanding = lazy(() => import("@/modules/recruiter-ai/pages/LandingPage"));
const RecruiterAiDashboard = lazy(() => import("@/modules/recruiter-ai/pages/DashboardPage"));
const RecruiterAiApp = lazy(() => import("@/modules/recruiter-ai/pages/AppPage"));

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

import { ScrollToTop } from "@/components/ScrollToTop";

export default function AppRouter() {
  const isClient = typeof window !== "undefined";
  
  return (
    <>
      {isClient && <ScrollToTop />}
      <GoogleAnalytics />
      <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/tools/:slug" component={ToolPage} />
        <Route path="/categories" component={Categories} />
        <Route path="/categories/:slug" component={CategoryPage} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/ai-products" component={AiProducts} />
        <Route path="/ai-products/recruiter-ai" component={RecruiterAiLanding} />
        <Route path="/ai-products/recruiter-ai/dashboard" component={RecruiterAiDashboard} />
        <Route path="/ai-products/recruiter-ai/app" component={RecruiterAiApp} />
        <Route path="/ai-products/recruiter-ai/app/:id" component={RecruiterAiApp} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/account" component={Account} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
  );
}
