import type { EventColor } from '../types';

const colorMap: Record<EventColor, { bg: string; text: string; dot: string; border: string }> = {
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', dot: 'bg-purple-500', border: 'border-purple-500/30' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-500', border: 'border-blue-500/30' },
  green: { bg: 'bg-green-500/20', text: 'text-green-400', dot: 'bg-green-500', border: 'border-green-500/30' },
  red: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-500', border: 'border-red-500/30' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-500', border: 'border-orange-500/30' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', dot: 'bg-pink-500', border: 'border-pink-500/30' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', dot: 'bg-teal-500', border: 'border-teal-500/30' },
  yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-500', border: 'border-yellow-500/30' },
};

export function getEventColorClasses(color: EventColor) {
  return colorMap[color] || colorMap.purple;
}

export const eventColors: EventColor[] = ['purple', 'blue', 'green', 'red', 'orange', 'pink', 'teal', 'yellow'];
