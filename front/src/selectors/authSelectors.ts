import {StateType} from "../state/store"

export const getAuth = (state:StateType) => {
    return state.authPage.isAuth
}