export function SEOContent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none mt-20 pt-16 border-t border-muted/50">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Understanding Your BMI and Health</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <h3>What is BMI?</h3>
          <p>
            Body Mass Index (BMI) is a widely used medical screening tool that estimates body fat based on your height and weight. While it does not directly measure body fat, it correlates strongly with more direct measures of body fat and serves as an inexpensive and easy-to-perform method of screening for weight categories that may lead to health problems.
          </p>
          
          <h3>How is BMI Calculated?</h3>
          <p>
            The standard mathematical formula for BMI is weight in kilograms divided by height in meters squared (kg/m²). For imperial measurements, the formula is weight in pounds multiplied by 703, divided by height in inches squared. Our calculator handles these conversions automatically in real-time.
          </p>

          <h3>Limitations of BMI</h3>
          <p>
            While highly useful for populations, BMI has limitations for individuals:
          </p>
          <ul>
            <li><strong>Athletes:</strong> High muscle mass can result in a high BMI despite low body fat.</li>
            <li><strong>Older Adults:</strong> May underestimate body fat due to muscle loss.</li>
            <li><strong>Pregnancy:</strong> BMI is not an accurate metric during pregnancy.</li>
            <li><strong>Distribution:</strong> It does not account for where fat is stored (visceral vs. subcutaneous).</li>
          </ul>
        </div>
        
        <div>
          <h3>Healthy BMI Ranges Explained</h3>
          <p>
            The World Health Organization (WHO) defines the following classifications:
          </p>
          <ul>
            <li><strong>Underweight (&lt;18.5):</strong> May indicate malnutrition, an eating disorder, or other health problems.</li>
            <li><strong>Healthy Weight (18.5 - 24.9):</strong> Associated with the lowest risk of illness and mortality.</li>
            <li><strong>Overweight (25.0 - 29.9):</strong> Indicates excess weight, increasing the risk for certain health issues.</li>
            <li><strong>Obesity (30.0+):</strong> High amount of body fat that significantly increases the risk of metabolic diseases, type 2 diabetes, and cardiovascular issues.</li>
          </ul>
          
          <h3>How to Manage Your Weight Safely</h3>
          <p>
            Whether your goal is to lose, maintain, or gain weight, the foundation of safe weight management lies in energy balance (Calories In vs. Calories Out), nutrient-dense whole foods, and regular physical activity. We recommend aiming for a gradual weight change of 0.5 to 1.0 kg (1 to 2 lbs) per week. Extreme diets often result in muscle loss and metabolic adaptation, making long-term success difficult.
          </p>
          
          <div className="bg-muted p-5 rounded-xl text-sm border mt-6">
            <strong>Medical Disclaimer:</strong> The Atomest BMI Calculator and its insights are intended for educational and informational purposes only. It should not be used to diagnose, treat, or replace professional medical advice. Always consult a healthcare provider or a registered dietitian before starting any new diet or exercise program.
          </div>
        </div>
      </div>
    </div>
  );
}
