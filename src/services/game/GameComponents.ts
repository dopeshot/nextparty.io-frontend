import { PlayerGenderCount, PlayTask } from "../../overmind/game/state"
import { Gender, Player } from "../../overmind/players/state"
import { TaskCurrentPlayerGender } from "../../shared/types/TaskCurrentPlayerGender"
import { TaskPlayerGender } from "../../shared/types/TaskPlayerGender"
import { TaskType } from "../../shared/types/TaskType"
import { countPlayedByPlayer, genderToTaskCurrentPlayerGender, shuffleArray } from "./GameUtilities"

export const getPossibleTasks = (tasks: PlayTask[], player: Player, pickedTaskType: TaskType | null) => {
    return tasks?.filter(task =>
        (task.type === pickedTaskType || !pickedTaskType) &&
        (
            task.currentPlayerGender === TaskCurrentPlayerGender.ANYONE ||
            task.currentPlayerGender === genderToTaskCurrentPlayerGender(player?.gender) ||
            player?.gender === Gender.DIVERS
        )
    )
}

export const getFillableTasks = (tasks: PlayTask[], player: Player, playerGenderCount: PlayerGenderCount) => {
    const reducedGenders = { ...playerGenderCount }
    if (!reducedGenders) return []
    reducedGenders[player?.gender]--

    const fillableTasks = tasks?.filter((task) => {
        // Check if there are enough people to play the task at all
        if (Object.values(reducedGenders).reduce((sum, value) => sum + value) - Object.values(task.requires).reduce((sum, value) => sum + value) < 0) {
            return false
        }
        // Check if there is no need to fill in divers people
        if ((task.requires.male <= reducedGenders.male && task.requires.female <= reducedGenders.female)) {
            return true
        }
        // Fill in divers players
        else {
            let divers = reducedGenders.divers
            if (task.requires.male > reducedGenders.male) {
                divers -= task.requires.male - reducedGenders.male
            }
            if (task.requires.female > reducedGenders.female) {
                divers -= task.requires.female - reducedGenders.female
            }
            return divers >= 0
        }
    })
    return fillableTasks
}

export const getUnplayedOverall = (tasks: PlayTask[]) => {
    return tasks?.filter(task => task.playedBy.length === 0)
}

export const getUnplayedByMe = (tasks: PlayTask[], player: Player) => {
    return tasks?.filter(task => !task.playedBy.includes(player?.id))
}

export const getLeastPlayedByMe = (tasks: PlayTask[], player: Player) => {
    const sortedTasks = tasks?.sort((a, b) => countPlayedByPlayer(a.playedBy, player) - countPlayedByPlayer(b.playedBy, player))
    return sortedTasks?.filter(task => countPlayedByPlayer(task.playedBy, player) === countPlayedByPlayer(sortedTasks[0].playedBy, player))
}

export const getLeastPlayedOverall = (tasks: PlayTask[]) => {
    return tasks?.sort((a, b) => (a.playedBy.length - b.playedBy.length))[0]
}

export const fillPlayersIntoMessage = (players: Player[], playTask: PlayTask, currentPlayer: Player) => {
    // This function can not work if the params are null/undefined
    if (!players || players.length === 0 || !playTask || !currentPlayer) return null
    const playersWithoutCurrent = [...players].filter(player => player.id !== currentPlayer.id)
    // This shuffle needs to be there to make sure that not all the same divers get merged later on
    const playerNamesByGender = shuffleArray(playersWithoutCurrent).reduce<{
        male: string[],
        female: string[],
        divers: string[]
    }>((result, player) => {
        switch (player.gender) {
            case Gender.MALE:
                result.male.push(player.name)
                break
            case Gender.FEMALE:
                result.female.push(player.name)
                break
            case Gender.DIVERS:
                result.divers.push(player.name)
                break
        }
        return result
    }, {
        male: [],
        female: [],
        divers: []
    })

    // Merge divers into male and female where needed, then distribute the rest
    for (let i = 0; i < playTask.requires.male - playerNamesByGender.male.length; i++) {
        playerNamesByGender.male.push(playerNamesByGender.divers.pop()!)
    }
    for (let i = 0; i < playTask.requires.female - playerNamesByGender.female.length; i++) {
        playerNamesByGender.female.push(playerNamesByGender.divers.pop()!)
    }
    for (let i = 0; i < playerNamesByGender.divers.length; i++) {
        if (Math.random() - 0.5 <= 0) {
            playerNamesByGender.male.push(playerNamesByGender.divers[i])
        }
        else {
            playerNamesByGender.female.push(playerNamesByGender.divers[i])
        }
    }

    // Shuffle again to have divers random 
    playerNamesByGender.male = shuffleArray(playerNamesByGender.male)
    playerNamesByGender.female = shuffleArray(playerNamesByGender.female)
    // Create message
    const message = playTask.message
        .replaceAll(TaskPlayerGender.MALE, () => playerNamesByGender.male.pop()!)
        .replaceAll(TaskPlayerGender.FEMALE, () => playerNamesByGender.female.pop()!)
        .replaceAll(TaskPlayerGender.ANYONE, () => {
            if (playerNamesByGender.male.length > 0 && playerNamesByGender.female.length > 0)
                return Math.random() - 0.5 < 0 ? playerNamesByGender.male.pop()! : playerNamesByGender.female.pop()!
            else if (playerNamesByGender.male.length > 0)
                return playerNamesByGender.male.pop()!
            else
                return playerNamesByGender.female.pop()!
        })

    return {
        ...playTask,
        message
    }
}

export const countPossibleTasksForPlayer = (tasks: PlayTask[], player: Player, playerGenderCount: PlayerGenderCount): number => {
    const possibleTasks = getPossibleTasks(tasks, player, null)
    return getFillableTasks(possibleTasks, player, playerGenderCount)?.length
}

