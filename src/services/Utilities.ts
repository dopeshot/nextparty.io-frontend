export function lowerCaseFirstLetter(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1)
}

export const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))

    return JSON.parse(jsonPayload)
}

const titleSuffix = ' | Truth or Dare'

export const setSeoTitle = (title: string, displaySuffix = true) => {
    document.title = `${title}${displaySuffix ? titleSuffix : ''}`
}

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