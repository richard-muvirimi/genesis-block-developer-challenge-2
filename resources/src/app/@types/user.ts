import {Todo} from "./todo"

export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    todos?: Todo[]
}

export interface UserResponse {
    status: boolean,
    data: User
}

export interface UsersResponse {
    status: boolean,
    data: User[]
}

export interface UpdateUserData {
    name: string,
    email: string,
    role: string,
    password: string
}

export interface RegisterUserData {
    name: string,
    email: string,
    password: string
}

export interface LoginData {
    email: string,
    password: string
}
