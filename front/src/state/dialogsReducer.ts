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
    chat_id: number
    username: string
    body: string
    created_at: string
    updated_at: string | null
}
type members = {
    id: number
    username: string
}
export type chat = {
    id: number
    chat_name: string
    created_at: string
    updated_at: string | null
    messages: Array<messages> | null
    chatMembers: Array<members>

}
let initialState = {
    dialogs: null as Array<dialogs> | null,
    chat: null as chat | null
};
type initialStateType = typeof initialState
const DialogsReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "SET_DIALOGS":
            return {...state, dialogs: action.dialogs}
        case "SET_DIALOG_DATA":
            return {...state, chat: action.dialogData}
        default:
            return state
    }
}
export default DialogsReducer
type ActionTypes = Actions<typeof actions>
type ThunkType = BaseThunk<ActionTypes>
let actions = {
    _setDialogs: (dialogs: Array<dialogs>) => ({type: "SET_DIALOGS", dialogs} as const),
    _setDialog: (dialogData: chat) => ({type: "SET_DIALOG_DATA", dialogData} as const)
}
export const getDialogs = (): ThunkType => async (dispatch) => {
    let dialogs = await DialogsAPI.getDialogs()
    if (dialogs) {
        dispatch(actions._setDialogs(dialogs))
    }
}

export const getDialogData = (chatId: string | number): ThunkType => async (dispatch) => {
    let dialogData = await DialogsAPI.getChat(chatId)
    if (dialogData) {
        dispatch(actions._setDialog(dialogData))
    }
}

export const sendMessage = (chatId: number, message: string): ThunkType => async () => {
    await DialogsAPI.postMessage(chatId, message)
}

export const updateMessage = (msgId: number, message: string): ThunkType => async () => {
    await DialogsAPI.updateMessage(msgId, message)
}

export const deleteMessage = (msgId: number): ThunkType => async () => {
    await DialogsAPI.deleteMessage(msgId)
}

export const addParticipant = (chatId: number, userId: number): ThunkType => async () => {
    let res = await DialogsAPI.addParticipant(chatId, userId)
    if (res.status === 200) {
        getDialogData(chatId)
    }
}
export type user = {
    id: number | null
    username: string | null
}
export const createChat = (chatName: string, users: Array<user>):ThunkType => async () => {
    await DialogsAPI.createChat(chatName, users)
}