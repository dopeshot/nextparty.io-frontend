import { createOvermindMock } from "overmind"
import { config } from "../../src/overmind"
import { GameStatus, StartGameErrors } from "../../src/overmind/game/state"
// To stub functions they need to belong to an obj, thus the file is imported to serve as such
import * as gameComponents from '../../src/services/game/GameComponents'
import { TaskType } from "../../src/shared/types/TaskType"
import { getGenders, getMockPlayers, getMockPlayersWithPossibleTaskCount } from "../mock/players"
import { getMockMultiPlayerSet, getMockSoloPlayerSet, getMockUnplayableSet } from "../mock/set"
let overmind = createOvermindMock(config)
const OA = () => overmind.actions.game
const OS = () => overmind.state.game

describe('the pain you feel when writing tests', () => {
    describe('the nightmares you get from this work', () => {
        describe('a scenario that leads to failure', () => {
            describe('but is conquered by the strongest writers', () => {
                describe('can only mean one thing:', () => {
                    describe('the test:', () => {
                        it('passed', () => { })
                    })
                })
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

            it('should return PLAYERS error if not enough players', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.players.players = []
                    state.game.set = getMockSoloPlayerSet()
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.PLAYERS] })
            })

            it('should return SET error if set is null', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.players.players = getMockPlayers()
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.SET] })
            })

            it('should return SET error if set length is 0', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = { ...getMockSoloPlayerSet(), tasks: [] }
                    state.players.players = getMockPlayers()
                })
                expect(OA().isPossibleToPlay()).to.eql({ status: false, errors: [StartGameErrors.SET] })
            })

            it('should return both errors if not enough players and set null', () => {
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

        describe('nextPlayer', () => {
            before(() => {
                expect(OA().nextPlayer).to.be.a("function")
            })

            it('should set nextPlayerIndex to 0 when maximum players is reached', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.currentPlayerIndex = 2
                    state.game.players = getMockPlayers()
                })
                OA().nextPlayer()
                expect(OS().currentPlayerIndex).to.equal(0)
                expect(OS().gameStatus).to.equal(GameStatus.PLAYER_PICKED)
                expect(OS().debug.playerLog[0]).to.be.oneOf(["0 - malePlayer", "0 - femalePlayer", "0 - diversPlayer"])
            })

            it('should increase nextPlayerIndex if players max is not reached yet', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.currentPlayerIndex = 1
                    state.game.players = getMockPlayers()
                })
                OA().nextPlayer()
                expect(OS().currentPlayerIndex).to.equal(getMockPlayers().length - 1)
                expect(OS().gameStatus).to.equal(GameStatus.PLAYER_PICKED)
                expect(OS().debug.playerLog[0]).to.be.oneOf(["2 - malePlayer", "2 - femalePlayer", "2 - diversPlayer"])
            })

            it('should increase nextPlayerIndex to 0 after game start', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.players = getMockPlayers()
                })
                OA().nextPlayer()
                expect(OS().currentPlayerIndex).to.equal(0)
                expect(OS().gameStatus).to.equal(GameStatus.PLAYER_PICKED)
                expect(OS().debug.playerLog[0]).to.be.oneOf(["0 - malePlayer", "0 - femalePlayer", "0 - diversPlayer"])
            })
        })

        describe('pickTaskType', () => {
            before(() => {
                expect(OA().pickTaskType).to.be.a("function")
            })

            it('should change the gameStatus', () => {
                cy.stub(OA(), 'findTask').callsFake(() => true)
                OA().pickTaskType(TaskType.TRUTH)
                expect(OS().gameStatus).to.equal(GameStatus.TYPE_PICKED)
            })
        })

        describe('isPossibleTask', () => {
            before(() => {
                expect(OA().isPossibleTask).to.be.a("function")
            })

            it('should return false if there is no set', () => {
                expect(OA().isPossibleTask(TaskType.TRUTH)).to.be.false
            })

            it('should return false if there is no task for this player', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = getMockUnplayableSet()
                    state.game.currentPlayer = getMockPlayers()[0]
                })
                expect(OA().isPossibleTask(TaskType.TRUTH)).to.be.false
            })

            it('should return false if there are no FillableTasks this player', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = getMockUnplayableSet()
                    state.game.currentPlayer = getMockPlayers()[1]
                    state.game.playersGenderCount = getGenders()
                })
                expect(OA().isPossibleTask(TaskType.TRUTH)).to.be.false
            })

            it('should return true if there are tasks to play', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = getMockSoloPlayerSet()
                    state.game.currentPlayer = getMockPlayers()[1]
                    state.game.playersGenderCount = getGenders()
                })
                expect(OA().isPossibleTask(TaskType.TRUTH)).to.be.true
            })
        })

        describe('findTask', () => {
            before(() => {
                expect(OA().findTask).to.be.a("function")
            })

            beforeEach(() => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = getMockSoloPlayerSet()
                })
                cy.stub(window.console, 'error').as('consoleError')
                cy.stub(window.console, 'warn').as('consoleWarn')
            })

            it('should return false if game.set is null', () => {
                overmind = createOvermindMock(config)
                // Will use functionPostExit to determine if function exited at the desired point
                cy.spy(gameComponents.getPossibleTasks).as('functionPostExit')

                expect(OA().findTask(TaskType.TRUTH)).to.be.false

                cy.get('@functionPostExit').should('not.be.called')
                cy.get('@consoleError').should('be.calledOnce')
            })

            it('should return false if getPossibleTasks returns empty array', () => {
                cy.stub(gameComponents, 'getPossibleTasks').returns([])
                cy.spy(gameComponents.getFillableTasks).as('functionPostExit')

                expect(OA().findTask(TaskType.TRUTH)).to.be.false

                cy.get('@functionPostExit').should('not.be.called')
                cy.get('@consoleError').should('be.calledOnce')
            })

            it('should return false if getFillableTasks returns empty array', () => {
                cy.stub(gameComponents, 'getPossibleTasks').returns([1])
                cy.stub(gameComponents, 'getFillableTasks').returns([])
                cy.spy(gameComponents.getUnplayedOverall).as('functionPostExit')

                expect(OA().findTask(TaskType.TRUTH)).to.be.false

                cy.get('@functionPostExit').should('not.be.called')
                cy.get('@consoleError').should('be.calledOnce')
            })

            it('should return true if getUnplayedOverall has tasks and can generateFinalMessage', () => {
                cy.stub(gameComponents, 'getPossibleTasks').returns([1])
                cy.stub(gameComponents, 'getFillableTasks').returns([1])
                cy.stub(gameComponents, 'getUnplayedOverall').returns([1])
                // Can't return false since findTask also checks for the same thing
                cy.stub(OA(), 'generateFinalMessage').callsFake(() => { })
                cy.spy(gameComponents.getUnplayedByMe).as('functionPostExit')

                expect(OA().findTask(TaskType.TRUTH)).to.be.true

                cy.get('@functionPostExit').should('not.be.called')
            })

            it('should warn if getUnplayedOverall returns empty array', () => {
                cy.stub(gameComponents, 'getPossibleTasks').returns([1])
                cy.stub(gameComponents, 'getFillableTasks').returns([1])
                cy.stub(gameComponents, 'getUnplayedOverall').returns([])
                cy.stub(gameComponents, 'getUnplayedByMe').returns([1])
                cy.stub(OA(), 'generateFinalMessage').callsFake(() => { })
                cy.spy(gameComponents.getLeastPlayedByMe).as('functionPostExit')

                expect(OA().findTask(TaskType.TRUTH)).to.be.true

                cy.get('@functionPostExit').should('not.be.called')
                cy.get('@consoleWarn').should('be.calledOnce')
            })

            it('should warn twice if getUnplayedByMe returns empty array', () => {
                cy.stub(gameComponents, 'getPossibleTasks').returns([1])
                cy.stub(gameComponents, 'getFillableTasks').returns([1])
                cy.stub(gameComponents, 'getUnplayedOverall').returns([])
                cy.stub(gameComponents, 'getUnplayedByMe').returns([])
                cy.stub(gameComponents, 'getLeastPlayedByMe').returns([1])
                cy.stub(OA(), 'generateFinalMessage').callsFake(() => { })
                cy.spy(gameComponents.getLeastPlayedOverall).as('functionPostExit')

                expect(OA().findTask(TaskType.TRUTH)).to.be.true

                cy.get('@functionPostExit').should('not.be.called')
                cy.get('@consoleWarn').should('be.calledTwice')
            })

            it('should warn twice if getLeastPlayedByMe returns empty array', () => {
                cy.stub(gameComponents, 'getPossibleTasks').returns([1])
                cy.stub(gameComponents, 'getFillableTasks').returns([1])
                cy.stub(gameComponents, 'getUnplayedOverall').returns([])
                cy.stub(gameComponents, 'getUnplayedByMe').returns([])
                cy.stub(gameComponents, 'getLeastPlayedByMe').returns([])
                cy.stub(gameComponents, 'getLeastPlayedOverall').returns([])
                cy.stub(OA(), 'generateFinalMessage').callsFake(() => { })

                expect(OA().findTask(TaskType.TRUTH)).to.be.true

                cy.get('@consoleWarn').should('be.calledTwice')
                expect(gameComponents.getLeastPlayedOverall).to.be.calledOnce
            })

        })

        describe('generateFinalMessage', () => {
            before(() => {
                expect(OA().generateFinalMessage).to.be.a("function")
            })

            it('should return false and print error if set is null', () => {
                cy.stub(window.console, 'error').as('consoleError')
                expect(OA().generateFinalMessage(getMockSoloPlayerSet().tasks[0])).to.be.false
                cy.get('@consoleError').should('be.calledOnce')
            })

            it('should return the message unchanged if it is a solo task', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = getMockSoloPlayerSet()
                    state.game.currentPlayer = getMockPlayers()[0]
                })
                OA().generateFinalMessage(getMockSoloPlayerSet().tasks[0])
                expect(OS().currentTask).to.eql(getMockSoloPlayerSet().tasks[0])
            })

            it('should return a new message if it is a multi task', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.set = getMockMultiPlayerSet()
                    state.game.currentPlayer = getMockPlayers()[0]
                    state.game.players = getMockPlayers()
                })
                OA().generateFinalMessage(getMockMultiPlayerSet().tasks[0])
                expect(OS().currentTask).to.not.eql(getMockMultiPlayerSet().tasks[0])
                expect(OS().currentTask!.message).to.be.oneOf(['femalePlayer', 'diversPlayer', 'malePlayer'])
            })
        })

        describe('addSetToGame', () => {
            before(() => {
                expect(OA().addSetToGame).to.be.a("function")
            })

            it('should set id when id is added to game', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.explore.setDetails = getMockSoloPlayerSet()
                })
                OA().addSetToGame("testId")
                expect(OS().loadThisSetId).to.not.be.null
                expect(OS().loadThisSetId).to.equal("testId")
            })

        })

        describe('toggleDeveloper', () => {
            before(() => {
                expect(OA().toggleDeveloper).to.be.a("function")
            })

            it('should change the developer mode false to true', () => {
                OA().toggleDeveloper()
                expect(OS().debug.isDeveloper).to.be.true
            })

            it('should change the developer mode true to false', () => {
                overmind = createOvermindMock(config, (state) => {
                    state.game.debug.isDeveloper = true
                })
                OA().toggleDeveloper()
                expect(OS().debug.isDeveloper).to.be.false
            })
        })

        describe('hideTabBar', () => {
            before(() => {
                expect(OA().hideTabBar).to.be.a("function")
            })

            it('should change the hideTabBar if payload is true while it was false', () => {
                OA().hideTabBar(true)
                expect(OS().hideTabBar).to.be.true
            })

            it('should not change the hideTabBar if payload is false while it was false', () => {
                OA().hideTabBar(false)
                expect(OS().hideTabBar).to.be.false
            })
        })
    })
})
