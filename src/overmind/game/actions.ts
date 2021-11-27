import { Context } from "..";
import { getFillableTasks, getPossibleTasks } from "../../services/game/GameComponents";
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
        state.game.players = shuffleArray(state.game.players)
    }
    actions.game.nextPlayer()
}

export const nextPlayer = ({state}: Context) => {
    let nextPlayerIndex = state.game.currentPlayerIndex + 1

    if(nextPlayerIndex > state.game.players.length - 1) {
        state.game.players = shuffleArray(state.game.players)
        nextPlayerIndex = 0
    }
    state.game.currentPlayerIndex = nextPlayerIndex
    state.game.gameStatus = GameStatus.PLAYER_PICKED

    console.log("nextPlayer() ", nextPlayerIndex, state.game.players[nextPlayerIndex].name)
}

export const pickTaskType = ({state}: Context, taskType: TaskType) => {
    console.log("pickTaskType() ", taskType)
    
    // 5.1 Filter by type and Gender
    let tasks = getPossibleTasks(state.game.set.tasks, state.game.currentPlayer, taskType)
    if(tasks.length === 0) {
        console.error("This player has no possible tasks at all")
        return
    }
    
    // 5.1.1 Filter for fillable tasks
    tasks = getFillableTasks(tasks, state.game.currentPlayer, state.game.playersGenderCount)
    if(tasks.length === 0) {
        console.error("This group has no possible tasks for this player")
        return
    }

    

    console.log("tasks ", tasks)

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

export const addPlayersToGame = ({state}: Context) => {
    state.game.players = [...state.players.players]
}