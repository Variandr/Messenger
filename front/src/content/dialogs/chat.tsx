import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {getDialogData, sendMessage} from "../../state/dialogsReducer"
import {useDispatch, useSelector} from "react-redux"
import {getDialogDataSelector} from "../../selectors/dialogsSelectors"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {IoMdSend} from "react-icons/io"
// @ts-ignore
import chatBg from "../../assets/chatBg.png"
// @ts-ignore
import s from "./dialogs.module.css"
import {Button} from "antd";
import {MessageItem} from "./messageItem"

const Chat = () => {
    let dispatch = useDispatch()
    const {dialogId} = useParams()
    let dialogData = useSelector(getDialogDataSelector)
    useEffect(() => {
        if (dialogId) dispatch(getDialogData(dialogId))
    }, [])
    let [isEditingAvailable, setEditing] = useState(false)
    let [messageBody, setMessageBody] = useState<string>('')
    let addMessage = () => {
        if (dialogData && messageBody) {
            dispatch(sendMessage(dialogData.id, messageBody))
            setMessageBody('')
        }
    }
    let onMessageChange = (e: any) => {
        setMessageBody(e.target.value)
    }
    let messages
        let sortedMessages = dialogData?.messages?.sort((a, b) => {
            return +new Date(a.created_at) - +new Date(b.created_at)
        })
        messages = sortedMessages?.map(m => {
            return <MessageItem key={m.id} m={m} isEditingAvailable={isEditingAvailable} setEditing={setEditing}/>
        })
    let participants = dialogData?.chatMembers.map(m => {
        return <div key={m.id} className={s.chatMemberBlock}>
            <div className={s.memberImg}>{m.username[0].toUpperCase()}</div>
            <div className={s.memberName + ' ' + s.truncateText}>{m.username}</div>
        </div>
    })
    return (
        <div className={s.chatPage}>
            <div className={s.chatContainer}>
                <img className={s.bg} src={chatBg} alt="chat-background"/>
                <div className={s.messagesBlock}>{messages}</div>
                <div className={s.messageInputBlock}>
                    <input className={s.messageInput} type="text" value={messageBody} onChange={onMessageChange}
                           placeholder="Message"/>
                    <Button onClick={addMessage} type="primary"><IoMdSend/></Button>
                </div>
            </div>
            <div className={s.infoBlock}>
                <div className={s.chatName + ' ' + s.truncateText}>{dialogData && dialogData.chat_name}</div>
                <div className={s.participantsBlock}>
                <div>Participants</div>
                    <div className={s.participants}>{participants}</div>
            </div>
            </div>
        </div>
    )
}
export default withAuthRedirect(Chat)