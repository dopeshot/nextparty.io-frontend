import { Gender } from "../../../src/overmind/players/state"
import { countPlayedByPlayer, genderToTaskCurrentPlayerGender, shuffleArray, shufflePlayers } from "../../../src/services/game/GameUtilities"
import { TaskCurrentPlayerGender } from "../../../src/shared/types/TaskCurrentPlayerGender"
import { getMockPlayers } from "../../mock/players"

const malePlayer = getMockPlayers()[0]
describe('GameUtilities', () => {

    describe('shuffleArray', () => {
        before(() => {
            expect(shuffleArray).to.be.a("function")
        })

        describe('empty tests', () => {
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

    describe('genderToTaskCurrentPlayerGender', () => {
        before(() => {
            expect(genderToTaskCurrentPlayerGender).to.be.a("function")
        })

        it('should be TCPG.male if gender is Gender.male', () => {
            expect(genderToTaskCurrentPlayerGender(Gender.MALE)).to.equal(TaskCurrentPlayerGender.MALE)
        })

        it('should be TCPG.female if gender is Gender.female', () => {
            expect(genderToTaskCurrentPlayerGender(Gender.FEMALE)).to.equal(TaskCurrentPlayerGender.FEMALE)
        })

        it('should be TCPG.divers if gender is Gender.divers', () => {
            expect(genderToTaskCurrentPlayerGender(Gender.DIVERS)).to.equal(TaskCurrentPlayerGender.ANYONE)
        })
    })

    describe('countPlayedByPlayer', () => {
        before(() => {
            expect(countPlayedByPlayer).to.be.a("function")
        })

        describe('empty tests', () => {
            it('should be 0 if playedBy is empy', () => {
                expect(countPlayedByPlayer([], malePlayer)).to.equal(0)
            })
        })

        it('should be 1 if playedBy contains malePlayer.id', () => {
            expect(countPlayedByPlayer([malePlayer.id], malePlayer)).to.equal(1)
        })

        it('should be 1 if playedBy contains malePlayer.id and other', () => {
            expect(countPlayedByPlayer([malePlayer.id, malePlayer.id + 1], malePlayer)).to.equal(1)
        })
    })

    describe('shufflePlayers,  this function has no own logic and thus no functionality tests', () => {
        before(() => {
            expect(shufflePlayers).to.be.a("function")
        })

        describe('empty tests', () => {
            it('should be empty if array is empty', () => {
                expect(shufflePlayers([])).to.eql([])
            })
        })
    })
})