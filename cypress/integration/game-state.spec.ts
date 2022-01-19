import { createOvermindMock } from "overmind"
import { config } from "../../src/overmind"
import { GameStatus } from "../../src/overmind/game/state"
let overmind = createOvermindMock(config)
const OA = () => overmind.actions.game
const OS = () => overmind.state.game
describe('the pain you feel when writing tests', () => {
    describe('the nightmares you get from this work', () => {
        it('should drive you crazy one day', () => {
            it('is pain', () => {
                it('is')
            })
        })
    })

    beforeEach(() => {
        overmind = createOvermindMock(config)
    })

    describe('game state', () => {
        it('should match the initial state', () => {
            expect(OS().hideTabBar).to.be.false
            expect(OS().set).to.be.null
            expect(OS().players).to.eql([])
            expect(OS().playersGenderCount).to.eql({ male: 0, female: 0, divers: 0 })
            expect(OS().gameStatus).to.equal(GameStatus.START)
            expect(OS().currentPlayerIndex).to.equal(-1)
            expect(OS().currentPlayer).to.be.undefined
            expect(OS().currentTask).to.be.null
            expect(OS().debug).to.eql({ tasksUnplayedAtAll: 0, tasksPlayedOnce: 0, tasksPlayedMoreThanOnce: 0, isDeveloper: false, playerLog: [] })
        })

        // MD: Idk in what frontend stuff I am working here no clue what to google for mocking launchGame or history
        describe('launchGame', () => {
            before(() => {
                expect(OA().launchGame).to.be.a("function")
            })

            // it('should be null if setDetails is in initial state', () => {

            //     await OA().launchGame()
            //     expect(OS().set).to.be.null
            // })
        })



    })
})
