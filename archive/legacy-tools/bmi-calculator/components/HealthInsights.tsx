import { Info, HeartPulse, Dumbbell, Apple, AlertTriangle } from "lucide-react";

interface HealthInsightsProps {
  category: string;
}

export function HealthInsights({ category }: HealthInsightsProps) {
  const getInsights = () => {
    switch (category) {
      case "Underweight":
        return {
          title: "Underweight Insights",
          desc: "Being underweight may compromise your immune system and lead to nutritional deficiencies.",
          lifestyle: "Focus on nutrient-dense foods rather than just high-calorie junk foods.",
          exercise: "Incorporate strength training to build muscle mass safely.",
          nutrition: "Eat more frequent meals and include healthy fats like nuts, avocados, and olive oil.",
          icon: AlertTriangle,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        };
      case "Healthy Weight":
        return {
          title: "Healthy Weight Insights",
          desc: "Great job! Maintaining this weight significantly reduces your risk of chronic diseases.",
          lifestyle: "Continue your current balanced lifestyle to maintain this healthy state.",
          exercise: "Aim for 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity a week.",
          nutrition: "Maintain a balanced diet rich in vegetables, lean proteins, and whole grains.",
          icon: HeartPulse,
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
        };
      case "Overweight":
        return {
          title: "Mild Overweight Insights",
          desc: "You are slightly above the healthy range. Small adjustments can make a big difference.",
          lifestyle: "Focus on gradual, sustainable changes rather than extreme diets.",
          exercise: "Start with 30 minutes of brisk walking or swimming 5 days a week.",
          nutrition: "Watch portion sizes and try to reduce intake of added sugars and refined carbs.",
          icon: Info,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
        };
      case "Obesity Class I":
      case "Obesity Class II+":
        return {
          title: "High Risk Insights",
          desc: "Your current weight puts you at a higher risk for cardiovascular diseases and type 2 diabetes.",
          lifestyle: "Consulting a healthcare provider or a registered dietitian is highly recommended.",
          exercise: "Focus on low-impact exercises like swimming or cycling to protect your joints.",
          nutrition: "Prioritize whole foods, lean proteins, and fiber to stay full while in a caloric deficit.",
          icon: AlertTriangle,
          color: "text-orange-500",
          bg: "bg-orange-500/10",
        };
      default:
        return null;
    }
  };

  const insights = getInsights();
  if (!insights) return null;

  const Icon = insights.icon;

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl border ${insights.bg.replace('/10', '/30')}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl bg-background shadow-sm ${insights.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-lg">{insights.title}</h3>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          {insights.desc}
        </p>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="mt-0.5">
              <HeartPulse className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Lifestyle</div>
              <div className="text-sm">{insights.lifestyle}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Exercise</div>
              <div className="text-sm">{insights.exercise}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5">
              <Apple className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Nutrition</div>
              <div className="text-sm">{insights.nutrition}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* BMI Classification Table */}
      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b bg-muted/30">
          <h3 className="font-bold">WHO BMI Classifications</h3>
        </div>
        <div className="divide-y text-sm">
          {[
            { cat: "Underweight", range: "< 18.5", risk: "Increased" },
            { cat: "Healthy Weight", range: "18.5 - 24.9", risk: "Low" },
            { cat: "Overweight", range: "25.0 - 29.9", risk: "Increased" },
            { cat: "Obesity Class I", range: "30.0 - 34.9", risk: "High" },
            { cat: "Obesity Class II", range: "35.0 - 39.9", risk: "Very High" },
            { cat: "Obesity Class III", range: "≥ 40.0", risk: "Extremely High" },
          ].map((row, i) => {
            const isActive = category.includes(row.cat) || (category === "Obesity Class II+" && row.cat.includes("Obesity Class"));
            return (
              <div key={i} className={`flex items-center justify-between p-4 transition-colors ${isActive ? 'bg-primary/5 font-medium' : 'hover:bg-muted/50'}`}>
                <div className="w-1/3 flex items-center gap-2">
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  <span className={isActive ? 'text-primary font-bold' : ''}>{row.cat}</span>
                </div>
                <div className="w-1/3 text-center tabular-nums">{row.range}</div>
                <div className="w-1/3 text-right text-muted-foreground">{row.risk} Risk</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
