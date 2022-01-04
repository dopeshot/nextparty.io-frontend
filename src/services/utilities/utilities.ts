export function replaceStringWithIcon(string: string): string {
    return string
        .replaceAll('@a', '👤')
        .replaceAll('@m', '👨')
        .replaceAll('@f', '👩')
}

export function replaceIconWithString(string: string): string {
    return string
        .replaceAll('👤', '@a')
        .replaceAll('👨', '@m')
        .replaceAll('👩', '@f')
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

