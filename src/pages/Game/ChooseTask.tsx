import { ChevronDownIcon } from "@heroicons/react/outline"
import { useActions } from "../../overmind"
import { TaskType } from "../../shared/types/TaskType"

type ChooseTaskType = {
    playerName: string
}

export const ChooseTask: React.FC<ChooseTaskType> = ({ playerName }) => {
    const {
        pickTaskType, isPossibleTask, nextPlayer
    } = useActions().game

    const canPlayTruth = isPossibleTask(TaskType.TRUTH)
    const canPlayDare = isPossibleTask(TaskType.DARE)

    return (<div className="container grid grid-rows-1 grid-cols-2 h-full">
        <div className="self-center text-center row-start-1 col-start-1 col-end-3 mb-10">
            <h1 className="text-5xl font-semibold">{playerName}</h1>
            <p>It's your turn!</p>
        </div>
        <div className={`col-start-1 col-end-3 row-start-1 self-end flex pointer-events-none mb-10`}>
            {canPlayTruth && <span style={{ writingMode: "vertical-lr" }} className="transform rotate-180 text-4xl font-semibold">Truth</span>}
            {canPlayDare && <span style={{ writingMode: "vertical-lr" }} className="transform rotate-180 text-4xl font-semibold ml-auto">Dare</span>}
            {!canPlayTruth && !canPlayDare && <div className="mx-auto text-center">
                <p>This player doesn't have any tasks to play. Tab to continue!</p>
                <ChevronDownIcon className="h-5 mx-auto mt-2" />
            </div>}
        </div>
        {canPlayTruth && <button data-cy="choosetask-truth-button" onClick={() => pickTaskType(TaskType.TRUTH)} className={`${!canPlayDare ? "col-end-3" : "col-end-2"} col-start-1 col-end-2 row-start-1`}></button>}
        {canPlayDare && <button data-cy="choosetask-dare-button" onClick={() => pickTaskType(TaskType.DARE)} className={`${!canPlayTruth ? "col-start-1" : "col-start-2"} col-end-3 row-start-1`}></button>}
        {!canPlayTruth && !canPlayDare && <button onClick={() => nextPlayer()} className="col-start-1 col-end-3 row-start-1"></button>}
    </div>
    )
}