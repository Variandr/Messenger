import axios from 'axios'

let token = null;
export const getToken = (accessToken: string | null) => {
    token = accessToken
}

const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`
    }
})
type LoginSignupType = {
    user: {
        login: string | null
        id: number | null
    }
    accessToken: string | null
    refreshToken: string | null
    code: number
    message: string
}
type LogoutType = {
    code: number
}
type RefreshType = {
    accessToken: string | null
    refreshToken: string | null
    code: number
}
export const AuthAPI = {
    login(login: string, password: string) {
        return instance.post<LoginSignupType>('auth/login', {login, password}).then(res => res.data)
    },
    reg(login: string, password: string, username: string | null = null) {
        return instance.post<LoginSignupType>('auth/reg', {login, password, username}).then(res => res.data)
    },
    logout() {
        return instance.post<LogoutType>('auth/logout').then(res => res.data)
    },
    refresh() {
        return instance.get<RefreshType>('auth/refresh').then(res => res.data)
    },
    getUsers() {
        return instance.get<any>('auth/users').then(res => res.data)
    }
}