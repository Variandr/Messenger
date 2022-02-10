import axios from 'axios'

const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

instance.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.status === 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true
        try {
            const response = await instance.get<any>('auth/refresh').then(res => res.data)
            localStorage.setItem('accessToken', response.accessToken)
            return instance.request(originalRequest)
        } catch (e) {
            console.log('User unauthorized')
        }
    }
})

type LoginSignupType = {
    user: {
        login: string
        id: number
    }
    accessToken: string
    refreshToken: string
    message: string
}
type RefreshType = {
    user: {
        login: string
        id: number
    }
    accessToken: string
    refreshToken: string
}
export const AuthAPI = {
    login(login: string, password: string) {
        return instance.post<LoginSignupType>('auth/login', {login, password}).then(res => res.data)
    },
    reg(login: string, password: string, username: string | null = null) {
        return instance.post<LoginSignupType>('auth/reg', {login, password, username}).then(res => res.data)
    },
    logout() {
        return instance.post<any>('auth/logout').then(res => res.data)
    },
    authMe() {
        return instance.get<RefreshType>('auth/refresh').then(res => res)
    }
}
export const UsersAPI = {
    getUsers() {
        return instance.get<any>('auth/users').then(res => res.data)
    }
}