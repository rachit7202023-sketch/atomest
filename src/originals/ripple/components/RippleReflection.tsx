import { useState } from "react";
import { useRipple } from "../store/useRippleStore";
import { OriginalStep, OriginalStepContent } from "../../core/OriginalStep";
import { ShareCard } from "./ShareCard";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw } from "lucide-react";
import { useShareCard } from "../hooks/useShareCard";

export function RippleReflection() {
  const { initialConfidence, finalConfidence, setFinalConfidence, reset, item } = useRipple();
  const [isFinalized, setIsFinalized] = useState(false);
  const { generateShareCard, isGenerating } = useShareCard();

  const getConfidenceColor = () => {
    if (finalConfidence > initialConfidence) return "text-emerald-400"; 
    if (finalConfidence < initialConfidence) return "text-blue-400"; 
    return "text-primary"; 
  };

  const getGlowColor = () => {
    if (finalConfidence > initialConfidence) return "rgba(52,211,153,0.3)"; 
    if (finalConfidence < initialConfidence) return "rgba(96,165,250,0.3)"; 
    return "rgba(168,85,247,0.3)"; 
  };

  return (
    <OriginalStep isActive={true}>
      <OriginalStepContent className="max-w-3xl">
        <AnimatePresence mode="wait">
          {!isFinalized ? (
            <motion.div 
              key="final-question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground/90">The Final Question</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-16 max-w-xl mx-auto">
                Having seen the ripples, how confident are you about {item || "this decision"} now?
              </p>
              
              <div className="w-full max-w-xl mx-auto bg-card/60 border border-white/5 rounded-[2.5rem] p-10 sm:p-14 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />

                <div className="relative z-10 w-full px-2">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={finalConfidence} 
                    onChange={e => setFinalConfidence(Number(e.target.value))}
                    className="w-full accent-primary h-2.5 bg-white/5 rounded-full appearance-none outline-none mb-6 cursor-pointer shadow-inner hover:bg-white/10 transition-colors"
                  />
                  <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest mb-16">
                    <span className="transition-colors hover:text-foreground">Reconsidering</span>
                    <span className="text-foreground text-2xl font-black drop-shadow-md">{finalConfidence}%</span>
                    <span className="transition-colors hover:text-foreground">Absolutely Sure</span>
                  </div>
                  
                  <button 
                    onClick={() => setIsFinalized(true)} 
                    className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-extrabold text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95 overflow-hidden w-full"
                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', boxShadow: '0 10px 40px -10px rgba(124,58,237,0.7)' }}
                  >
                    <span className="relative z-10 tracking-wide uppercase">Lock My Reflection</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="reflection"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-24 mt-10">
                <div className="flex justify-center items-center gap-6 sm:gap-16">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-center flex-1"
                  >
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Initial Instinct</div>
                    <div className="text-5xl md:text-7xl font-extrabold text-muted-foreground/30">{initialConfidence}%</div>
                  </motion.div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
                      className="my-4 text-white/20"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  </div>
                  
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-center flex-1"
                  >
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">After Ripple</div>
                    <motion.div 
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4, delay: 1 }}
                      className={`text-6xl md:text-8xl font-black ${getConfidenceColor()}`}
                      style={{ textShadow: `0 10px 40px ${getGlowColor()}` }}
                    >
                      {finalConfidence}%
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-foreground/90 leading-tight">
                  Every decision writes a line<br className="hidden sm:block"/> in the story of your future.
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
                  Ripple isn't here to judge you. It simply exists to help you see the waves before you throw the stone. What happens next is entirely up to you.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={generateShareCard}
                    disabled={isGenerating}
                    className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-black bg-white hover:bg-white/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    {isGenerating ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <Share2 className="h-5 w-5 transition-transform group-hover:scale-110" />
                    )}
                    {isGenerating ? "Generating..." : "Save Reflection"}
                  </button>
                  <button 
                    onClick={reset}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all w-full sm:w-auto active:scale-95"
                  >
                    <RotateCcw className="h-5 w-5" /> Start Over
                  </button>
                </div>
              </motion.div>

              {/* Hidden share card mounted for html-to-image to capture */}
              <div className="absolute top-0 left-0 w-[1080px] h-[1920px] pointer-events-none opacity-0 z-[-100] overflow-hidden" style={{ transform: 'scale(0.1)', transformOrigin: 'top left' }}>
                <div id="ripple-share-card">
                  <ShareCard />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </OriginalStepContent>
    </OriginalStep>
  );
}

function ArrowRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
