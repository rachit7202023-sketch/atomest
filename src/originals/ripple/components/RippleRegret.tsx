import { useRipple } from "../store/useRippleStore";
import { OriginalStep, OriginalStepContent } from "../../core/OriginalStep";
import { Brain } from "lucide-react";

export function RippleRegret() {
  const { 
    regretNotBuying, setRegretNotBuying,
    regretBuying, setRegretBuying 
  } = useRipple();

  return (
    <OriginalStep isActive={true}>
      <OriginalStepContent className="max-w-3xl">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 text-muted-foreground mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Brain className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground/90">Future Reflection</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Take a moment to imagine exactly one year from today. Let's map how you might feel about this decision in hindsight.
          </p>
        </div>

        <div className="space-y-12">
          {/* Scenario A */}
          <div className="bg-card/40 border border-white/5 rounded-[2.5rem] p-10 sm:p-14 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-foreground/90 relative z-10">Scenario A: You walk away.</h3>
            <p className="text-lg text-muted-foreground mb-12 font-medium leading-relaxed relative z-10">
              You decide not to do this. Twelve months pass. Looking back, how much do you regret missing out?
            </p>
            
            <div className="relative z-10 w-full px-2">
              <input 
                type="range" 
                min="0" max="100" 
                value={regretNotBuying} 
                onChange={e => setRegretNotBuying(Number(e.target.value))}
                className="w-full accent-primary h-2.5 bg-white/5 rounded-full appearance-none outline-none mb-6 cursor-pointer shadow-inner hover:bg-white/10 transition-colors"
              />
              <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span className="transition-colors hover:text-foreground">Relieved</span>
                <span className="text-foreground text-xl font-black drop-shadow-md">{regretNotBuying}% Regret</span>
                <span className="transition-colors hover:text-foreground">Deeply Regret</span>
              </div>
            </div>
          </div>

          {/* Scenario B */}
          <div className="bg-card/40 border border-white/5 rounded-[2.5rem] p-10 sm:p-14 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-foreground/90 relative z-10">Scenario B: You go for it.</h3>
            <p className="text-lg text-muted-foreground mb-12 font-medium leading-relaxed relative z-10">
              You make the commitment. A year later, the novelty has faded. How much do you regret the cost?
            </p>
            
            <div className="relative z-10 w-full px-2">
              <input 
                type="range" 
                min="0" max="100" 
                value={regretBuying} 
                onChange={e => setRegretBuying(Number(e.target.value))}
                className="w-full accent-rose-500 h-2.5 bg-white/5 rounded-full appearance-none outline-none mb-6 cursor-pointer shadow-inner hover:bg-white/10 transition-colors"
              />
              <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span className="transition-colors hover:text-foreground">Worth It</span>
                <span className="text-foreground text-xl font-black drop-shadow-md">{regretBuying}% Regret</span>
                <span className="transition-colors hover:text-foreground">Deeply Regret</span>
              </div>
            </div>
          </div>
        </div>
      </OriginalStepContent>
    </OriginalStep>
  );
}
