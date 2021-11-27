import { Context } from "..";
import { countGenderOccurrences } from "../../services/Utilities";



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
}