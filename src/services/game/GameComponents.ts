import { PlayerGenderCount, PlayTask, TaskCurrentPlayerGender, TaskType } from "../../overmind/game/state"
import { Gender, Player } from "../../overmind/players/state"
import { countPlayedByPlayer, genderToTaskCurrentPlayerGender } from "./GameUtilities"

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

    const result = tasks.filter((item) => {
        if (Object.values(reducedGenders).reduce((a, b) => a + b) - Object.values(item.requires).reduce((a, b) => a + b) < 0) {
            return false
        }
        if ((item.requires["male"] <= reducedGenders["male"] && item.requires["female"] <= reducedGenders["female"])) {
            return true
        }
        else {
            let divers = reducedGenders["divers"]
            if (item.requires["male"] > reducedGenders["male"]) {
                divers += item.requires["male"] - reducedGenders["male"]
            }
            if (item.requires["female"] > reducedGenders["female"]) {
                divers += item.requires["female"] - reducedGenders["female"]
            }
            return divers >= 0
        }
    })
    return result
}

export const getUnplayedOverall = (tasks: PlayTask[]) => {
    return tasks.filter(task => task.playedBy.length === 0)
}

export const getUnplayedByMe = (tasks: PlayTask[], player: Player) => {
    return tasks.filter(task => !task.playedBy.includes(player.id))
}


export const getLeastPlayedByMe = (tasks: PlayTask[], player: Player) => {
    const sortedTasks = tasks.sort((a, b) => countPlayedByPlayer(a.playedBy, player) - countPlayedByPlayer(b.playedBy, player)) // MC: This could be replaced with Math.min in combination with map.
    return sortedTasks.filter(item => countPlayedByPlayer(item.playedBy, player) === countPlayedByPlayer(sortedTasks[0].playedBy, player))
}

export const getLeastPlayedOverall = (tasks: PlayTask[]) => {
    return tasks.sort((a, b) => (a.playedBy.length - b.playedBy.length))[0] // MC: Math min as well?
}
