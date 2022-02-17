import {StateType} from "../state/store";

export const getDialogsSelector = (state:StateType) => {
    return state.dialogsPage.dialogs
}

export const getMessagesSelector = (state:StateType) => {
    return state.dialogsPage.messages
}