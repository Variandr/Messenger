import {stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk"
import {AuthAPI} from "../API/api"
import {StateType} from "./store"

const SET_AUTH_DATA = '/auth/SET_AUTH_DATA'
let initialState = {
    isAuth: false,
    login: null as string | null,
    id: null as number | null
};
type initialStateType = typeof initialState
const AuthorizationReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}
export default AuthorizationReducer
type ActionTypes = setAuthUserType
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionTypes>
type authDataType = {
    login: string | null
    id: number | null
    isAuth: boolean
}
type setAuthUserType = {
    type: typeof SET_AUTH_DATA
    payload: authDataType
}
const _setAuthUserData = (login: string | null, id: number | null, isAuth: boolean): setAuthUserType => ({
    type: SET_AUTH_DATA,
    payload: {login, id, isAuth}
})
export const Login = (log: string, password: string) => async (dispatch: any) => {
    let userData = await AuthAPI.login(log, password)
    if (userData.code === 0) {
        let {login, id} = userData.user
        dispatch(_setAuthUserData(login, id, true))
        localStorage.setItem('accessToken', userData.accessToken)
    } else {
        let msg = userData.message.length > 0 ? userData.message : "Unknown error"
        dispatch(stopSubmit('login', {_error: msg}))
    }
}
export const Logout = (): ThunkType => async (dispatch) => {
    let userData = await AuthAPI.logout()
    if (userData.code === 0) {
        dispatch(_setAuthUserData(null, null, false))
        localStorage.removeItem('accessToken')
    }
}
export const Registration = (log: string, password: string, username: string): ThunkType => async (dispatch) => {
    let userData = await AuthAPI.reg(log, password, username)
    if (userData.code === 0) {
        let {login, id} = userData.user
        dispatch(_setAuthUserData(login, id, true))
        localStorage.setItem('accessToken', userData.accessToken)
    }
}

export const AuthMe = ():ThunkType => async (dispatch) => {
    let tokenData = await AuthAPI.authMe()
    if(tokenData.code === 0){
        let {login, id} = tokenData.user
        dispatch(_setAuthUserData(login, id, true))
        localStorage.setItem('accessToken', tokenData.accessToken)
    }
}