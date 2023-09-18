'use client'

export default function scoreColor(score: number) {
    const colorClasses: Record<string, string> = {
        1: 'bg-red-400',
        20: 'bg-red-300',
        30: 'bg-yellow-300',
        65: 'bg-green-300',
        90: 'bg-blue-300',
        100: 'bg-blue-400',
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