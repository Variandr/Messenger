import {StateType} from "../state/store";

export const getProfile = (state:StateType) => {
    return state.profilePage.profile
}