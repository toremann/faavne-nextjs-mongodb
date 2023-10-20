// 'use client'
// Returns a color for the score

export default function scoreColorIcon(score: number) {
  const colorClasses: Record<string, string> = {
    1: 'text-red-600',
    20: 'text-red-500',
    30: 'text-yellow-500',
    65: 'text-green-500',
    90: 'text-blue-500',
    100: 'text-blue-500',
  };

  if (score > 100) {
    return 'text-purple-500';
  }

  let textColorClass = 'text-gray-800'; // Change this to the default text color you want

  for (const pointRange in colorClasses) {
    if (score <= parseInt(pointRange)) {
      textColorClass = colorClasses[pointRange];
      break;
    }
  }

  return textColorClass;
}
