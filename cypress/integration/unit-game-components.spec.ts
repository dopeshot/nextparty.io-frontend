import {
  countPossibleTasksForPlayer,
  fillPlayersIntoMessage,
  getFillableTasks,
  getLeastPlayedByMe,
  getLeastPlayedOverall,
  getPossibleTasks,
  getUnplayedByMe,
  getUnplayedOverall
} from '../../src/services/game/GameComponents'
import { TaskType } from '../../src/shared/types/TaskType'
import { getGenders, getMockPlayers } from '../game-mock-data.ts/players'
import {
  getMockMultiPlayerSet,
  getMockSoloPlayerSet
} from '../game-mock-data.ts/set'

// Docs here: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
// more here: https://github.com/chaijs/chai

// Basic test structure: it('should ',()=> {})

describe('Game gomponents Unit tests', () => {
  const players = getMockPlayers()
  const malePlayer = getMockPlayers()[0]
  const femalePlayer = getMockPlayers()[1]
  const diversPlayer = getMockPlayers()[2]
  const genders = getGenders()
  const soloTasksPerGender = []
  const multiTasksPerGender = []

  // Set once here to have the types
  let soloTasks = getMockSoloPlayerSet().tasks
  let multiTasks = getMockMultiPlayerSet().tasks

  beforeEach(() => {
    soloTasks = getMockSoloPlayerSet().tasks
    multiTasks = getMockMultiPlayerSet().tasks

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

    describe('null/undefined tests', () => {
      it('should be undefined if tasks is null ', () => {
        expect(getPossibleTasks(null, malePlayer, TaskType.TRUTH)).to.be.undefined
      })

      it('should be undefined if tasks is undefined ', () => {
        expect(getPossibleTasks(undefined, malePlayer, TaskType.TRUTH)).to.be.undefined
      })

      it('should be only the @ca tasks if player is null ', () => {
        expect(getPossibleTasks(soloTasks, null, TaskType.TRUTH)).to.have.length(1)
      })

      it('should be only the @ca tasks if player is undefined ', () => {
        expect(getPossibleTasks(soloTasks, undefined, TaskType.TRUTH)).to.have.length(1)
      })

      it('should be all @cm if tasktype is null ', () => {
        expect(getPossibleTasks(soloTasks, malePlayer, null)).to.have.length(4)
      })

      it('should be all @cm if tasktype is undefined ', () => {
        expect(getPossibleTasks(soloTasks, malePlayer, undefined)).to.have.length(4)
      })

      it('should be empty if tasks is empty ', () => {
        expect(getPossibleTasks([], malePlayer, TaskType.TRUTH)).to.have.length(0)
      })
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

    describe('null/undefined tests', () => {
      it('should be undefined if tasks is null ', () => {
        expect(getFillableTasks(null, malePlayer, genders)).to.be.undefined
      })

      it('should be undefined if tasks is undefined ', () => {
        expect(getFillableTasks(undefined, malePlayer, genders)).to.be.undefined
      })

      it('should be all if player is null ', () => {
        expect(getFillableTasks(soloTasks, null, genders)).to.have.length(soloTasks.length)
      })

      it('should be all if player is undefined ', () => {
        expect(getFillableTasks(soloTasks, undefined, genders)).to.have.length(soloTasks.length)
      })

      it('should be empty if genders is null ', () => {
        expect(getFillableTasks(soloTasks, malePlayer, null)).to.have.length(0)
      })

      it('should be empty if genders is undefined ', () => {
        expect(getFillableTasks(soloTasks, malePlayer, undefined)).to.have.length(0)
      })

      it('should be empty if tasks is empty ', () => {
        expect(getFillableTasks([], malePlayer, genders)).to.have.length(0)
      })
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

    describe('null/undefined tests', () => {
      it('should be undefined if tasks is null ', () => {
        expect(getUnplayedOverall(null)).to.be.undefined
      })

      it('should be undefined if tasks is undefined ', () => {
        expect(getUnplayedOverall(undefined)).to.be.undefined
      })

      it('should be empty if tasks is empty ', () => {
        expect(getUnplayedOverall([])).to.have.length(0)
      })
    })

    it('should be all if playedBy is empty ', () => {
      expect(getUnplayedOverall(soloTasks)).to.have.length(soloTasks.length)
    })

    it('should be empty if playedBy filled ', () => {
      soloTasks[0].playedBy.push('a')
      expect(getUnplayedOverall([soloTasks[0]])).to.have.length(0)
    })
  })

  describe('getUnplayedByMe', () => {
    before(() => {
      expect(getUnplayedByMe).to.be.a('function')
    })

    describe('null/undefined tests', () => {
      it('should be undefined if tasks is null ', () => {
        expect(getUnplayedByMe(null, malePlayer)).to.be.undefined
      })

      it('should be undefined if tasks is undefined ', () => {
        expect(getUnplayedByMe(undefined, malePlayer)).to.be.undefined
      })

      it('should be all if player is null ', () => {
        expect(getUnplayedByMe(soloTasks, null)).to.have.length(soloTasks.length)
      })

      it('should be all if player is undefined ', () => {
        expect(getUnplayedByMe(soloTasks, undefined)).to.have.length(soloTasks.length)
      })

      it('should be empty if tasks is empty ', () => {
        expect(getUnplayedByMe([], malePlayer)).to.have.length(0)
      })
    })

    it('should be all if playedBy is empty ', () => {
      expect(getUnplayedByMe(soloTasks, malePlayer)).to.have.length(soloTasks.length)
    })

    it('should be empty if playedBy filled ', () => {
      soloTasks[0].playedBy.push(malePlayer.id)
      expect(getUnplayedByMe([soloTasks[0]], malePlayer)).to.have.length(0)
    })

  })

  describe('getLeastPlayedByMe', () => {
    before(() => {
      expect(getLeastPlayedByMe).to.be.a('function')
    })

    describe('null/undefined tests', () => {
      it('should be undefined if tasks is null ', () => {
        expect(getLeastPlayedByMe(null, malePlayer)).to.be.undefined
      })

      it('should be undefined if tasks is undefined ', () => {
        expect(getLeastPlayedByMe(undefined, malePlayer)).to.be.undefined
      })

      it('should be all if player is null ', () => {
        expect(getLeastPlayedByMe(soloTasks, null)).to.have.length(soloTasks.length)
      })

      it('should be all if player is undefined ', () => {
        expect(getLeastPlayedByMe(soloTasks, undefined)).to.have.length(soloTasks.length)
      })

      it('should be empty if tasks is empty ', () => {
        expect(getLeastPlayedByMe([], malePlayer)).to.have.length(0)
      })
    })

    it('should be all if none are played yet', () => {
      expect(getLeastPlayedByMe(soloTasks, malePlayer)).to.have.length(soloTasks.length)
    })

    it('should be all-1 if one has been played', () => {
      soloTasks[0].playedBy.push(malePlayer.id)
      expect(getLeastPlayedByMe(soloTasks, malePlayer)).to.have.length(soloTasks.length - 1)
    })

    it('should be 1 if all but one have been played ', () => {
      soloTasks.forEach((task) => { task.playedBy.push(malePlayer.id) })
      soloTasks[0].playedBy.pop()
      expect(getLeastPlayedByMe(soloTasks, malePlayer)).to.have.length(1)
    })

    it('should be all if all have been played', () => {
      soloTasks.forEach((task) => { task.playedBy.push(malePlayer.id) })
      expect(getLeastPlayedByMe(soloTasks, malePlayer)).to.have.length(soloTasks.length)
    })

  })

  describe('getLeastPlayedOverall', () => {
    before(() => {
      expect(getLeastPlayedOverall).to.be.a('function')
    })

    describe('null/undefined tests', () => {
      it('should be undefined if tasks is null ', () => {
        expect(getLeastPlayedOverall(null)).to.be.undefined
      })

      it('should be undefined if tasks is undefined ', () => {
        expect(getLeastPlayedOverall(undefined)).to.be.undefined
      })

      it('should be the undefined if tasks is empty', () => {
        // This assumes that the array.sort() function is a stable sort
        expect(getLeastPlayedOverall([])).to.be.undefined
      })
    })



    it('should be the first if none are played', () => {
      // This assumes that the array.sort() function is a stable sort
      expect(getLeastPlayedOverall(soloTasks)).to.eql(soloTasks[0])
    })

    it('should be the first if the other has been played', () => {
      // Note that soloTasks is being changed upon the function call
      soloTasks[0].playedBy.push(malePlayer.id)
      const cachedSoloTask = soloTasks[0]

      // This is always true since the [0] is hard coded
      expect(getLeastPlayedOverall(soloTasks)).to.eql(soloTasks[0])

      // This tests if the position 0 has changed due to it being the most played
      expect(soloTasks[0]).to.not.eql(cachedSoloTask)
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
export { }

