import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRipple, CurrencyType } from "../store/useRippleStore";
import { OriginalStepContent } from "../../core/OriginalStep";
import { formatCurrency } from "../utils/calculations";

const CURRENCIES: CurrencyType[] = ["USD", "INR", "EUR", "GBP", "JPY", "AED", "CAD", "AUD"];

const INTENTS = [
  'Need', 'Replacement', 'Upgrade', 'Luxury', 'Investment', 
  'Education', 'Business', 'Career', 'Health', 'Travel', 
  'Experience', 'Family', 'Emergency', 'Gift', 'Dream', 'Other'
];

export function RippleInputSection() {
  const { 
    item, setItem, cost, setCost, currency, setCurrency, 
    intent, setIntent, customIntent, setCustomIntent,
    initialConfidence, setInitialConfidence, hourlyWage, setHourlyWage,
    isPebbleDropped, dropPebble 
  } = useRipple();
  
  const [currentStep, setCurrentStep] = useState(0);

  if (isPebbleDropped) return null;

  // Premium spring animation configuration
  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 };
  const smoothTransition = { duration: 0.5, ease: "easeOut" as const }; // Expo ease out

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-20 relative w-full">
      <OriginalStepContent className="w-full max-w-2xl mx-auto px-4 sm:px-0">
        
        {/* PROGRESSIVE ONBOARDING CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={smoothTransition}
          className="relative w-full bg-card/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-14 shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Currency Selector (Top Right) */}
          <div className="absolute top-6 right-8 z-20">
            <div className="relative group">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyType)}
                className="bg-transparent border border-white/10 text-muted-foreground text-sm rounded-full px-4 py-1.5 outline-none focus:border-primary/50 cursor-pointer appearance-none hover:text-foreground transition-all hover:bg-white/5"
              >
                {CURRENCIES.map(c => <option key={c} value={c} className="bg-card text-foreground">{c}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col relative z-10">
            <AnimatePresence initial={false}>
              
              {/* Step 0: Decision / Item */}
              <motion.div
                key="step-0"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, filter: currentStep > 0 ? "blur(3px)" : "blur(0px)" }}
                transition={springTransition}
                className={currentStep > 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}
              >
                {currentStep > 0 ? (
                  <div className="flex justify-between items-center border-b border-white/5 pb-5">
                    <span className="text-muted-foreground text-sm font-medium tracking-wide">Decision</span>
                    <span className="font-semibold text-foreground/80">{item}</span>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 text-foreground/90 leading-tight">
                      What decision are you thinking about?
                    </h2>
                    <input 
                      type="text"
                      value={item}
                      onChange={e => setItem(e.target.value)}
                      placeholder="e.g. Buying a new car, Quitting my job..."
                      className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary text-2xl sm:text-3xl pb-4 outline-none placeholder:text-muted-foreground/20 font-bold transition-all text-foreground"
                      autoFocus
                      onKeyDown={e => e.key === 'Enter' && item.trim() && setCurrentStep(1)}
                    />
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: item.trim() ? 1 : 0, y: item.trim() ? 0 : 10 }} transition={springTransition} className="mt-8 flex justify-end">
                      <button onClick={() => setCurrentStep(1)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-semibold text-sm active:scale-95">
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {/* Step 1: Cost */}
              {currentStep >= 1 && (
                <motion.div
                  key="step-1"
                  layout
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0, filter: currentStep > 1 ? "blur(3px)" : "blur(0px)" }}
                  transition={springTransition}
                  className={currentStep > 1 ? 'opacity-30 pointer-events-none' : 'opacity-100'}
                >
                  {currentStep > 1 ? (
                    <div className="flex justify-between items-center border-b border-white/5 pb-5 mt-5">
                      <span className="text-muted-foreground text-sm font-medium tracking-wide">Cost</span>
                      <span className="font-semibold text-foreground/80">{formatCurrency(cost, currency)}</span>
                    </div>
                  ) : (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 text-foreground/90">
                        How much does it cost?
                      </h2>
                      <div className="relative inline-flex items-center w-full group">
                        <span className="absolute left-0 text-3xl sm:text-4xl font-bold text-muted-foreground/40 group-focus-within:text-primary transition-colors">
                          {currency === "USD" || currency === "CAD" || currency === "AUD" ? "$" : 
                           currency === "INR" ? "₹" : 
                           currency === "EUR" ? "€" : 
                           currency === "GBP" ? "£" : 
                           currency === "JPY" ? "¥" : "AED"}
                        </span>
                        <input 
                          type="number"
                          inputMode="decimal"
                          value={cost || ''}
                          onChange={e => setCost(Number(e.target.value))}
                          placeholder="0"
                          className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary text-4xl sm:text-5xl pb-4 pl-10 sm:pl-12 outline-none font-bold transition-all text-foreground"
                          autoFocus
                          onKeyDown={e => e.key === 'Enter' && cost > 0 && setCurrentStep(2)}
                        />
                      </div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: cost > 0 ? 1 : 0, y: cost > 0 ? 0 : 10 }} transition={springTransition} className="mt-8 flex justify-end">
                        <button onClick={() => setCurrentStep(2)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-semibold text-sm active:scale-95">
                          Continue <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Intent */}
              {currentStep >= 2 && (
                <motion.div
                  key="step-2"
                  layout
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0, filter: currentStep > 2 ? "blur(3px)" : "blur(0px)" }}
                  transition={springTransition}
                  className={currentStep > 2 ? 'opacity-30 pointer-events-none' : 'opacity-100'}
                >
                  {currentStep > 2 ? (
                    <div className="flex justify-between items-center border-b border-white/5 pb-5 mt-5">
                      <span className="text-muted-foreground text-sm font-medium tracking-wide">Intent</span>
                      <span className="font-semibold text-foreground/80">{intent === 'Other' ? customIntent : intent}</span>
                    </div>
                  ) : (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 text-foreground/90">
                        What's the motivation?
                      </h2>
                      <div className="flex flex-wrap gap-2.5 mb-6">
                        {INTENTS.map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setIntent(opt);
                              if (opt !== 'Other') setCurrentStep(3);
                            }}
                            className={`px-5 py-2.5 rounded-full border border-white/10 text-sm font-semibold transition-all duration-300 ${intent === opt ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-[0_0_15px_rgba(var(--primary),0.4)]' : 'bg-card/40 hover:bg-white/10 text-muted-foreground hover:text-foreground hover:scale-[1.02] active:scale-95'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      
                      <AnimatePresence>
                        {intent === 'Other' && (
                          <motion.div initial={{ opacity: 0, height: 0, y: 10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: 10 }} transition={springTransition}>
                            <input 
                              type="text"
                              value={customIntent}
                              onChange={e => setCustomIntent(e.target.value)}
                              placeholder="Tell us a bit more..."
                              className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary text-xl pb-3 outline-none font-medium transition-all text-foreground mt-4 placeholder:text-muted-foreground/30"
                              autoFocus
                              onKeyDown={e => e.key === 'Enter' && customIntent.trim() && setCurrentStep(3)}
                            />
                            <div className="mt-8 flex justify-end">
                              <button onClick={() => customIntent.trim() && setCurrentStep(3)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-semibold text-sm active:scale-95">
                                Continue <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Confidence */}
              {currentStep >= 3 && (
                <motion.div
                  key="step-3"
                  layout
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0, filter: currentStep > 3 ? "blur(3px)" : "blur(0px)" }}
                  transition={springTransition}
                  className={currentStep > 3 ? 'opacity-30 pointer-events-none' : 'opacity-100'}
                >
                  {currentStep > 3 ? (
                    <div className="flex justify-between items-center border-b border-white/5 pb-5 mt-5">
                      <span className="text-muted-foreground text-sm font-medium tracking-wide">Instinct</span>
                      <span className="font-semibold text-foreground/80">{initialConfidence}% Certain</span>
                    </div>
                  ) : (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-foreground/90">
                        How confident are you?
                      </h2>
                      <p className="text-muted-foreground text-base mb-10 font-medium">
                        Trust your first instinct. There are no wrong answers here.
                      </p>
                      
                      <div className="w-full">
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={initialConfidence} 
                          onChange={e => setInitialConfidence(Number(e.target.value))}
                          className="w-full accent-primary h-2.5 bg-white/5 rounded-full appearance-none outline-none mb-6 cursor-pointer shadow-inner"
                        />
                        <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest mb-10">
                          <span className="transition-colors hover:text-foreground">Hesitant</span>
                          <span className="text-foreground text-xl font-black drop-shadow-md">{initialConfidence}%</span>
                          <span className="transition-colors hover:text-foreground">Absolutely Sure</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <button onClick={() => setCurrentStep(4)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-semibold text-sm active:scale-95">
                            Continue <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Hourly Wage */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  layout
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  transition={springTransition}
                >
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-foreground/90">
                      One final detail.
                    </h2>
                    <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-lg font-medium">
                      This step is optional, but it allows Ripple to translate the true cost of your decision into actual pieces of your life. What is your approximate hourly wage?
                    </p>
                    
                    <div className="relative inline-flex items-center w-full max-w-[220px] mb-12 group">
                      <span className="absolute left-0 text-2xl font-bold text-muted-foreground/40 group-focus-within:text-primary transition-colors">
                        {currency === "USD" || currency === "CAD" || currency === "AUD" ? "$" : 
                         currency === "INR" ? "₹" : 
                         currency === "EUR" ? "€" : 
                         currency === "GBP" ? "£" : 
                         currency === "JPY" ? "¥" : "AED"}
                      </span>
                      <input 
                        type="number"
                        inputMode="decimal"
                        value={hourlyWage || ''}
                        onChange={e => setHourlyWage(Number(e.target.value))}
                        placeholder="30"
                        className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary text-2xl sm:text-3xl pb-3 pl-8 pr-16 outline-none font-bold transition-all text-foreground"
                        autoFocus
                        onKeyDown={e => e.key === 'Enter' && dropPebble()}
                      />
                      <span className="absolute right-0 text-sm font-bold text-muted-foreground/50 bottom-4 uppercase tracking-widest">/ HR</span>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={dropPebble} 
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-sm font-extrabold text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95 overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', boxShadow: '0 10px 40px -10px rgba(124,58,237,0.8)' }}
                      >
                        <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase">Reveal My Ripple <ArrowRight className="h-4 w-4" /></span>
                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </OriginalStepContent>
    </div>
  );
}
