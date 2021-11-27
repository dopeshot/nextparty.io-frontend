import { action } from "overmind/lib/operator";
import { Context } from "..";
import { fillPlayersIntoMessage, getFillableTasks, getLeastPlayedByMe, getLeastPlayedOverall, getPossibleTasks, getUnplayedByMe, getUnplayedOverall } from "../../services/game/GameComponents";
import { shuffleArray } from "../../services/game/GameUtilities";
import { countGenderOccurrences } from "../../services/Utilities";
import { playerRequiredToPlay } from "../players/state";
import { GameStatus, PlayTask, TaskType } from "./state";


export const launchGame = ({state, actions}: Context) => {
    if(state.game.players.length < playerRequiredToPlay || !state.game.set) {
        console.error("Starting a game. Data is missing.")
        return
    }

    // First start
    if(state.game.gameStatus === GameStatus.START) {
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

export const pickTaskType = ({state, actions}: Context, taskType: TaskType) => {
    
    // 5: Find Task
    actions.game.findTask(taskType)

    state.game.gameStatus = GameStatus.TYPE_PICKED
}

export const findTask = ({state, actions}: Context, taskType: TaskType): boolean => {
    // 5.1 Filter by type and Gender
    let tasks = getPossibleTasks(state.game.set.tasks, state.game.currentPlayer, taskType)
    if(tasks.length === 0) {
        console.error("This player has no possible tasks at all")
        return false
    }
    
    // 5.1.1 Filter for fillable tasks
    tasks = getFillableTasks(tasks, state.game.currentPlayer, state.game.playersGenderCount)
    if(tasks.length === 0) {
        console.error("This group has no possible tasks for this player")
        return false
    }

    // 5.2 Filter unplayed / unique overall
    let matchingTasks = getUnplayedOverall(tasks)
    if(matchingTasks.length > 0) {
        actions.game.generateFinalMessage(matchingTasks[0])
        return true
    }

    // 5.3 Filter unique for me
    matchingTasks = getUnplayedByMe(tasks, state.game.currentPlayer)
    if(matchingTasks.length > 0) {
        actions.game.generateFinalMessage(getLeastPlayedOverall(matchingTasks))
        return true
    }
    console.warn("There are no more possible unique personal tasks")

    // 5.4 Sort by least played for me 
    matchingTasks = getLeastPlayedByMe(tasks, state.game.currentPlayer)
    if(matchingTasks.length === 1) {
        actions.game.generateFinalMessage(matchingTasks[0])
        return true
    }

    // 5.5 Filter least played overall
    const lastMatchingTask = getLeastPlayedOverall(matchingTasks)
    actions.game.generateFinalMessage(lastMatchingTask)
    return true
}

export const generateFinalMessage = ({state}: Context, playTask: PlayTask) => {
    const task = state.game.set.tasks.find(task => task._id === playTask._id)!
    task.playedBy = [...task.playedBy, state.game.currentPlayer.id]
    
    state.game.currentTaskMessage = fillPlayersIntoMessage(state.game.players, playTask.message, state.game.currentPlayer)
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