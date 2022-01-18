import { PlayTask } from '../../src/overmind/game/state'
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
import { getGenders, getMockPlayers } from '../mock/players'
import {
  getMockMultiPlayerSet,
  getMockSoloPlayerSet
} from '../mock/set'

// Docs here: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
// more here: https://github.com/chaijs/chai

// Basic test structure: it('should ',()=> {})
const malePlayer = getMockPlayers()[0]
const femalePlayer = getMockPlayers()[1]
const diversPlayer = getMockPlayers()[2]
const genders = getGenders()
const soloTasksPerGender: PlayTask[][] = []
const multiTasksPerGender: PlayTask[][] = []
// Set once here to have the types
let players = getMockPlayers()
let soloTasks = getMockSoloPlayerSet().tasks
let multiTasks = getMockMultiPlayerSet().tasks

describe('Game gomponents Unit tests', () => {

  beforeEach(() => {
    soloTasks = getMockSoloPlayerSet().tasks
    multiTasks = getMockMultiPlayerSet().tasks
    players = getMockPlayers()

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

    describe('empty tests', () => {
      it('should be all @cm if tasktype is null ', () => {
        expect(getPossibleTasks(soloTasks, malePlayer, null)).to.have.length(4)
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

    describe('empty tests', () => {
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

    describe('empty tests', () => {

      it('should be empty if tasks is empty ', () => {
        expect(getUnplayedOverall([])).to.have.length(0)
      })
    })

    it('should be all if playedBy is empty ', () => {
      expect(getUnplayedOverall(soloTasks)).to.have.length(soloTasks.length)
    })

    it('should be empty if playedBy filled ', () => {
      soloTasks[0].playedBy.push(69)
      expect(getUnplayedOverall([soloTasks[0]])).to.have.length(0)
    })
  })

  describe('getUnplayedByMe', () => {
    before(() => {
      expect(getUnplayedByMe).to.be.a('function')
    })

    describe('empty tests', () => {

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

    describe('empty tests', () => {
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

    describe('empty tests', () => {
      it('should be the undefined if tasks is empty', () => {
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

    describe('empty tests', () => {
      it('should be null if players is empty ', () => {
        expect(fillPlayersIntoMessage([], soloTasks[0], malePlayer)).to.eql(soloTasks[0])
      })
    })

    it('should return the message unchanged if it does not need players', () => {
      const message = fillPlayersIntoMessage(players, soloTasks[0], malePlayer).message
      expect(message).to.equal(soloTasks[0].message)
    })

    it('should change the message with anyone if it needs @a', () => {
      const message = fillPlayersIntoMessage(players, multiTasks[0], malePlayer).message
      expect(message).to.not.equal(soloTasks[0].message)
    })

    it('should fill the message with anyone but the currentPlayer if it needs @a', () => {
      players.pop()
      const message = fillPlayersIntoMessage(players, multiTasks[0], malePlayer).message
      expect(message).to.not.equal(malePlayer.name)
      expect(message).to.equal(femalePlayer.name)
    })

    it('should fill undefined when task needs more people than it has', () => {
      players.pop()
      multiTasks[0].message = '@a @a'
      multiTasks[0].requires = { male: 0, female: 0, any: 2 }
      const message = fillPlayersIntoMessage(players, multiTasks[0], malePlayer).message
      expect(message).to.not.equal(`${malePlayer.name} undefined`)
      expect(message).to.equal(`${femalePlayer.name} undefined`)
    })

    it('should fill @m with male if no divers', () => {
      players = [0, 1].map(index => players[index])
      multiTasks[0].message = '@m'
      multiTasks[0].requires = { male: 1, female: 0, any: 0 }
      const message = fillPlayersIntoMessage(players, multiTasks[0], femalePlayer).message
      expect(message).to.equal(malePlayer.name)
    })

    it('should fill @f with female if no divers', () => {
      players = [0, 1].map(index => players[index])
      multiTasks[0].message = '@f'
      multiTasks[0].requires = { male: 0, female: 1, any: 0 }
      const message = fillPlayersIntoMessage(players, multiTasks[0], malePlayer).message
      expect(message).to.equal(femalePlayer.name)
    })

    it('should fill @f with divers if no female', () => {
      players = [0, 2].map(index => players[index])
      multiTasks[0].message = '@f'
      multiTasks[0].requires = { male: 0, female: 1, any: 0 }
      const message = fillPlayersIntoMessage(players, multiTasks[0], malePlayer).message
      expect(message).to.equal(diversPlayer.name)
    })

    it('should fill @m with divers if no male', () => {
      players = [1, 2].map(index => players[index])
      multiTasks[0].message = '@m'
      multiTasks[0].requires = { male: 1, female: 0, any: 0 }
      const message = fillPlayersIntoMessage(players, multiTasks[0], femalePlayer).message
      expect(message).to.equal(diversPlayer.name)
    })

  })

  describe('countPossibleTasksForPlayer, this function has no own logic and thus no functionality tests', () => {
    before(() => {
      expect(countPossibleTasksForPlayer).to.be.a('function')
    })

    describe('empty tests', () => {

      it('should be 0 if task is empty', () => {
        expect(countPossibleTasksForPlayer([], malePlayer, genders)).to.equal(0)
      })
    })

  })
})
export { }

