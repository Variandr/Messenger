import {UsersAPI} from "../API/api";

const SET_USERS = '/users/SET_USERS'
type users = {
    id: number,
    username: string,
    login: string,
    status: string
}
let initialState = {
    users: null as Array<users> | null,
    isFetching: false
};
type initialStateType = typeof initialState
const UsersReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users}
        default:
            return state
    }
}
const _setUsers = (users: Array<users>) => ({
    type: SET_USERS, users
})
export const getUsers = () => async (dispatch: any) => {
    let response = await UsersAPI.getUsers()
    if(response){
        dispatch(_setUsers(response))
    }
}
export default UsersReducer