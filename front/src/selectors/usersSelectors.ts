import {StateType} from "../state/store";

export const getUsers = (state:StateType) => {
    return state.usersPage.users
}