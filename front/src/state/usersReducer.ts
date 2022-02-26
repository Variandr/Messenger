import {UsersAPI} from "../API/api"
import {Actions, BaseThunk} from "./store"

export type users = {
    id: number
    status: string | null
    username: string
    login: string
    online: boolean
    last_online: string
}
let initialState = {
    users: null as Array<users> | null,
    isFetching: false
};
type initialStateType = typeof initialState
const UsersReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "SET_USERS":
            return {...state, users: action.users}
        default:
            return state
    }
}
type ActionTypes = Actions<typeof actions>
type ThunkType = BaseThunk<ActionTypes>
let actions = {
    _setUsers: (users: Array<users>) => ({type: "SET_USERS", users} as const),
}

export const getUsers = (): ThunkType => async (dispatch) => {
    let users = await UsersAPI.getUsers()
    if (users) {
        dispatch(actions._setUsers(users))
    }
}
export default UsersReducer