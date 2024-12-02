export interface IUserInfo {
    "username": string,
    "email"?: string,
    "avatar"?: string,
    "id": number,
    "is_active": boolean,
    "is_superuser": boolean,
    "created_at": string,
    "last_login": string
}


export interface IUserLoginResponse {
    access_token: '',
    token_type: '',
    expires_in: number,
    refresh_token: ''
}