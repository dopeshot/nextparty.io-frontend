import {
  TaskCurrentPlayerGender,
  TaskType,
} from '../../src/overmind/game/state'

export const getMockSoloPlayerSet = () => ({
  _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  truthCount: 4,
  dareCount: 4,
  language: 'de',
  createdBy: {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    username: 'Hello',
  },
  name: 'TestSet',
  tasks: [
    {
      currentPlayerGender: TaskCurrentPlayerGender.ANYONE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ja oder Nein?',
      requires: {
        male: 0,
        female: 0,
        any: 0,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.ANYONE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.DARE,
      message: 'Macht dus?',
      requires: {
        male: 0,
        female: 0,
        any: 0,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.MALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ja oder Nein?',
      requires: {
        male: 0,
        female: 0,
        any: 0,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.MALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.DARE,
      message: 'Macht dus?',
      requires: {
        male: 0,
        female: 0,
        any: 0,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.FEMALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ja oder Nein?',
      requires: {
        male: 0,
        female: 0,
        any: 0,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.FEMALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.DARE,
      message: 'Macht dus?',
      requires: {
        male: 0,
        female: 0,
        any: 0,
      },
      playedBy: [],
    },
  ],
})

export const getMockMultiPlayerSet = () => ({
  _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  truthCount: 4,
  dareCount: 4,
  language: 'de',
  createdBy: {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    username: 'Hello',
  },
  name: 'TestSet',
  tasks: [
    {
      currentPlayerGender: TaskCurrentPlayerGender.ANYONE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ist @a',
      requires: {
        male: 0,
        female: 0,
        any: 1,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.ANYONE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.DARE,
      message: 'Macht es @a',
      requires: {
        male: 0,
        female: 0,
        any: 1,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.MALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ist @a',
      requires: {
        male: 0,
        female: 0,
        any: 1,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.MALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.DARE,
      message: 'Macht es @a',
      requires: {
        male: 0,
        female: 0,
        any: 1,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.FEMALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ist @a',
      requires: {
        male: 0,
        female: 0,
        any: 1,
      },
      playedBy: [],
    },
    {
      currentPlayerGender: TaskCurrentPlayerGender.FEMALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.DARE,
      message: 'Macht es @a',
      requires: {
        male: 0,
        female: 0,
        any: 1,
      },
      playedBy: [],
    },
  ],
})
