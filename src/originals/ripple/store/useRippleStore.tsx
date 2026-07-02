import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export type CurrencyType = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'AED' | 'CAD' | 'AUD';

interface RippleState {
  // Setup
  item: string;
  cost: number;
  currency: CurrencyType;
  intent: string;
  customIntent: string;
  initialConfidence: number;
  hourlyWage: number | null;
  
  // Journey State
  isPebbleDropped: boolean;
  
  // Reflection
  regretNotBuying: number;
  regretBuying: number;
  finalConfidence: number;

  // Actions
  setItem: (val: string) => void;
  setCost: (val: number) => void;
  setCurrency: (val: CurrencyType) => void;
  setIntent: (val: string) => void;
  setCustomIntent: (val: string) => void;
  setInitialConfidence: (val: number) => void;
  setHourlyWage: (val: number | null) => void;
  dropPebble: () => void;
  setRegretNotBuying: (val: number) => void;
  setRegretBuying: (val: number) => void;
  setFinalConfidence: (val: number) => void;
  reset: () => void;
}

const RippleContext = createContext<RippleState | undefined>(undefined);

export function RippleProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>("USD");
  const [intent, setIntent] = useState("");
  const [customIntent, setCustomIntent] = useState("");
  const [initialConfidence, setInitialConfidence] = useState(50);
  const [hourlyWage, setHourlyWage] = useState<number | null>(null);
  
  const [isPebbleDropped, setIsPebbleDropped] = useState(false);
  
  const [regretNotBuying, setRegretNotBuying] = useState(50);
  const [regretBuying, setRegretBuying] = useState(50);
  const [finalConfidence, setFinalConfidence] = useState(50);

  const dropPebble = () => setIsPebbleDropped(true);
  
  const reset = () => {
    setItem("");
    setCost(0);
    setIntent("");
    setCustomIntent("");
    setInitialConfidence(50);
    setHourlyWage(null);
    setIsPebbleDropped(false);
    setRegretNotBuying(50);
    setRegretBuying(50);
    setFinalConfidence(50);
  };

  const value = useMemo(() => ({
    item, cost, currency, intent, customIntent, initialConfidence, hourlyWage,
    isPebbleDropped,
    regretNotBuying, regretBuying, finalConfidence,
    setItem, setCost, setCurrency, setIntent, setCustomIntent, setInitialConfidence, setHourlyWage,
    dropPebble, setRegretNotBuying, setRegretBuying, setFinalConfidence,
    reset
  }), [
    item, cost, currency, intent, customIntent, initialConfidence, hourlyWage, 
    isPebbleDropped, regretNotBuying, regretBuying, finalConfidence
  ]);

  return (
    <RippleContext.Provider value={value}>
      {children}
    </RippleContext.Provider>
  );
}

export function useRipple() {
  const context = useContext(RippleContext);
  if (context === undefined) {
    throw new Error("useRipple must be used within a RippleProvider");
  }
  return context;
}
