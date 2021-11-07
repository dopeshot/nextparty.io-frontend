import { createOvermindMock } from "overmind"
import { config } from ".."
import { Post } from "./state"

const postStub: Post = {
    title: "Title",
    body: "Body"
}

const postsStub = [postStub]

describe('Example Actions', () => {
    describe('loadClient', () => {
        test('should get posts with title and body', async () => {
            const overmind = createOvermindMock(config, {
                example: {
                    jsonPlaceholder: {
                        getPosts: (): Promise<Post[]> => (Promise.resolve(postsStub))
                    }
                }
            })
            expect(overmind.state.example.isLoadingPosts).toBe(false)
            expect(overmind.state.example.posts).toStrictEqual([])

            await overmind.actions.example.loadClient()

            expect(overmind.state.example.posts).toStrictEqual(postsStub)
            expect(overmind.state.example.isLoadingPosts).toBe(false)
        })
    })
})

export {} // JS: Is required for ES-Lint TS. A file without import or export is getting ignore so we just add an empty export