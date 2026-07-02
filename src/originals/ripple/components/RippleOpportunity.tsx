import { useState, useEffect } from "react";
import { useRipple } from "../store/useRippleStore";
import { OriginalStep } from "../../core/OriginalStep";
import { OriginalInsightCard } from "../../core/OriginalInsightCard";
import { calculateOpportunityCost, formatCurrency } from "../utils/calculations";
import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

export function RippleOpportunity() {
  const { item, cost, currency } = useRipple();
  const [selectedYears, setSelectedYears] = useState<10 | 20 | 30>(30);
  
  const futureValue = calculateOpportunityCost(cost, selectedYears);
  const maxFutureValue = calculateOpportunityCost(cost, 30);
  
  // Create SVG path based on selected years.
  const createPath = (years: number) => {
    const width = 400;
    const height = 200;
    const points = [];
    for (let i = 0; i <= years; i++) {
      const x = (i / 30) * width;
      const val = calculateOpportunityCost(cost, i);
      const y = height - ((val / maxFutureValue) * height);
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  return (
    <OriginalStep isActive={true}>
      <OriginalInsightCard accentColor="bg-purple-500" className="w-full max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            
            {/* Animated SVG Graph Hero */}
            <div className="relative w-full h-[260px] border-b border-white/10 pb-8 flex items-end">
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Background Grid Lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                
                {/* Animated Growth Curve */}
                <motion.path
                  key="growth-curve"
                  initial={{ d: createPath(0) }}
                  animate={{ d: createPath(selectedYears) }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_10px_20px_rgba(168,85,247,0.4)]"
                />
              </svg>
              
              {/* Dynamic Overlay Value */}
              <div className="absolute -top-4 right-0 text-right">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={selectedYears}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-4xl sm:text-5xl font-black text-purple-400 drop-shadow-md"
                  >
                    {formatCurrency(futureValue, currency)}
                  </motion.div>
                </AnimatePresence>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  Future Value
                </div>
              </div>
            </div>
            
            {/* Year Toggles */}
            <div className="flex justify-between mt-8 gap-4 bg-black/20 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
              {[10, 20, 30].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYears(yr as 10|20|30)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedYears === yr 
                      ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105' 
                      : 'bg-transparent text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
                >
                  {yr} Years
                </button>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-purple-500/10 text-purple-500 mb-8 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground/90">The Opportunity Ripple</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Money spent is money that can no longer compound. If you invested this instead at a historical 7% return, it would become <strong className="text-purple-400">{formatCurrency(maxFutureValue, currency)}</strong> in 30 years.
            </p>
            <p className="text-lg text-foreground mt-6 font-semibold opacity-90 leading-relaxed">
              This {item || 'decision'} isn't just costing you today. It's actively withdrawing from your future.
            </p>
          </div>
        </div>
      </OriginalInsightCard>
    </OriginalStep>
  );
}
