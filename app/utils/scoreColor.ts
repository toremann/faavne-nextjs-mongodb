'use client'

export default function scoreColor(score: number) {
    const colorClasses: Record<string, string> = {
        1: 'bg-red-600',
        20: 'bg-red-500',
        30: 'bg-yellow-500',
        65: 'bg-green-500',
        90: 'bg-blue-500',
        100: 'bg-blue-500',
    };

    let bgColorClass = 'bg-gray-200';

    for (const pointRange in colorClasses) {
        if (score <= parseInt(pointRange)) {
            bgColorClass = colorClasses[pointRange];
            break;
        }
    }

    return bgColorClass;
};