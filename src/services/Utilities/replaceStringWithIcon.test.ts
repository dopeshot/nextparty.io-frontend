import { replaceStringWithIcon } from "../Utilities"

describe('unit replaceStringWithIcon', () => {
    it('it should replace male icon', () => {
        expect(replaceStringWithIcon('@a')).toBe('👤')
        expect(replaceStringWithIcon('@m')).toBe('👨')
    })
})

export { }