import {Todo} from "./todo"

export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    todo?: Todo[]
}

export interface UserResponse {
    status: boolean,
    data: User
}

export interface UsersResponse {
    status: boolean,
    data: User[]
}

