type PanelInput = {
  loadKW: number
  feeders: number
  automation: boolean
}

export function estimateElectricalPanel(input: PanelInput) {
  let base = input.loadKW * 4500
  base += input.feeders * 3000

  if (input.automation) base += 50000

  return {
    min: Math.round(base * 0.85),
    max: Math.round(base * 1.2),
  }
}
