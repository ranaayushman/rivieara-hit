/**
 * Global Particle Animation System
 * Reusable particle animations (stars, lanterns, embers) that can be used across the website
 */

export interface Star {
  id: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  dur: number;
  delay: number;
}

export interface Lantern {
  x: string;
  delay: number;
  size: number;
  dur: number;
}

export interface Ember {
  id: number;
  right: number;
  bottom: number;
  duration: number;
  delay: number;
}

/**
 * Generate animated stars particles
 * @param count - Number of stars to generate (adjusted based on performance mode)
 * @returns Array of star particle configurations
 */
export function generateStars(count: number = 40): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${(i * 17 + 3) % 100}%`,
    y: `${(i * 13 + 7) % 75}%`,
    size: ((i * 7) % 3) + 1,
    opacity: ((i * 11) % 25 + 8) / 100,
    dur: 3 + ((i * 7) % 5),
    delay: (i * 0.3) % 5,
  }));
}

/**
 * Predefined lantern configurations
 * Can be used as-is or filtered based on performance requirements
 */
export const LANTERNS: Lantern[] = [
  { x: "62%", delay: 0, size: 18, dur: 7 },
  { x: "72%", delay: 2, size: 14, dur: 9 },
  { x: "80%", delay: 4, size: 10, dur: 8 },
  { x: "55%", delay: 1, size: 12, dur: 10 },
  { x: "90%", delay: 3, size: 8, dur: 11 },
];

/**
 * Generate floating ember particles
 * @param count - Number of embers to generate
 * @returns Array of ember particle configurations
 */
export function generateEmbers(count: number = 5): Ember[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    right: 15 + i * 10,
    bottom: 20 + i * 7,
    duration: 5 + i,
    delay: i * 0.8,
  }));
}

/**
 * Get filtered particles based on performance mode
 * @param isLowPower - Whether low power mode is enabled
 * @returns Object containing optimized particle counts
 */
export function getPerformanceAdjustedParticles(isLowPower: boolean) {
  return {
    starCount: isLowPower ? 12 : 40,
    lanternCount: isLowPower ? 1 : 3,
    emberCount: isLowPower ? 0 : 5,
    shouldRenderEmitters: !isLowPower,
  };
}

/**
 * Get lanterns for a given count
 * @param count - Number of lanterns to return
 * @returns Filtered lantern array
 */
export function getLanterns(count: number = 3): Lantern[] {
  return LANTERNS.slice(0, count);
}
