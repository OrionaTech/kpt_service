type GantryInput = {
  capacityTon: number
  spanMeter: number
  outdoor: boolean
}

export function estimateGantryCrane(input: GantryInput) {
  let base = input.capacityTon * 100000
  base += input.spanMeter * 15000

  if (input.outdoor) base *= 1.2

  return {
    min: Math.round(base * 0.9),
    max: Math.round(base * 1.2),
  }
}
