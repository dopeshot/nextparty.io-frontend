import { Context } from ".."

export const loadClient = async ({ state, effects }: Context) => {
    state.example.isLoadingPosts = true
    state.example.posts = await effects.example.jsonPlaceholder.getPosts()
    state.example.isLoadingPosts = false
}
