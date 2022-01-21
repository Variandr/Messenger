import axios from 'axios'

const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})
type LoginSignupType = {
    user: {
        login: string
        id: number
    }
    accessToken: string
    refreshToken: string
    code: number
    message: string
}
type LogoutType = {
    code: number
}
type RefreshType = {
    user: {
        login: string
        id: number
    }
    accessToken: string
    refreshToken: string
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
    authMe() {
        return instance.get<RefreshType>('auth/refresh').then(res => res.data)
    },
    getUsers() {
        return instance.get<any>('auth/users').then(res => res.data)
    }
}