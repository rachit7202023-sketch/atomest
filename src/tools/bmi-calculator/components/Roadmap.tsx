import { Flag, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { format, addMonths } from "date-fns";

interface RoadmapProps {
  currentWeight: number;
  targetWeight: number;
  isMetric: boolean;
  weeklyChangeKg: number;
}

export function Roadmap({ currentWeight, targetWeight, isMetric, weeklyChangeKg }: RoadmapProps) {
  const diff = targetWeight - currentWeight;
  const isLosing = diff < 0;
  
  if (Math.abs(diff) < 0.5) {
    return null; // Already at goal weight
  }

  // Assuming a safe rate of 0.5kg (1lb) per week for the visual timeline
  const safeWeeklyChange = 0.5; 
  const totalWeeks = Math.abs(diff) / safeWeeklyChange;
  const totalMonths = totalWeeks / 4.345;

  const steps = [
    { label: "Today", date: new Date(), weight: currentWeight, icon: isLosing ? TrendingDown : TrendingUp },
    { label: "Month 1", date: addMonths(new Date(), 1), weight: currentWeight + (isLosing ? -2 : 2) },
    { label: "Month 3", date: addMonths(new Date(), 3), weight: currentWeight + (isLosing ? -6 : 6) },
    { label: "Goal", date: addMonths(new Date(), Math.max(3, Math.round(totalMonths))), weight: targetWeight, icon: Flag },
  ];

  // Adjust steps if the goal is very close
  if (totalMonths < 3) {
    steps[2] = steps[3];
    steps.pop();
  }
  if (totalMonths < 1) {
    steps[1] = steps[2];
    steps.pop();
  }

  const unit = isMetric ? "kg" : "lbs";
  const displayWeight = (w: number) => {
    return isMetric ? w.toFixed(1) : (w * 2.20462).toFixed(1);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
      <h3 className="font-bold text-xl tracking-tight mb-6">Progress Roadmap</h3>
      
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-5 left-[20px] right-[20px] h-[2px] bg-muted/50 hidden sm:block" />
        
        <div className="flex flex-col sm:flex-row justify-between gap-6 relative z-10">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const Icon = step.icon || ArrowRight;
            const isGoal = isLast && step.label === "Goal";
            
            return (
              <div key={i} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-3 flex-1 relative">
                {/* Mobile connection line */}
                {i !== steps.length - 1 && (
                  <div className="absolute left-[19px] top-[40px] bottom-[-24px] w-[2px] bg-muted/50 sm:hidden" />
                )}
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-card relative z-10 ${isGoal ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex flex-col sm:items-center py-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {step.label}
                  </div>
                  <div className="font-bold text-lg leading-none mb-1">
                    {displayWeight(step.weight)} <span className="text-xs text-muted-foreground font-medium">{unit}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(step.date, "MMM yyyy")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="pt-4 mt-2 border-t flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Estimated completion</span>
        <span className="font-bold">{format(steps[steps.length - 1].date, "MMMM yyyy")}</span>
      </div>
    </div>
  );
}
