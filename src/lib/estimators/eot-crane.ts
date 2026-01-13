type EOTInput = {
  capacityTon: number
  spanMeter: number
  heightMeter: number
  dutyClass: "M3" | "M5" | "M7"
}

export function estimateEOTCrane(input: EOTInput) {
  let base = input.capacityTon * 90000
  base += input.spanMeter * 12000
  base += input.heightMeter * 8000

  if (input.dutyClass === "M5") base *= 1.15
  if (input.dutyClass === "M7") base *= 1.3

  return {
    min: Math.round(base * 0.9),
    max: Math.round(base * 1.15),
  }
}
