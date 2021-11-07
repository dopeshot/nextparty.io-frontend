import { Post } from "./state";

export const jsonPlaceholder = {
    getPosts: async (): Promise<Post[]> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        return await response.json()
    },
    getPost: async (id: number): Promise<Post> => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return await response.json()
    }
}