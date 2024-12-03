export interface IHistory {
    role: 'user' | 'assistant'
    content: string
}


export interface IMessageRequest {
    id?: string
    model?: string
    content: string
    history?: IHistory[]
    role: 'user' | 'assistant'
    temperature?: number
    max_tokens?: number
    user_id?: number
    session_id?: number
}