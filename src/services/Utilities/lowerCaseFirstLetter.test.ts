import { lowerCaseFirstLetter } from "./lowerCaseFirstLetter"

describe("unit lowerCaseFirstLetter", () => {
    it('it should lowercase first letter', () => {
        expect(lowerCaseFirstLetter("Example")).toBe("example")
        expect(lowerCaseFirstLetter("Nice")).toBe("nice")
        expect(lowerCaseFirstLetter("Looks")).toBe("looks")
    })

    it('it should only lowercase the first letter', () => {
        expect(lowerCaseFirstLetter("EXAMPLE")).toBe("eXAMPLE")
        expect(lowerCaseFirstLetter("DE")).toBe("dE")
        expect(lowerCaseFirstLetter("IO")).toBe("iO")
    })

    it('it should accept emtpy strings', () => {
        expect(lowerCaseFirstLetter("")).toBe("")
    })

    it('it should handle spaces and numbers', () => {
        expect(lowerCaseFirstLetter("123")).toBe("123")
        expect(lowerCaseFirstLetter(" Space")).toBe(" Space")
    })

})
export { }