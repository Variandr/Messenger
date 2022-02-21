import {StateType} from "../state/store"

export const getAuth = (state:StateType) => {
    return state.authPage.isAuth
}
export const getUserId = (state:StateType) => {
    return state.authPage.id
}
export const getUserLogin = (state: StateType) => {
    return state.authPage.login
}