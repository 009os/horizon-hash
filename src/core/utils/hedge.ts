export interface HedgeThresholds {
  upper: number;
  lower: number;
}

export function shouldHedge(totalDelta: number, thresholds: HedgeThresholds): boolean {
  return Math.abs(totalDelta) > thresholds.upper;
}

export function shouldUnwindHedge(totalDelta: number, thresholds: HedgeThresholds): boolean {
  return Math.abs(totalDelta) < thresholds.lower;
}
