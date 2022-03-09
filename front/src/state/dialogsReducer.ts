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
    online: boolean
    last_online: string
}
export type chat = {
    id: number
    chat_name: string
    created_at: string
    updated_at: string | null
    chatMembers: Array<members>
    messages: Array<messages>

}
let initialState = {
    dialogs: null as Array<dialogs> | null,
    chat: null as chat | null
};

const changeMessages = (arr: chat | null, msg: messages, type: string) => {
    if (arr) {
        switch (type) {
            case 'ADD_MESSAGE':
                return {...arr, messages: [...arr.messages, msg]}
            case 'EDIT_MESSAGE':
                return {
                    ...arr, messages: [...arr.messages.map(m => {
                        if (m.id === msg.id) {
                            m.body = msg.body
                            m.updated_at = msg.updated_at
                        }
                        return m
                    })]
                }
            case 'DELETE_MESSAGE':
                return {...arr, messages: [...arr.messages.filter(m => m.id !== msg.id)]}
        }
    }
    return null
}

type initialStateType = typeof initialState
const DialogsReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "SET_DIALOGS":
            return {...state, dialogs: action.dialogs}
        case "SET_DIALOG_DATA":
            return {...state, chat: action.dialogData}
        case "ADD_MESSAGE":
            return {...state, chat: changeMessages(state.chat, action.msg, action.type)}
        case "EDIT_MESSAGE":
            return {...state, chat: changeMessages(state.chat, action.msg, action.type)}
        case "DELETE_MESSAGE":
            return {...state, chat: changeMessages(state.chat, action.msg, action.type)}
        default:
            return state
    }
}
export default DialogsReducer
type ActionTypes = Actions<typeof actions>
type ThunkType = BaseThunk<ActionTypes>
export let actions = {
    setDialogs: (dialogs: Array<dialogs>) => ({type: "SET_DIALOGS", dialogs} as const),
    setChat: (dialogData: chat) => ({type: "SET_DIALOG_DATA", dialogData} as const),
    addMessage: (msg: messages) => ({type: "ADD_MESSAGE", msg} as const),
    editMessage: (msg: messages) => ({type: "EDIT_MESSAGE", msg} as const),
    deleteMessage: (msg: messages) => ({type: "DELETE_MESSAGE", msg} as const)
}

export const addParticipant = (chatId: number, userId: number): ThunkType => async () => {
    await DialogsAPI.addParticipant(chatId, userId)
}
export type user = {
    id: number | null
    username: string | null
}
export const createChat = (chatName: string, users: Array<user>): ThunkType => async () => {
    await DialogsAPI.createChat(chatName, users)
}