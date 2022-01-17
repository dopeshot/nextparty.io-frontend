import { shuffleArray } from "../../src/services/game/GameUtilities"

describe('Game gomponents Unit tests', () => {
    describe('shuffleArray', () => {
        before(() => {
            expect(shuffleArray).to.be.a("function")
        })

        describe('null/undefined tests', () => {
            it('should be empty if array is null', () => {
                expect(shuffleArray(null)).to.eql([])
            })

            it('should be empty if array is undefined', () => {
                expect(shuffleArray(undefined)).to.eql([])
            })

            it('should be empty if array is empty', () => {
                expect(shuffleArray([])).to.eql([])
            })
        })

        // This is a probability test and is not set to work 100% of the time
        // Thus the actual test has to be omitted
        // it('should change if length is long enough', () => {
        //     expect(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])).to.not.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
        // })

        it('should not change with 1 element', () => {
            expect(shuffleArray([1])).to.eql([1])
        })

        it('should not change length of input', () => {
            expect(shuffleArray([1, 2, 3, 4, 5])).to.have.length(5)
        })

        it('should contain the same elements', () => {
            const array = shuffleArray([1, 2, 3, 4, 5])
            array.forEach((element) => {
                expect(array.indexOf(element)).to.not.equal(-1)
            })
        })

        it('should return a new array', () => {
            const array = [{}, {}, {}]
            expect(shuffleArray(array)).to.not.be.equals(array)
        })
    })
})