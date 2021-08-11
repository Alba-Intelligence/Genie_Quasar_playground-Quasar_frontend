// From:
// https://javascript.plainenglish.io/frontend-api-calls-with-typescript-and-axios-68792d1e63c2


import axios, { AxiosResponse } from 'axios'
// import { PostType } from '../models/post.interface'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:9009/',
    timeout: 5000,
})

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
}

    // export const Post = {
    // 	getPosts: (): Promise<PostType[]> => requests.get('posts'),
    // 	getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
    // 	createPost: (post: PostType): Promise<PostType> =>
    // 		requests.post('posts', post),
    // 	updatePost: (post: PostType, id: number): Promise<PostType> =>
    // 		requests.put(`posts/${id}`, post),
    // 	deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
    // }

