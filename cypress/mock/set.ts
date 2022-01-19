import { SetWithPlayTasks } from "../../src/overmind/game/state"
import { Language } from "../../src/shared/enums/Language"
import { Visibility } from "../../src/shared/enums/Visibility"
import { SetCategory } from "../../src/shared/types/SetCategory"
import { TaskCurrentPlayerGender } from "../../src/shared/types/TaskCurrentPlayerGender"
import { TaskType } from "../../src/shared/types/TaskType"

export const getMockSoloPlayerSet = (): SetWithPlayTasks => ({
  _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  truthCount: 4,
  dareCount: 4,
  language: Language.DE,
  visibility: Visibility.PUBLIC,
  slug: "testset",
  played: 0,
  category: SetCategory.CLASSIC,
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

export const getMockUnplayableSet = () => ({
  _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  truthCount: 4,
  dareCount: 4,
  language: Language.DE,
  createdBy: {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    username: 'Hello',
  },
  name: 'TestSet',
  played: 0,
  category: SetCategory.CLASSIC,
  visibility: Visibility.PUBLIC,
  slug: 'testset',
  tasks: [
    {
      currentPlayerGender: TaskCurrentPlayerGender.FEMALE,
      _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      type: TaskType.TRUTH,
      message: 'Ja oder Nein? @f @f',
      requires: {
        male: 0,
        female: 2,
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
  language: Language.DE,
  visibility: Visibility.PUBLIC,
  slug: "testset",
  played: 0,
  category: SetCategory.CLASSIC,
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
      message: '@a',
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
