// users.service.ts
// From https://altrim.io/posts/axios-http-client-using-typescript


import { http } from './http'

export type User = {
    id: string
    name: string
    avatar: string
    email: string
}

export const fetchUsers = async (): Promise<User[]> => {
    const { data } = await http.get<User[]>('/users')
    return data
}

export const createUser = async (user: User): Promise<User> => {
    const { data } = await http.post<User>('/users', user)
    return data
}

export const updateUser = async (user: User): Promise<User> => {
    const { data } = await http.put<User>(`/users/${user.id}`, user)
    return data
}

export const deleteUser = async (user: User): Promise<User> => {
    const { data } = await http.delete<User>(`/users/${user.id}`)
    return data
}


