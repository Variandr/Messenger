// @ts-ignore
import s from "./chat.module.css"
// @ts-ignore
import chatBg from "../../../assets/chatBg.png"
import {Button} from "antd"
import {IoMdSend} from "react-icons/io"
import React, {FC, useState} from "react"
import {sendMessage} from "../../../state/dialogsReducer"
import {MessageItem} from "./messageItem"
import {useDispatch, useSelector} from "react-redux"
import {getDialogDataSelector} from "../../../selectors/dialogsSelectors"

export const Chat: FC = () => {
    let dispatch = useDispatch()
    let dialogData = useSelector(getDialogDataSelector)
    let [isEditingAvailable, setEditing] = useState(false)
    let [messageBody, setMessageBody] = useState<string>('')
    let addMessage = () => {
        if (dialogData) {
            dispatch(sendMessage(dialogData.id, messageBody))
            setMessageBody('')
        }
    }
    let onMessageChange = (e: any) => {
        setMessageBody(e.target.value)
    }
    let showMessages
    let sortedMessages = dialogData?.messages?.sort((a, b) => {
        return +new Date(a.created_at) - +new Date(b.created_at)
    })
    showMessages = sortedMessages?.map(m => {
        return <MessageItem key={m.id} m={m} isEditingAvailable={isEditingAvailable} setEditing={setEditing}/>
    })
    return <div className={s.chatContainer}>
        <img className={s.bg} src={chatBg} alt="chat-background"/>
        <div className={s.messagesBlock}>{showMessages}</div>
        <div className={s.messageInputBlock}>
            <input className={s.messageInput} type="text" value={messageBody} onChange={onMessageChange}
                   placeholder="Message"/>
            <Button onClick={addMessage} type="primary"><IoMdSend/></Button>
        </div>
    </div>
}