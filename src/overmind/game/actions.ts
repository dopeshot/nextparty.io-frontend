import { History } from 'history';
import { Context } from "..";
import { countPossibleTasksForPlayer, fillPlayersIntoMessage, getFillableTasks, getLeastPlayedByMe, getLeastPlayedOverall, getPossibleTasks, getUnplayedByMe, getUnplayedOverall } from "../../services/game/GameComponents";
import { shuffleArray, shufflePlayers } from "../../services/game/GameUtilities";
import { countGenderOccurrences } from "../../services/utilities/utilities";
import { Language } from '../../shared/enums/Language';
import { Visibility } from '../../shared/enums/Visibility';
import { SetCategory } from '../../shared/types/SetCategory';
import { TaskCurrentPlayerGender } from '../../shared/types/TaskCurrentPlayerGender';
import { TaskType } from '../../shared/types/TaskType';
import { Set } from '../explore/state';
import { playerRequiredToPlay } from "../players/state";
import { GameStatus, PlayTask, StartGameErrors } from "./state";

export const launchGame = ({ actions }: Context, history: History) => {
    const isPossibleToPlay = actions.game.isPossibleToPlay()

    if (!isPossibleToPlay.status) {
        console.error(isPossibleToPlay.errors)

        // Push back to start page
        history.push('/game')

        return
    }
    actions.game.newGame()
    actions.game.nextPlayer()
}

export const isPossibleToPlay = ({ state }: Context) => {
    const errors: StartGameErrors[] = []

    if (state.players.players.length < playerRequiredToPlay) {
        errors.push(StartGameErrors.PLAYERS)
    }

    if (!state.game.set || state.game.set.tasks.length === 0) {
        errors.push(StartGameErrors.SET)
    }

    return {
        status: errors.length ? false : true,
        errors
    }
}
export const newGame = ({ state, actions }: Context) => {
    // MC: We know that state.game.set is not null here.
    if (!state.game.set)
        return


    // Set Game Status 
    state.game.gameStatus = GameStatus.START

    // Add players to game
    state.game.players = state.players.players.map(player => ({
        ...player,
        // @ts-ignore We validate before that it's not null
        possibleTaskCount: countPossibleTasksForPlayer(state.game.set.tasks, player, state.game.playersGenderCount)
    }))

    // Remove game history if set was used before
    state.game.set.tasks = state.game.set.tasks.map(task => ({
        ...task,
        playedBy: []
    }))

    // Shuffle tasks
    state.game.set.tasks = shuffleArray(state.game.set.tasks)

    // Shuffle players
    state.game.players = shufflePlayers(state.game.players)

    state.game.currentPlayerIndex = -1
    state.game.currentTask = null

    // Developer
    state.game.debug.playerLog = []
}

export const nextPlayer = ({ state }: Context) => {
    let nextPlayerIndex = state.game.currentPlayerIndex + 1

    if (nextPlayerIndex > state.game.players.length - 1) {
        state.game.players = shufflePlayers(state.game.players)
        nextPlayerIndex = 0
    }
    state.game.currentPlayerIndex = nextPlayerIndex
    state.game.gameStatus = GameStatus.PLAYER_PICKED

    state.game.debug.playerLog = [...state.game.debug.playerLog, `${nextPlayerIndex} - ${state.game.players[nextPlayerIndex].name}`]
}

export const pickTaskType = ({ state, actions }: Context, taskType: TaskType) => {
    // 5: Find Task
    actions.game.findTask(taskType)

    state.game.gameStatus = GameStatus.TYPE_PICKED
}

// MC: Require Ref is duplicate
export const isPossibleTask = ({ state }: Context, taskType: TaskType) => {

    if (!state.game.set)
        return false // There is data missing

    let tasks = getPossibleTasks(state.game.set.tasks, state.game.currentPlayer, taskType)
    if (tasks.length === 0)
        return false // This player has no possible tasks at all

    tasks = getFillableTasks(tasks, state.game.currentPlayer, state.game.playersGenderCount)
    if (tasks.length === 0)
        return false // This group has no possible tasks for this player

    return true
}

export const findTask = ({ state, actions }: Context, taskType: TaskType): boolean => {

    if (!state.game.set) {
        console.error("Data is missing")
        return false
    }

    // 5.1 Filter by type and Gender
    let tasks = getPossibleTasks(state.game.set.tasks, state.game.currentPlayer, taskType)
    if (tasks.length === 0) {
        console.error("This player has no possible tasks at all")
        return false
    }

    // 5.1.1 Filter for fillable tasks
    tasks = getFillableTasks(tasks, state.game.currentPlayer, state.game.playersGenderCount)
    if (tasks.length === 0) {
        console.error("This group has no possible tasks for this player")
        return false
    }

    // 5.2 Filter unplayed / unique overall
    let matchingTasks = getUnplayedOverall(tasks)
    if (matchingTasks.length > 0) {
        actions.game.generateFinalMessage(matchingTasks[0])
        return true
    }
    console.warn("There are no more possible unique tasks OVERALL")

    // 5.3 Filter unique for me
    matchingTasks = getUnplayedByMe(tasks, state.game.currentPlayer)
    if (matchingTasks.length > 0) {
        actions.game.generateFinalMessage(getLeastPlayedOverall(matchingTasks))
        return true
    }
    console.warn("There are no more possible unique tasks FOR ME")

    // 5.4 Sort by least played for me 
    matchingTasks = getLeastPlayedByMe(tasks, state.game.currentPlayer)
    if (matchingTasks.length === 1) {
        actions.game.generateFinalMessage(matchingTasks[0])
        return true
    }

    // 5.5 Filter least played overall
    const lastMatchingTask = getLeastPlayedOverall(matchingTasks)
    actions.game.generateFinalMessage(lastMatchingTask)
    return true
}

