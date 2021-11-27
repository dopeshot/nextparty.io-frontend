import { PlayTask, TaskCurrentPlayerGender, TaskType } from "../../overmind/game/state"
import { Gender, Player } from "../../overmind/players/state"
import { genderToTaskCurrentPlayerGender } from "./GameUtilities"

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