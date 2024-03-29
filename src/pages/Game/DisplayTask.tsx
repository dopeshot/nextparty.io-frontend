import { useActions } from "../../overmind"
import { PlayTask } from "../../overmind/game/state"
import { lowerCaseFirstLetter } from "../../services/Utilities"
import { taskTypes } from "../../shared/types/TaskType"

type DisplayTaskType = {
    currentTask: PlayTask | null
    playerName: string
}

export const DisplayTask: React.FC<DisplayTaskType> = ({ currentTask, playerName }) => {
    const {
        nextPlayer
    } = useActions().game

    return (<div data-cy="displaytask-container" className="md:container flex flex-col items-center justify-center cursor-pointer h-full mx-5" onClick={() => nextPlayer()}>
        {currentTask && <div data-cy="displaytask-task-container" className={`${currentTask.message.length > 100 ? "height-450" : "height-250"}`}>
            <h2 className="text-5xl text-center font-semibold mb-10">{taskTypes[currentTask.type].name}</h2>
            <p className="text-2xl mb-5">{playerName}, {lowerCaseFirstLetter(currentTask.message)}</p>
        </div>}
        <p className="text-center text-lg text-light-700">Tab to continue</p>
    </div>
    )
}