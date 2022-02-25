import {ProfileAPI} from "../API/api"
import {Actions, BaseThunk} from "./store"

type profileType = {
    id: number,
    username: string,
    login: string,
    status: string | null
}
let initialState = {
    profile: null as profileType | null,
    isFetching: false
};
type initialStateType = typeof initialState
const ProfileReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "SET_PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}
type ActionTypes = Actions<typeof actions>
type ThunkType = BaseThunk<ActionTypes>
let actions = {
    _setProfile: (profile: profileType) => ({type: "SET_PROFILE", profile} as const)
}
export const getProfile = (userId: number | string): ThunkType => async (dispatch) => {
    let profile = await ProfileAPI.getProfile(userId)
    if (profile) {
        dispatch(actions._setProfile(profile))
    }
}
export const updateStatus = (status: string): ThunkType => async (dispatch, getState) => {
    let data = await ProfileAPI.updateStatus(status)
    if (data.status) {
        let userId = getState().profilePage.profile?.id
        console.log(userId)
        if (userId) await dispatch(getProfile(userId))
    }
}

export const updateUsername = (username: string): ThunkType => async (dispatch, getState) => {
    let data = await ProfileAPI.updateUsername(username)
    if (data.username) {
        let userId = getState().profilePage.profile?.id
        if (userId) await dispatch(getProfile(userId))    }
}
export default ProfileReducer