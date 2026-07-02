import { useRipple } from "../store/useRippleStore";
import { calculateTimeCost, calculateOpportunityCost, formatCurrency, NATIONAL_AVG_WAGE } from "../utils/calculations";

export function ShareCard() {
  const { 
    item, cost, intent, customIntent, currency,
    hourlyWage, initialConfidence, finalConfidence 
  } = useRipple();

  const wage = hourlyWage && hourlyWage > 0 ? hourlyWage : NATIONAL_AVG_WAGE;
  const hours = calculateTimeCost(cost, wage);
  const future30 = calculateOpportunityCost(cost, 30);
  
  const displayIntent = intent === 'Other' ? customIntent : (intent || 'Decision');
  const isConfidenceUp = finalConfidence >= initialConfidence;

  return (
    <div className="w-[1080px] h-[1920px] bg-[#050505] text-white p-24 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Aesthetics */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-purple-600/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-blue-600/10 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4" />
      
      <div className="relative z-10 flex-1 flex flex-col h-full">
        {/* Header Area */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="inline-block border border-white/20 rounded-full px-8 py-2 text-2xl font-bold tracking-[0.3em] uppercase text-white mb-12 backdrop-blur-md bg-white/5">
            Atomest Originals
          </div>
          <h1 className="text-[140px] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
            Ripple
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent my-12" />
          <h2 className="text-6xl text-white/90 font-medium max-w-4xl truncate leading-tight drop-shadow-md">
            "{item || 'My Decision'}"
          </h2>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-12 mt-auto mb-20">
          <div className="p-16 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="text-3xl font-bold uppercase tracking-widest text-muted-foreground mb-4">Intent</div>
            <div className="text-7xl font-bold text-white truncate drop-shadow-sm">{displayIntent}</div>
          </div>
          <div className="p-16 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="text-3xl font-bold uppercase tracking-widest text-muted-foreground mb-4">Cost</div>
            <div className="text-7xl font-bold text-white truncate drop-shadow-sm">{formatCurrency(cost, currency)}</div>
          </div>
          
          <div className="p-16 rounded-[3rem] bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="text-3xl font-bold uppercase tracking-widest text-blue-300 mb-4 relative z-10">Time Cost</div>
            <div className="text-[100px] font-black text-white leading-none tracking-tight relative z-10 drop-shadow-lg">
              {hours} <span className="text-5xl text-blue-200 font-bold tracking-normal">Hrs</span>
            </div>
          </div>
          <div className="p-16 rounded-[3rem] bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/30 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="text-3xl font-bold uppercase tracking-widest text-purple-300 mb-4 relative z-10">Opportunity Cost</div>
            <div className="text-[100px] font-black text-white leading-none tracking-tight relative z-10 drop-shadow-lg">
              {formatCurrency(future30, currency)}
            </div>
            <div className="text-2xl font-bold text-purple-300/60 mt-4 relative z-10 tracking-widest uppercase">30-Year Projection</div>
          </div>
        </div>

        {/* Confidence Shift */}
        <div className="p-16 rounded-[3rem] bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-3xl flex items-center justify-between shadow-2xl">
          <div className="text-4xl font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            Confidence Shift
          </div>
          <div className="flex items-center gap-16">
            <div className="text-[90px] font-black text-white/30">{initialConfidence}%</div>
            <div className="text-5xl text-white/20">→</div>
            <div className={`text-[110px] font-black drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] ${isConfidenceUp ? 'text-emerald-400' : 'text-blue-400'}`}>
              {finalConfidence}%
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-16 mt-16 border-t-2 border-white/10 flex justify-between items-center text-white/60">
        <div className="text-4xl font-extrabold tracking-wide text-white">atomest.com<span className="text-white/40 font-medium">/originals/ripple</span></div>
        <div className="text-3xl font-medium tracking-widest uppercase">See the waves before you throw the stone.</div>
      </div>
    </div>
  );
}
