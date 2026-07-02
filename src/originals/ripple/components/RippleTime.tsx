import { useRipple } from "../store/useRippleStore";
import { OriginalStep } from "../../core/OriginalStep";
import { OriginalInsightCard } from "../../core/OriginalInsightCard";
import { calculateTimeCost, calculateTimeEquivalents, NATIONAL_AVG_WAGE, formatCurrency } from "../utils/calculations";
import { Hourglass } from "lucide-react";

export function RippleTime() {
  const { cost, hourlyWage, intent, customIntent, currency } = useRipple();
  
  const wage = hourlyWage && hourlyWage > 0 ? hourlyWage : NATIONAL_AVG_WAGE;
  const hours = calculateTimeCost(cost, wage);
  const displayIntent = intent === 'Other' ? customIntent : (intent || 'decision');
  const equivalents = calculateTimeEquivalents(hours);

  return (
    <OriginalStep isActive={true}>
      <OriginalInsightCard accentColor="bg-blue-500" className="w-full max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-500/10 text-blue-500 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Hourglass className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground/90">The Time Ripple</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Time is the only currency you never earn back. You are trading <strong className="text-foreground">{hours} hours</strong> of your lifetime for this {displayIntent.toLowerCase()}.
            </p>
            {equivalents && (
              <p className="text-xl text-blue-400 font-bold mt-5 tracking-wide drop-shadow-sm">
                {equivalents}
              </p>
            )}
            {!hourlyWage && (
              <p className="text-xs text-muted-foreground mt-8 opacity-50 font-medium">
                *Estimated using a fallback median wage of {formatCurrency(NATIONAL_AVG_WAGE, currency)}/hr after taxes.
              </p>
            )}
          </div>
          
          <div className="flex justify-center items-center">
            {/* Visual representation of time */}
            <div className="relative w-64 h-64 border-[6px] border-white/5 rounded-full flex items-center justify-center bg-card/40 backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 rounded-full border-t-[6px] border-blue-500 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border-r-[6px] border-blue-400/30 animate-[spin_8s_linear_infinite_reverse]" />
              <div className="text-center relative z-10">
                <span className="block text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-600 drop-shadow-md">
                  {hours}
                </span>
                <span className="block text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mt-3">Hours</span>
              </div>
            </div>
          </div>
        </div>
      </OriginalInsightCard>
    </OriginalStep>
  );
}
