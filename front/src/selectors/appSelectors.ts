import {StateType} from "../state/store"

export const getInitialize = (state:StateType) => {
    return state.appPage.isInitialized
}