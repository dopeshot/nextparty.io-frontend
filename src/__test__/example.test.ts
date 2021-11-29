import { getPossibleTasks } from "../services/game/GameComponents"
import { Gender } from "../overmind/players/state"
import { TaskType } from "../overmind/game/state"

/***
 * 
 * MC: THIS IS JUST TESTING! 
 * DO NOT COPY OR BUILD ON THIS EXAMPLE!
 * 
 */
const tasks = [
    {
        "currentPlayerGender": "@ca",
        "_id": "618be342577d8c493e101377",
        "type": "truth",
        "message": "Requires one girl @f",
        "requires": {
            "male": 0,
            "female": 1,
            "any": 0
        },
        "playedBy": []
    },
    {
        "currentPlayerGender": "@ca",
        "_id": "618be342577d8c493e101378",
        "type": "dare",
        "message": "Matches for all",
        "requires": {
            "male": 0,
            "female": 0,
            "any": 0
        },
        "playedBy": []
    },
    {
        "currentPlayerGender": "@cf",
        "_id": "618be342577d8c493e101379",
        "type": "truth",
        "message": "Requires two males: @m @m",
        "requires": {
            "male": 2,
            "female": 0,
            "any": 0
        },
        "playedBy": []
    },
    {
        "currentPlayerGender": "@cm",
        "_id": "618be342577d8c493e10137a",
        "type": "truth",
        "message": "Requires one any: @a",
        "requires": {
            "male": 0,
            "female": 0,
            "any": 1
        },
        "playedBy": []
    }]

it('should be true', () => {
    expect(true).toBeTruthy()
    const filteredTasks = getPossibleTasks(tasks, {
        id: 1,
        name: "Michael",
        gender: Gender.MALE
    }, TaskType.DARE)
    expect(filteredTasks).toEqual([{
        "currentPlayerGender": "@ca",
        "_id": "618be342577d8c493e101378",
        "type": "dare",
        "message": "Matches for all",
        "requires": {
            "male": 0,
            "female": 0,
            "any": 0
        },
        "playedBy": []
    }])
})

export { }