import { Gender } from "../../src/overmind/players/state";

export const getMockPlayers = () => [
  {
    id: 0,
    name: "malePlayer",
    gender: Gender.MALE,
  },
  {
    id: 1,
    name: "femalePlayer",
    gender: Gender.FEMALE,
  },
  {
    id: 2,
    name: "diversPlayer",
    gender: Gender.DIVERS,
  },
];

export const getMockPlayersWithPossibleTaskCount = () => [
  {
    id: 0,
    name: "malePlayer",
    gender: Gender.MALE,
    possibleTaskCount: 4
  },
  {
    id: 1,
    name: "femalePlayer",
    gender: Gender.FEMALE,
    possibleTaskCount: 4
  },
  {
    id: 2,
    name: "diversPlayer",
    gender: Gender.DIVERS,
    possibleTaskCount: 6
  },
];
export const getGenders = () => ({
  male: 1,
  female: 1,
  divers: 1,
});
