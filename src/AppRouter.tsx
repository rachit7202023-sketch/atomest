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
const Originals = lazy(() => import("@/pages/Originals"));
const Ripple = lazy(() => import("@/pages/originals/Ripple"));
const RealityCheck = lazy(() => import("@/pages/originals/RealityCheck"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
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
        <Route path="/originals" component={Originals} />
        <Route path="/originals/ripple" component={Ripple} />
        <Route path="/originals/reality-check" component={RealityCheck} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
  );
}
