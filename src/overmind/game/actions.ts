import { Context } from "..";
import { shuffleArray } from "../../services/game/GameUtilities";
import { countGenderOccurrences } from "../../services/Utilities";
import { GameStatus, TaskType } from "./state";


export const launchGame = ({state, actions}: Context) => {
    console.log("launchGame() ")
    if(state.game.gameStatus === GameStatus.START) {
        console.log("firstStart")

        // Shuffle tasks
        state.game.set!.tasks = shuffleArray(state.game.set!.tasks)

        // Shuffle players
        //state.players.players
    }
    actions.game.nextPlayer()
}

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

    // Reset game status when selecting new set
    state.game.gameStatus = GameStatus.START
}