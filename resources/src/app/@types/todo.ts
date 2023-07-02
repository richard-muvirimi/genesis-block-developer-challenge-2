export interface Todo {
    id: number,
    user_id: number,
    title: string,
    memo: string,
    completed_at: string,
    remind_at: string,
    created_at: string,
    updated_at: string
}

export interface TodoResponse {
    status: boolean,
    data: Todo
}

export interface TodosResponse {
    status: boolean,
    data: Todo[]
}

export interface UpdateTodoData {
    title: string,
    memo: string,
    remind_at: string,
    completed_at: string
}
