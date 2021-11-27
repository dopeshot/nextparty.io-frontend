// Used the Fisher-Yates (aka Knuth) Shuffle algo. Nice animation: https://bost.ocks.org/mike/shuffle/
export const shuffleArray = <T>(array: Array<T>) => {
    return array.sort(() => .5 - Math.random())
}