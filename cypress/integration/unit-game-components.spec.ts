import { TaskType } from '../../src/overmind/game/state'
import {
  countPossibleTasksForPlayer,
  fillPlayersIntoMessage,
  getFillableTasks,
  getLeastPlayedByMe,
  getLeastPlayedOverall,
  getPossibleTasks,
  getUnplayedByMe,
  getUnplayedOverall,
} from '../../src/services/game/GameComponents'
import { getGenders, getMockPlayers } from '../game-mock-data.ts/players'
import {
  getMockMultiPlayerSet,
  getMockSoloPlayerSet,
} from '../game-mock-data.ts/set'

// Docs here: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
// more here: https://github.com/chaijs/chai

// Basic test structure: it('should ',()=> {})

describe('Game gomponents Unit tests', () => {
  let players
  let malePlayer
  let femalePlayer
  let diversPlayer
  let soloTasks
  let multiTasks
  let genders
  const soloTasksPerGender = []
  const multiTasksPerGender = []
  beforeEach(() => {
    players = getMockPlayers()
    malePlayer = getMockPlayers()[0]
    femalePlayer = getMockPlayers()[1]
    diversPlayer = getMockPlayers()[2]
    soloTasks = getMockSoloPlayerSet().tasks
    multiTasks = getMockMultiPlayerSet().tasks
    genders = getGenders()

    soloTasksPerGender.push([0, 2].map((index) => soloTasks[index]))
    soloTasksPerGender.push([0, 4].map((index) => soloTasks[index]))
    soloTasksPerGender.push([0, 2, 4].map((index) => soloTasks[index]))

    multiTasksPerGender.push([0, 2].map((index) => soloTasks[index]))
    multiTasksPerGender.push([0, 4].map((index) => soloTasks[index]))
    multiTasksPerGender.push([0, 2, 4].map((index) => soloTasks[index]))
  })

  describe('getPossibleTasks', () => {
    before(() => {
      expect(getPossibleTasks).to.be.a('function')
    })

    it('should be empty if tasks are empty', () => {
      expect(getPossibleTasks([], malePlayer, TaskType.TRUTH)).to.be.an('array')
        .that.is.empty
    })

    it('should be 2 for (m/f) and 3 for (d) in solo tasks', () => {
      players
        .slice(0, -1)
        .forEach((player) =>
          expect(
            getPossibleTasks(soloTasks, player, TaskType.TRUTH)
          ).to.have.length(2)
        )
      expect(
        getPossibleTasks(soloTasks, diversPlayer, TaskType.TRUTH)
      ).to.have.length(3)
    })

    it('should be 2 for (m/f) and 3 for (d) in multi tasks', () => {
      players
        .slice(0, -1)
        .forEach((player) =>
          expect(
            getPossibleTasks(multiTasks, player, TaskType.TRUTH)
          ).to.have.length(2)
        )
      expect(
        getPossibleTasks(multiTasks, diversPlayer, TaskType.TRUTH)
      ).to.have.length(3)
    })
  })

  describe('getFillableTasks', () => {
    before(() => {
      expect(getFillableTasks).to.be.a('function')
    })

    it('should be empty if tasks are empty', () => {
      expect(
        getFillableTasks([], malePlayer, {
          male: 0,
          female: 0,
          divers: 0,
        })
      ).to.have.length(0)
    })

    it('should be empty if there are no players at all', () => {
      expect(
        getFillableTasks(soloTasks, malePlayer, {
          male: 0,
          female: 0,
          divers: 0,
        })
      ).to.have.length(0)
    })

    it('should be all in solo tasks', () => {
      soloTasksPerGender.forEach((tasks) =>
        expect(getFillableTasks(tasks, malePlayer, genders)).to.have.length(
          tasks.length
        )
      )
    })

    describe('different amounts of players for multi tasks', () => {
      it('should be all with enough players ', () => {
        multiTasksPerGender.forEach((tasks) =>
          expect(getFillableTasks(tasks, malePlayer, genders)).to.have.length(
            tasks.length
          )
        )
      })

      it('should be empty if playing alone', () => {
        expect(
          getFillableTasks([multiTasks[0]], malePlayer, {
            male: 1,
            female: 0,
            divers: 0,
          })
        )
      })

      it('should be empty if male requires more males with no divers to fill ', () => {
        multiTasks[0].requires = { male: 1, female: 0, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], malePlayer, {
            male: 1,
            female: 0,
            divers: 0,
          })
        ).to.have.length(0)
      })

      it('should be one if male requires more males and has divers to fill ', () => {
        multiTasks[0].requires = { male: 1, female: 0, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], malePlayer, {
            male: 1,
            female: 0,
            divers: 1,
          })
        ).to.have.length(1)
      })

      it('should be empty if female requires more females with no divers to fill ', () => {
        multiTasks[0].requires = { male: 0, female: 1, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, {
            male: 0,
            female: 1,
            divers: 0,
          })
        ).to.have.length(0)
      })

      it('should be one if female requires more females and has divers to fill ', () => {
        multiTasks[0].requires = { male: 0, female: 1, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, {
            male: 0,
            female: 1,
            divers: 1,
          })
        ).to.have.length(1)
      })

      it('should be one if male needs 2 female with 1 divers', () => {
        multiTasks[0].requires = { male: 0, female: 2, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], malePlayer, genders)
        ).to.have.length(1)
      })

      it('should be one if female needs 2 male with 1 divers', () => {
        multiTasks[0].requires = { male: 2, female: 0, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, genders)
        ).to.have.length(1)
      })

      it('should be one if divers needs 1 male and 1 female', () => {
        multiTasks[0].requires = { male: 1, female: 1, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, genders)
        ).to.have.length(1)
      })

      it('should be empty if divers needs 1 male and 1 female but misses one', () => {
        multiTasks[0].requires = { male: 1, female: 1, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, {
            male: 1,
            female: 0,
            divers: 1,
          })
        ).to.have.length(0)

        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, {
            male: 0,
            female: 1,
            divers: 1,
          })
        ).to.have.length(0)
      })

      it('should be one if divers needs 1 male and 1 female with extra divers to fill in', () => {
        multiTasks[0].requires = { male: 1, female: 1, any: 0 }
        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, {
            male: 1,
            female: 0,
            divers: 2,
          })
        ).to.have.length(1)

        expect(
          getFillableTasks([multiTasks[0]], femalePlayer, {
            male: 0,
            female: 1,
            divers: 2,
          })
        ).to.have.length(1)
      })
    })
  })

  describe('getUnplayedOverall', () => {
    before(() => {
      expect(getUnplayedOverall).to.be.a('function')
    })
  })

  describe('getUnplayedByMe', () => {
    before(() => {
      expect(getUnplayedByMe).to.be.a('function')
    })
  })

  describe('getLeastPlayedByMe', () => {
    before(() => {
      expect(getLeastPlayedByMe).to.be.a('function')
    })
  })

  describe('getLeastPlayedOverall', () => {
    before(() => {
      expect(getLeastPlayedOverall).to.be.a('function')
    })
  })

  describe('fillPlayersIntoMessage', () => {
    before(() => {
      expect(fillPlayersIntoMessage).to.be.a('function')
    })
  })

  describe('countPossibleTasksForPlayer', () => {
    before(() => {
      expect(countPossibleTasksForPlayer).to.be.a('function')
    })
  })
})
export {}
