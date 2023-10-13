'use client';
// Returns a color for the score

export default function scoreColor(score: number) {
  const colorClasses: Record<string, string> = {
    1: 'bg-red-600 dark:bg-red:600/90',
    20: 'bg-red-500 dark:bg-red:500/90',
    30: 'bg-yellow-500 dark:bg-yellow-500/90',
    65: 'bg-green-500 dark:bg-green-500/90',
    90: 'bg-blue-500 dark:bg-blue-500/90',
    100: 'bg-blue-500 dark:bg-blue-500/90',
  };

  let bgColorClass = 'bg-gray-200';

  for (const pointRange in colorClasses) {
    if (score <= parseInt(pointRange)) {
      bgColorClass = colorClasses[pointRange];
      break;
    }
  }

  return bgColorClass;
}
