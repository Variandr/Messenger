import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AuthAPI, getToken} from "../API/api";
import {StateType} from "./store";

const SET_AUTH_DATA = 'SET_AUTH_DATA'
let initialState = {
    isAuth: false,
    login: null as string | null,
    id: null as number | null,
    accessToken: null as string | null,
    refreshToken: null as string | null
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
    accessToken: string | null
    refreshToken: string | null
    isAuth: boolean
}
type setAuthUserType = {
    type: typeof SET_AUTH_DATA
    payload: authDataType
}
const _setAuthUserData = (login: string | null, id: number | null, accessToken: string | null, refreshToken: string | null, isAuth: boolean): setAuthUserType => ({
    type: SET_AUTH_DATA,
    payload: {login, id, accessToken, refreshToken, isAuth}
})
export const Login = (log: string, password: string) => async (dispatch: any, getState: any) => {
    let userData = await AuthAPI.login(log, password)
    console.log(userData)
    if (userData.code === 0) {
        let {login, id,} = userData.user
        dispatch(_setAuthUserData(login, id, userData.accessToken, userData.refreshToken, true))
        getToken(getState().authPage.accessToken)
    } else {
        let msg = userData.message.length > 0 ? userData.message : "Unknown error";
        dispatch(stopSubmit('login', {_error: msg}))
    }
}
export const Logout = (): ThunkType => async (dispatch, getState) => {
    let userData = await AuthAPI.logout()
    if (userData.code === 0) {
        dispatch(_setAuthUserData(null, null, null, null, false))
        getToken(getState().authPage.accessToken)
    }
}
export const Registration = (log: string, password: string, username: string): ThunkType => async (dispatch, getState) => {
    let userData = await AuthAPI.reg(log, password, username)
    if (userData.code === 0) {
        let {login, id} = userData.user
        dispatch(_setAuthUserData(login, id, userData.accessToken, userData.refreshToken, true))
        getToken(getState().authPage.accessToken)
    }
}