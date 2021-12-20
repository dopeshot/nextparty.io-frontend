import { useActions, useAppState } from "../../overmind"
import { PlayTask } from "../../overmind/game/state"
import { lowerCaseFirstLetter } from "../../services/utilities/lowerCaseFirstLetter"

type DisplayTaskType = {
    currentTask: PlayTask | null
    playerName: string
}

export const DisplayTask: React.FC<DisplayTaskType> = ({ currentTask, playerName }) => {
    const {
        nextPlayer
    } = useActions().game

    return (<div className="md:container flex flex-col items-center justify-center cursor-pointer h-full mx-5" onClick={() => nextPlayer()}>
        {currentTask && <div className={`${currentTask.message.length > 100 ? "height-450" : "height-250"}`}>
            <h2 className="text-5xl text-center font-semibold mb-10">{currentTask.type == "truth" ? "Truth" : "Dare"}</h2>
            <p className="text-2xl mb-5">{playerName}, {lowerCaseFirstLetter(currentTask.message)}</p>
        </div>}
        <p className="text-center text-lg opacity-25">Tab to continue</p>
    </div>
    )
}