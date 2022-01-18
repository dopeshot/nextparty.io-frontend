import { lowerCaseFirstLetter, replaceStringWithIcon } from "../../../src/services/Utilities"

describe('ServiceUtilities', () => {

    describe('lowerCaseFirstLetter', () => {
        it('should lowercase first letter', () => {
            expect(lowerCaseFirstLetter("Example")).to.equal("example")
            expect(lowerCaseFirstLetter("Nice")).to.equal("nice")
            expect(lowerCaseFirstLetter("Looks")).to.equal("looks")
        })

        it('should only lowercase the first letter', () => {
            expect(lowerCaseFirstLetter("EXAMPLE")).to.equal("eXAMPLE")
            expect(lowerCaseFirstLetter("DE")).to.equal("dE")
            expect(lowerCaseFirstLetter("IO")).to.equal("iO")
        })

        it('should accept emtpy strings', () => {
            expect(lowerCaseFirstLetter("")).to.equal("")
        })

        it('should handle spaces and numebers', () => {
            expect(lowerCaseFirstLetter("123")).to.equal("123")
            expect(lowerCaseFirstLetter(" Space")).to.equal(" Space")
        })

        it('should handle special characters', () => {
            expect(lowerCaseFirstLetter("!@#$%^&*()_+")).to.equal("!@#$%^&*()_+")
        })
    })

    describe('replaceStringWithIcon', () => {
        it('should replace @m with male icon', () => {
            expect(replaceStringWithIcon('@m')).to.equal('👨')
            expect(replaceStringWithIcon('My name is @m')).to.equal('My name is 👨')
            expect(replaceStringWithIcon('inline@mtext')).to.equal('inline👨text')
        })

        it('should replace @f with female icon', () => {
            expect(replaceStringWithIcon('@f')).to.equal('👩')
            expect(replaceStringWithIcon('My name is @f')).to.equal('My name is 👩')
            expect(replaceStringWithIcon('inline@ftext')).to.equal('inline👩text')
        })

        it('should replace @a with any icon', () => {
            expect(replaceStringWithIcon('@a')).to.equal('👤')
            expect(replaceStringWithIcon('My name is @a')).to.equal('My name is 👤')
            expect(replaceStringWithIcon('inline@atext')).to.equal('inline👤text')
        })

        it('should replace nothing in when there is no @a | @m | @f', () => {
            expect(replaceStringWithIcon('There is no male, female or any')).to.equal('There is no male, female or any')
            expect(replaceStringWithIcon('')).to.equal('')
            expect(replaceStringWithIcon('Nothing')).to.equal('Nothing')
        })
    })
})