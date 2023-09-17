export default function scoreColor(score: number) {
    const colorClasses: Record<string, string> = {
        1: 'bg-red-400',
        25: 'bg-yellow-400',
        50: 'bg-blue-400',
        75: 'bg-green-400',
        100: 'bg-purple-500',
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