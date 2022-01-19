import { createOvermindMock } from "overmind"
import { config } from "../../src/overmind"
import { GameStatus, StartGameErrors } from "../../src/overmind/game/state"
import { getMockPlayers, getMockPlayersWithPossibleTaskCount } from "../game-mock-data.ts/players"
import { getMockSoloPlayerSet } from "../game-mock-data.ts/set"
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

        describe('isPossibleToPlay', () => {
            before(() => {
                expect(OA().isPossibleToPlay).to.be.a("function")
            })

            it('should return return true and no errors enough players and set has tasks', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.players.players = getMockPlayers()
                    state.game.set = getMockSoloPlayerSet()
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: true, errors: [] })
            })

            it('should return return PLAYERS error if not enough players', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.players.players = []
                    state.game.set = getMockSoloPlayerSet()
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.PLAYERS] })
            })

            it('should return return SET error if set is null', () => {
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.SET] })
            })

            it('should return return SET error if set length is 0', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = { ...getMockSoloPlayerSet(), tasks: [] }
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.SET] })
            })

            it('should return return both errors if not enough players and set null', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.players.players = []
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.PLAYERS, StartGameErrors.SET] })
            })


        })

        describe('newGame', () => {
            before(() => {
                expect(OA().newGame).to.be.a("function")
            })

            it('should change the the game.state to start', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.explore.setDetails = getMockSoloPlayerSet()
                    state.players.players = getMockPlayers()
                    state.game.set = getMockSoloPlayerSet()
                    state.game.playersGenderCount = { male: 1, female: 1, divers: 1 }

                })
                OA().newGame()
                expect(OS().gameStatus).to.equal(GameStatus.START)
                expect(OS().players).to.deep.include.members(getMockPlayersWithPossibleTaskCount())
                expect(OS().set!.tasks).to.deep.include.members(getMockSoloPlayerSet().tasks)
                expect(OS().currentPlayerIndex).to.equal(-1)
                expect(OS().currentTask).to.equal(null)
                expect(OS().debug.playerLog).to.eql([])
            })
        })

    })
})