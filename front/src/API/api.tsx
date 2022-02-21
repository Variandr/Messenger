import axios from 'axios'
import {chat, dialogs, user} from "../state/dialogsReducer"

const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
    withCredentials: true,
    headers: {
        // @ts-ignore
        Authorization: {
            toString () {
                return `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
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
    message?: string
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
    login(login: string, password: string, remember: boolean) {
        return instance.post<LoginSignupType>('auth/login', {login, password, remember}).then(res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            return res.data
        })
    },
    reg(login: string, password: string, username: string | null, remember: boolean) {
        return instance.post<LoginSignupType>('auth/reg', {login, password, username, remember}).then(res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            return res.data
        })
    },
    logout() {
        return instance.delete<any>('auth/logout').then(res => {
            localStorage.removeItem('accessToken')
            return res.data
        })
    },
    authMe() {
        return instance.get<RefreshType>('auth/refresh').then(res => res)
    }
}
type profile = {
    id: number
    status: string | null
    username: string
    login: string
}
export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<profile>(`profile/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<any>('profile/status', {status}).then(res => res.data)
    },
    updateUsername(username: string) {
        return instance.put<any>('profile/status', {username}).then(res => res.data)
    }
}

export const UsersAPI = {
    getUsers() {
        return instance.get<Array<profile>>('profile/users').then(res => res?.data)
    }
}

export const DialogsAPI = {
    getDialogs() {
        return instance.get<Array<dialogs>>(`dialogs`).then(res => res ? res.data : res)
    },
    getChat(chatId: string | number) {
        return instance.get<chat>(`dialogs/chat/${chatId}`).then(res => res.data)
    },
    createChat(chatName: string, users: Array<user>) {
        return instance.post(`dialogs`, {chatName, users}).then(res => res.data)
    },
    postMessage(chatId: number, message: string) {
        return instance.post(`dialogs/${chatId}`, {message}).then(res => res.data)
    },
    updateMessage(msgId: number, message: string) {
        return instance.put(`dialogs/message/${msgId}`, {message}).then(res => res.data)
    },
    deleteMessage(msgId: number) {
        return instance.delete(`dialogs/message/${msgId}`).then(res => res.data)
    },
    addParticipant(chatId: number, userId: number) {
        return instance.put(`dialogs/${chatId}`, {userId}).then(res => res)
    }
}