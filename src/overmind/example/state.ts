export type Post = {
    title: string,
    body: string
}

export type State = {
    isLoadingPosts: boolean,
    posts: Post[]
}

export const state: State = {
    isLoadingPosts: false,
    posts: []
}