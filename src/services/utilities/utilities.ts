export function replaceStringWithIcon(string: string): string {
    return string
        .replaceAll('@a', '👤')
        .replaceAll('@m', '👨')
        .replaceAll('@f', '👩')
}

export function replaceCurrentPlayerStringWithIcon(string: string): string {
    return string
        .replaceAll('@ca', '👤')
        .replaceAll('@cm', '👨')
        .replaceAll('@cf', '👩')
}

export function countGenderOccurrences(string: string): {
    male: number,
    female: number,
    any: number
} {
    return {
        male: string.split('@m').length - 1,
        female: string.split('@f').length - 1,
        any: string.split('@a').length - 1
    }
}

export function animateValue(obj: HTMLElement | null, start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj!.innerHTML = Math.floor(progress * (end - start) + start).toString()
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

