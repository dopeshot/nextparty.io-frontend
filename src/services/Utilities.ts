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