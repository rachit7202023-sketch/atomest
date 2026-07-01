export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  if (heightCm === 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

export const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", bg: "bg-blue-500", ring: "ring-blue-500/20" };
  if (bmi >= 18.5 && bmi <= 24.9) return { category: "Healthy Weight", color: "text-emerald-500", bg: "bg-emerald-500", ring: "ring-emerald-500/20" };
  if (bmi >= 25 && bmi <= 29.9) return { category: "Overweight", color: "text-yellow-500", bg: "bg-yellow-500", ring: "ring-yellow-500/20" };
  if (bmi >= 30 && bmi <= 34.9) return { category: "Obesity Class I", color: "text-orange-500", bg: "bg-orange-500", ring: "ring-orange-500/20" };
  return { category: "Obesity Class II+", color: "text-red-500", bg: "bg-red-500", ring: "ring-red-500/20" };
};

export const getIdealWeightRange = (heightCm: number) => {
  const heightM = heightCm / 100;
  const min = 18.5 * (heightM * heightM);
  const max = 24.9 * (heightM * heightM);
  return { min, max };
};

export const calculateBMR = (weightKg: number, heightCm: number, age: number, gender: "male" | "female"): number => {
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? bmr + 5 : bmr - 161;
};

export const calculateTDEE = (bmr: number, activityLevel: keyof typeof ACTIVITY_MULTIPLIERS): number => {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
};

export const kgToLbs = (kg: number): number => kg * 2.20462;
export const lbsToKg = (lbs: number): number => lbs / 2.20462;
export const cmToFeetInches = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches: inches === 12 ? 0 : inches }; // handle 12 inches case
};
export const feetInchesToCm = (feet: number, inches: number): number => (feet * 12 + inches) * 2.54;
