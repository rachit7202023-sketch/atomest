import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, Activity, AlertTriangle } from "lucide-react";

interface BMIGaugeProps {
  bmi: number;
}

// THE SINGLE SOURCE OF TRUTH FOR ALL GEOMETRY
function bmiToAngle(bmi: number) {
  const normalized = Math.max(0, Math.min(1, (bmi - 10) / 30));
  // -90 degrees is far left (BMI 10)
  //   0 degrees is top center (BMI 25)
  //  90 degrees is far right (BMI 40)
  return -90 + normalized * 180;
}

export function BMIGauge({ bmi }: BMIGaugeProps) {
  const [animatedBmi, setAnimatedBmi] = useState(0);

  // Animate the BMI value manually in requestAnimationFrame
  // This completely eliminates the need for CSS/Framer transform animations
  // on the needle, guaranteeing mathematical precision for the rotation.
  useEffect(() => {
    let start = animatedBmi;
    const duration = 800; // ms
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // ease out quart
      setAnimatedBmi(start + (bmi - start) * easeProgress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedBmi(bmi);
      }
    };
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bmi]);

  // Categories definition
  const categories = [
    { name: "Under", min: 10, max: 18.5, color: "#3b82f6", icon: Info }, // blue
    { name: "Healthy", min: 18.5, max: 25, color: "#10b981", icon: CheckCircle2 }, // emerald
    { name: "Over", min: 25, max: 30, color: "#eab308", icon: Activity }, // yellow
    { name: "Obese I", min: 30, max: 35, color: "#f97316", icon: AlertTriangle }, // orange
    { name: "Obese II+", min: 35, max: 40, color: "#ef4444", icon: AlertCircle }, // red
  ];

  const currentCategory = categories.find(c => bmi >= c.min && bmi < c.max) || (bmi >= 40 ? categories[4] : categories[0]);
  const Icon = currentCategory.icon;

  // Calculate the needle rotation using the exact same function as everything else
  const needleAngle = bmiToAngle(animatedBmi);

  // Helper for drawing perfectly mapped SVG arcs
  const createArc = (min: number, max: number, radius: number) => {
    const clampedMin = Math.max(10, min);
    const clampedMax = Math.min(40, max);
    
    const startAngle = bmiToAngle(clampedMin);
    const endAngle = bmiToAngle(clampedMax);
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const cx = 150;
    const cy = 150;
    
    // Geometry logic: 0 rad is pointing straight UP. -PI/2 is LEFT. PI/2 is RIGHT.
    const x1 = cx + radius * Math.sin(startRad);
    const y1 = cy - radius * Math.cos(startRad);
    const x2 = cx + radius * Math.sin(endRad);
    const y2 = cy - radius * Math.cos(endRad);
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto flex flex-col items-center">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: currentCategory.color }}
      />
      
      <svg viewBox="0 0 300 170" className="w-full h-auto drop-shadow-xl overflow-visible">
        {/* Background track mapped accurately */}
        <path d={createArc(10, 40, 120)} fill="none" stroke="currentColor" strokeWidth="20" className="text-muted/20" strokeLinecap="round" />
        
        {/* Colored Segments */}
        {categories.map((cat, i) => (
          <path 
            key={i}
            d={createArc(cat.min, cat.max, 120)} 
            fill="none" 
            stroke={cat.color} 
            strokeWidth="20" 
            opacity="0.8"
          />
        ))}

        {/* Ticks & Labels */}
        {[10, 18.5, 25, 30, 35, 40].map((tickBmi, i) => {
          const tickAngle = bmiToAngle(tickBmi);
          const tickRad = (tickAngle * Math.PI) / 180;
          const cx = 150;
          const cy = 150;
          
          const x1 = cx + 105 * Math.sin(tickRad);
          const y1 = cy - 105 * Math.cos(tickRad);
          const x2 = cx + 135 * Math.sin(tickRad);
          const y2 = cy - 135 * Math.cos(tickRad);
          
          const labelX = cx + 148 * Math.sin(tickRad);
          const labelY = cy - 148 * Math.cos(tickRad);
          
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
              <text x={labelX} y={labelY} fill="currentColor" fontSize="10" fontWeight="600" textAnchor="middle" dominantBaseline="middle" className="text-muted-foreground">
                {tickBmi}
              </text>
            </g>
          );
        })}

        {/* 
          Needle Group 
          Pure SVG transformation around the strictly fixed pivot (150, 150).
          Zero CSS layout animations, zero translations, zero offsets.
          The needle base is drawn at (150,150) and points to (150,30) which is 0 degrees (UP).
        */}
        <g transform={`rotate(${needleAngle} 150 150)`}>
          {/* Needle shadow */}
          <polygon points="148,154 156,154 152,44" fill="rgba(0,0,0,0.2)" />
          {/* Needle body */}
          <polygon points="147,150 153,150 150,30" fill="currentColor" className="text-foreground" />
          {/* Center pivot */}
          <circle cx="150" cy="150" r="8" fill="currentColor" className="text-foreground" />
          <circle cx="150" cy="150" r="3" fill="var(--background)" />
        </g>
      </svg>
      
      <div className="text-center mt-[-10px] relative z-10 flex flex-col items-center">
        <div className="text-6xl font-black tabular-nums tracking-tighter drop-shadow-sm" style={{ color: currentCategory.color }}>
          {animatedBmi.toFixed(1)}
        </div>
        <div className="flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-background/50 border backdrop-blur-sm shadow-sm">
          <Icon className="h-4 w-4" style={{ color: currentCategory.color }} />
          <span className="font-bold text-sm uppercase tracking-wider" style={{ color: currentCategory.color }}>
            {currentCategory.name}
          </span>
        </div>
      </div>
    </div>
  );
}
