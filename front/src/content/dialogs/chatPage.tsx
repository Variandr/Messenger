import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {getDialogData} from "../../state/dialogsReducer"
import {useDispatch} from "react-redux"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
// @ts-ignore
import chatBg from "../../assets/chatBg.png"
// @ts-ignore
import s from "./dialogs.module.css"
import {ChatInfo} from "./chatInfo/chatInfo"
import {Chat} from "./chatBlock/chat"

const ChatPage = () => {
    let dispatch = useDispatch()
    const {dialogId} = useParams()
    useEffect(() => {
        if (dialogId) dispatch(getDialogData(dialogId))
    }, [])

    return (
        <div className={s.chatPage}>
            <Chat/>
            <ChatInfo/>
        </div>
    )
}
export default withAuthRedirect(ChatPage)