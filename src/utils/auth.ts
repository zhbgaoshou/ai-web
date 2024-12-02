/**
 * 将token和refreshToken保存到本地
 * @param token token
 * @param refreshToken refreshToken
 * @returns 
 */
export const setToken = (token: string, refreshToken: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}

export const removeAllToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')

}