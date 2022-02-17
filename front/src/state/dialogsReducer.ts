import {DialogsAPI} from "../API/api";
import {Actions, BaseThunk} from "./store";

export type dialogs = {
    id: number
    chat_name: string
    created_at: string
    updated_at: null | string
    message: string | null
    username: string | null
}

export type messages = {
    id: number
    user_id: number
    username: string
    body: string
    created_at: string
    updated_at: string | null
}
let initialState = {
    dialogs: null as Array<dialogs> | null,
    messages: null as Array<messages> | null
};
type initialStateType = typeof initialState
const DialogsReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "SET_DIALOGS":
            return {...state, dialogs: action.dialogs}
        case "SET_MESSAGES":
            return {...state, messages: action.messages}
        default:
            return state
    }
}
type ActionTypes = Actions<typeof actions>
type ThunkType = BaseThunk<ActionTypes>
let actions = {
    _setDialogs: (dialogs: Array<dialogs>) => ({type: "SET_DIALOGS", dialogs} as const),
    _setMessages: (messages: Array<messages>) => ({type: "SET_MESSAGES", messages} as const)
}
export const getDialogs = (userId: number): ThunkType => async (dispatch) => {
    let dialogs = await DialogsAPI.getDialogs(userId)
    if(dialogs){
        dispatch(actions._setDialogs(dialogs))
    }
}

export const getMessages = (chatId: string): ThunkType => async (dispatch) => {
    let messages = await DialogsAPI.getChat(chatId)
    if(messages){
        dispatch(actions._setMessages(messages))
    }
}

export default DialogsReducer