export interface BreakpointThresholds {
  [key: string]: number;
}

export interface BreakpointOptions {
  thresholds?: BreakpointThresholds;
  mobileBreakpoint?: string;
}
