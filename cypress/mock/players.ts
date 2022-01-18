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
export const getGenders = () => ({
  male: 1,
  female: 1,
  divers: 1,
});
