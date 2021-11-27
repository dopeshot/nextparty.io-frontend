import { Context } from "..";
import { countGenderOccurrences } from "../../services/Utilities";
import { GameStatus, TaskType } from "./state";



export const nextPlayer = ({state}: Context) => {
    console.log("nextPlayer() ")

    state.game.gameStatus = GameStatus.PLAYER_PICKED
}

export const pickTaskType = ({state}: Context, taskType: TaskType) => {
    console.log("pickTaskType() ", taskType)

    state.game.gameStatus = GameStatus.TYPE_PICKED
}

export const addSetToGame = ({state}: Context) => {
    if(!state.explore.setDetails) {
        console.error("setDetails is not set")
        return
    }

    state.game.set = {
        ...state.explore.setDetails,
        tasks: state.explore.setDetails.tasks.map(task => ({
            ...task,
            requires: countGenderOccurrences(task.message),
            playedBy: []
        }))
    }
}