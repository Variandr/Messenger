import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {actions, chat} from "../../../state/dialogsReducer"
import {useDispatch} from "react-redux"
import {withAuthRedirect} from "../../../HOC/withAuthRedirect"
// @ts-ignore
import chatBg from "../../../assets/chatBg.png"
// @ts-ignore
import s from "../dialogsPage/dialogs.module.css"
import {ChatInfo} from "./chatInfo/chatInfo"
import {Chat} from "./chatBlock/chat"
import socket from "../../../API/socket"


const ChatPage = () => {
    let dispatch = useDispatch()
    const {dialogId} = useParams()
    useEffect(() => {
        if (dialogId) {
            socket.emit('chat:join', {chatId: dialogId})
            socket.on('chatData', (data: chat) => {
                // console.log(data)
                dispatch(actions.setChat(data))
            })
            socket.on('message', (req) => {
                console.log(req)
                switch (req.type) {
                    case 'send-message':
                        dispatch(actions.addMessage(req.data))
                        break
                    case 'change-message':
                        dispatch(actions.editMessage(req.data))
                        break
                    case 'delete-message':
                        dispatch(actions.deleteMessage(req.data))
                }
            })
        }
    }, [dialogId])
    return (
        <div className={s.chatPage}>
            <Chat/>
            <ChatInfo/>
        </div>
    )
}
export default withAuthRedirect(ChatPage)