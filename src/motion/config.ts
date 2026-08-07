export const motionConfig = {
  duration: {
    fast: 0.18,
    default: 0.36,
    slow: 0.64,
  },
  easing: {
    standard: [0.16, 1, 0.3, 1] as const,
    soft: [0.22, 1, 0.36, 1] as const,
  },
  viewport: {
    once: true,
    amount: 0.12,
  },
} as const;

export const revealTransition = {
  duration: motionConfig.duration.slow,
  ease: motionConfig.easing.standard,
} as const;