export const generateFinalMessage = ({ state }: Context, playTask: PlayTask) => {
    if (!state.game.set) {
        console.error("Data is missing.")
        return false
    }

    const task = state.game.set.tasks.find(task => task._id === playTask._id)!
    task.playedBy = [...task.playedBy, state.game.currentPlayer.id]

    state.game.currentTask = fillPlayersIntoMessage(state.game.players, playTask, state.game.currentPlayer)
}

export const addSetToGame = ({ state }: Context) => {
    if (!state.explore.setDetails) {
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

export const toggleDeveloper = ({ state }: Context) => {
    state.game.debug.isDeveloper = !state.game.debug.isDeveloper
}

export const hideTabBar = ({ state }: Context, bool: boolean) => {
    if (state.game.hideTabBar !== bool)
        state.game.hideTabBar = bool
}

/**
 * For Testing
 */
export const resetSet = ({ state }: Context) => {
    state.game.set = null

    // Reset game status
    state.game.gameStatus = GameStatus.START
}

/**
 * For Testing
 */
export const addTestSet = ({ state }: Context, onlyTaskType: "truth" | "dare" | "longmessage") => {
    const onlyTruths: (Set & { tasks: PlayTask[] }) = {
        "_id": "61a7bd4c08c2192fcff61461",
        "dareCount": 0,
        "truthCount": 2,
        "language": Language.DE,
        "played": 0,
        "category": SetCategory.CLASSIC,
        "visibility": Visibility.PUBLIC,
        "createdBy": {
            "_id": "61952ca8a3b39d65488ac330",
            "username": "Zoe"
        },
        "name": "Only Truths",
        "tasks": [
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d0",
                "type": TaskType.TRUTH,
                "message": "Wann hattest du das letzte mal Sex?",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d1",
                "type": TaskType.TRUTH,
                "message": "Wie viele Partner*innen hattest du bis jetzt?",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            }
        ]
    }

    const onlyDares: (Set & { tasks: PlayTask[] }) = {
        "_id": "61a7bd4c08c2192fcff61462",
        "dareCount": 2,
        "played": 0,
        "truthCount": 0,
        "language": Language.DE,
        "category": SetCategory.CLASSIC,
        "visibility": Visibility.PUBLIC,
        "createdBy": {
            "_id": "61952ca8a3b39d65488ac330",
            "username": "Zoe"
        },
        "name": "Only Dares",
        "tasks": [
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d0",
                "type": TaskType.DARE,
                "message": "Iss ein Stück von etwas (z.B Schlagsahne) von @a's Pobacke",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": TaskCurrentPlayerGender.FEMALE,
                "_id": "61a7bd4c08c2192fcff614d1",
                "type": TaskType.DARE,
                "message": "Präsentiere, wie du eine einen Mann anmachen würdest",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            }
        ]
    }

    const both: (Set & { tasks: PlayTask[] }) = {
        "_id": "61a7bd4c08c2192fcff61465",
        "dareCount": 1,
        "played": 0,
        "truthCount": 1,
        "language": Language.DE,
        "category": SetCategory.CLASSIC,
        "visibility": Visibility.PUBLIC,
        "createdBy": {
            "_id": "61952ca8a3b39d65488ac330",
            "username": "Zoe"
        },
        "name": "Versaut",
        "tasks": [
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d0",
                "type": TaskType.DARE,
                "message": "Iss ein Stück von etwas (z.B Schlagsahne) von @a's Pobacke",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 1
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d1",
                "type": TaskType.TRUTH,
                "message": "Wie viele Partner*innen hattest du bis jetzt?",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            }
        ]
    }

    const longmessage: (Set & { tasks: PlayTask[] }) = {
        "_id": "61a7bd4c08c2192fcff61465",
        "dareCount": 1,
        "truthCount": 1,
        "played": 0,
        "visibility": Visibility.PUBLIC,
        "category": SetCategory.CLASSIC,
        "language": Language.DE,
        "createdBy": {
            "_id": "61952ca8a3b39d65488ac330",
            "username": "Zoe"
        },
        "name": "Long Message",
        "tasks": [
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d0",
                "type": TaskType.DARE,
                "message": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            },
            {
                "currentPlayerGender": TaskCurrentPlayerGender.ANYONE,
                "_id": "61a7bd4c08c2192fcff614d1",
                "type": TaskType.TRUTH,
                "message": "Wie viele Partner*innen hattest du bis jetzt?",
                "requires": {
                    "male": 0,
                    "female": 0,
                    "any": 0
                },
                "playedBy": []
            }
        ]
    }

    if (!onlyTaskType) {
        state.game.set = both
    }

    switch (onlyTaskType) {
        case "truth":
            state.game.set = onlyTruths
            break
        case "dare":
            state.game.set = onlyDares
            break
        case "longmessage":
            state.game.set = longmessage
            break
        default:
            state.game.set = both
            break
    }

    // Reset game status
    state.game.gameStatus = GameStatus.START
} 