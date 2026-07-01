import { Activity, Flame, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { calculateTDEE } from "../utils";

interface CaloriePlannerProps {
  currentWeightKg: number;
  targetWeightKg: number;
  tdee: number;
  isMetric: boolean;
}

export function CaloriePlanner({ currentWeightKg, targetWeightKg, tdee, isMetric }: CaloriePlannerProps) {
  const diffKg = targetWeightKg - currentWeightKg;
  const isLosing = diffKg < 0;
  
  if (Math.abs(diffKg) < 0.5) {
    return (
      <div className="bg-card border rounded-2xl p-6 shadow-sm mt-6 flex items-start gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <Activity className="h-6 w-6 text-emerald-500" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">Maintenance Mode</h4>
          <p className="text-muted-foreground text-sm">
            You are currently at a healthy weight. To maintain this weight, you should consume approximately 
            <strong className="text-foreground ml-1">{Math.round(tdee)} kcal</strong> per day.
          </p>
        </div>
      </div>
    );
  }

  // 1 kg of fat is ~7700 kcal
  const totalKcalDiff = Math.abs(diffKg) * 7700;
  
  const plans = [
    { months: 3, days: 90 },
    { months: 6, days: 180 },
    { months: 9, days: 270 },
  ].map(plan => {
    const dailyDiff = Math.round(totalKcalDiff / plan.days);
    const targetCalories = isLosing ? tdee - dailyDiff : tdee + dailyDiff;
    const weeklyChangeKg = Math.abs(diffKg) / (plan.days / 7);
    const weeklyChangeLbs = weeklyChangeKg * 2.20462;
    
    // Safety caps: Don't recommend < 1200 kcal or huge surpluses, but we just flag them
    const isExtreme = isLosing && targetCalories < 1200;
    
    return {
      ...plan,
      dailyDiff,
      targetCalories: Math.round(targetCalories),
      weeklyChange: isMetric ? `${weeklyChangeKg.toFixed(2)} kg` : `${weeklyChangeLbs.toFixed(2)} lbs`,
      isExtreme
    };
  });

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2.5 rounded-xl ${isLosing ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-xl tracking-tight">Calorie Planner</h3>
          <p className="text-muted-foreground text-sm">Estimated targets to reach your healthy weight</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div key={i} className={`relative p-5 rounded-xl border ${plan.isExtreme ? 'border-red-200 dark:border-red-900/50 opacity-70' : 'hover:border-primary/50 transition-colors'}`}>
            {plan.isExtreme && (
              <div className="absolute -top-2.5 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Extreme
              </div>
            )}
            <div className="text-sm font-semibold text-muted-foreground mb-1">{plan.months} Month Plan</div>
            <div className="text-2xl font-black tabular-nums tracking-tighter mb-4">
              {plan.targetCalories} <span className="text-base font-medium text-muted-foreground">kcal/day</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Daily {isLosing ? 'Deficit' : 'Surplus'}</span>
                <span className={`font-semibold flex items-center ${isLosing ? 'text-orange-500' : 'text-blue-500'}`}>
                  {isLosing ? <ArrowDownRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />}
                  {plan.dailyDiff} kcal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weekly Change</span>
                <span className="font-semibold">{plan.weeklyChange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-muted/50 p-4 rounded-xl text-xs text-muted-foreground border">
        <strong>Disclaimer:</strong> These are mathematical estimates based on 7,700 kcal per kg of body tissue. Actual results vary based on metabolism, hormones, and body composition. Do not consume less than 1,200 calories (women) or 1,500 calories (men) per day without medical supervision.
      </div>
    </div>
  );
}
