import { PlayerGenderCount, PlayTask, TaskCurrentPlayerGender, TaskPlayerGender, TaskType } from "../../overmind/game/state"
import { Gender, Player } from "../../overmind/players/state"
import { countPlayedByPlayer, genderToTaskCurrentPlayerGender, shuffleArray } from "./GameUtilities"

export const getPossibleTasks = (tasks: PlayTask[], player: Player, pickedTaskType: TaskType) => {
    return tasks.filter(task => 
        (task.type === pickedTaskType) && 
        (
            task.currentPlayerGender === TaskCurrentPlayerGender.ANYONE || 
            task.currentPlayerGender === genderToTaskCurrentPlayerGender(player.gender) || 
            player.gender === Gender.DIVERS
        )
    )
}
// MC: Rename variables to get clean code!
export const getFillableTasks = (tasks: PlayTask[], player: Player, playerGenderCount: PlayerGenderCount) => {
    const reducedGenders = { ...playerGenderCount }
    reducedGenders[player.gender]--

    const fillableTasks = tasks.filter((task) => {
        if (Object.values(reducedGenders).reduce((a, b) => a + b) - Object.values(task.requires).reduce((a, b) => a + b) < 0) {
            return false
        }
        if ((task.requires["male"] <= reducedGenders["male"] && task.requires["female"] <= reducedGenders["female"])) {
            return true
        }
        else {
            let divers = reducedGenders["divers"]
            if (task.requires["male"] > reducedGenders["male"]) {
                divers += task.requires["male"] - reducedGenders["male"]
            }
            if (task.requires["female"] > reducedGenders["female"]) {
                divers += task.requires["female"] - reducedGenders["female"]
            }
            return divers >= 0
        }
    })
    return fillableTasks
}

export const getUnplayedOverall = (tasks: PlayTask[]) => {
    return tasks.filter(task => task.playedBy.length === 0)
}

export const getUnplayedByMe = (tasks: PlayTask[], player: Player) => {
    return tasks.filter(task => !task.playedBy.includes(player.id))
}


export const getLeastPlayedByMe = (tasks: PlayTask[], player: Player) => {
    const sortedTasks = tasks.sort((a, b) => countPlayedByPlayer(a.playedBy, player) - countPlayedByPlayer(b.playedBy, player)) // MC: This could be replaced with Math.min in combination with map.
    return sortedTasks.filter(task => countPlayedByPlayer(task.playedBy, player) === countPlayedByPlayer(sortedTasks[0].playedBy, player))
}

export const getLeastPlayedOverall = (tasks: PlayTask[]) => {
    return tasks.sort((a, b) => (a.playedBy.length - b.playedBy.length))[0] // MC: Math min as well?
}

// MC: This is not finished!
export const fillPlayersIntoMessage = (players: Player[], message: string, currentPlayer: Player) => {
    const playersWithoutCurrent = [...players].filter(player => player.id !== currentPlayer.id)
    const playerNamesByGender = shuffleArray(playersWithoutCurrent).reduce<{
        male: string[],
        female: string[],
        divers: string[]
    }>((result, player) => {
        switch(player.gender) {
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

    message = message.replaceAll(TaskPlayerGender.MALE, () => {
        const maleName = playerNamesByGender.male[playerNamesByGender.male.length - 1]
        playerNamesByGender.male.splice(playerNamesByGender.male.length - 1, 1)
        return maleName
    })

    message = message.replaceAll(TaskPlayerGender.FEMALE, () => {
        const femaleName = playerNamesByGender.female[playerNamesByGender.female.length - 1]
        playerNamesByGender.male.splice(playerNamesByGender.female.length - 1, 1)
        return femaleName
    })

    message = message.replaceAll(TaskPlayerGender.ANYONE, () => {
        const maleName = playerNamesByGender.male[playerNamesByGender.male.length - 1]
        playerNamesByGender.male.splice(playerNamesByGender.male.length - 1, 1)
        return maleName
    })

    return message
}