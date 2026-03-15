import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and twMerge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Calculate XP needed for next level
 */
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

/**
 * Get level from total XP
 */
export function getLevelFromXP(xp: number): number {
  let level = 1;
  let xpNeeded = 0;
  while (xpNeeded <= xp) {
    xpNeeded += xpForLevel(level);
    if (xpNeeded <= xp) level++;
  }
  return level;
}

/**
 * Get XP progress to next level
 */
export function getXPProgress(xp: number): { current: number; needed: number; percentage: number } {
  let totalXP = 0;
  let currentLevel = 1;
  
  while (true) {
    const xpNeeded = xpForLevel(currentLevel);
    if (totalXP + xpNeeded > xp) {
      break;
    }
    totalXP += xpNeeded;
    currentLevel++;
  }
  
  const currentLevelXP = xp - totalXP;
  const neededXP = xpForLevel(currentLevel);
  const percentage = Math.min(100, Math.round((currentLevelXP / neededXP) * 100));
  
  return {
    current: currentLevelXP,
    needed: neededXP,
    percentage,
  };
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}