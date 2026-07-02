/**
 * Calculates the true cost of an item in terms of hours worked.
 * @param cost The cost of the item.
 * @param hourlyWage The user's hourly wage.
 * @param taxRate The estimated effective tax rate (default 22%).
 * @returns The number of hours required to earn the purchase price after taxes.
 */
export function calculateTimeCost(cost: number, hourlyWage: number, taxRate = 0.22): number {
  if (hourlyWage <= 0) return 0;
  const netHourly = hourlyWage * (1 - taxRate);
  return Math.ceil(cost / netHourly);
}

/**
 * Translates raw hours into relatable life chunks.
 */
export function calculateTimeEquivalents(hours: number): string | null {
  if (hours < 8) return null; // Too small to convert

  if (hours >= 160 * 12) {
    return `≈ ${(hours / (160 * 12)).toFixed(1)} years of work`;
  }
  if (hours >= 160) {
    return `≈ ${Math.floor(hours / 160)} full months`;
  }
  if (hours >= 40) {
    return `≈ ${Math.floor(hours / 40)} work weeks`;
  }
  return `≈ ${Math.floor(hours / 8)} working days`;
}

/**
 * Calculates the future value of an investment (opportunity cost).
 * @param principal The initial amount (cost of the item).
 * @param years The number of years to invest.
 * @param annualReturn The expected annual real return (default 7%).
 * @returns The compounded future value.
 */
export function calculateOpportunityCost(principal: number, years: number, annualReturn = 0.07): number {
  return Math.round(principal * Math.pow(1 + annualReturn, years));
}

/**
 * Formats a number as beautiful currency without decimal soup.
 */
export function formatCurrency(value: number, currency: string = "USD"): string {
  if (value >= 1_000_000 && currency === "USD") {
    return "$" + (value / 1_000_000).toFixed(1) + "M";
  }
  
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export const NATIONAL_AVG_WAGE = 30; // Global fallback logic can be expanded later
