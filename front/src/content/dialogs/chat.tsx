import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {getDialogData, sendMessage} from "../../state/dialogsReducer"
import {useDispatch, useSelector} from "react-redux"
import {getDialogDataSelector} from "../../selectors/dialogsSelectors"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {getUserId} from "../../selectors/authSelectors"
import {IoMdSend} from "react-icons/io"
// @ts-ignore
import chatBg from "../../assets/chatBg.png"
// @ts-ignore
import s from "./dialogs.module.css"
import {Button} from "antd";

const Chat = (props: any) => {
    let dispatch = useDispatch()
    const {dialogId} = useParams()
    let dialogData = useSelector(getDialogDataSelector)
    let userId = useSelector(getUserId)
    useEffect(() => {
        if (dialogId) dispatch(getDialogData(dialogId))
    }, [])
    let messages
    if (dialogData && dialogData.messages) {
        let sortedMessages = dialogData.messages.sort((a, b) => {
            let bDate = b.updated_at ? b.updated_at : b.created_at
            let aDate = a.updated_at ? a.updated_at : a.created_at
            return +new Date(aDate) - +new Date(bDate)
        })
        messages = sortedMessages.map(m => {
            return <div key={m.id} className={s.messageContainer}>
                {userId === m.user_id ?
                    <div className={s.myMessageBlock}>
                        <div className={s.chat + ' ' + s.right}>
                            <div className={s.message}>{m.body}</div>
                        </div>
                    </div>
                    : <div className={s.messageBlock}>
                        <div className={s.avatar}>{m.username[0].toUpperCase()}</div>
                        <div className={s.chat + ' ' + s.left}>
                            <div className={s.username}>{m.username}</div>
                            <div className={s.message}>{m.body}</div>
                        </div>
                    </div>
                }
            </div>
        })
    }
    let [messageBody, setMessageBody] = useState<string>('')
    let onMessageSend = () => {
        if (dialogData && messageBody) {
            dispatch(sendMessage(dialogData.id, messageBody))
            setMessageBody('')
        }
    }
    let onMessageChange = (e: any) => {
        setMessageBody(e.target.value)
    }
    return (
        <div className={s.chatContainer}>
            <img className={s.bg} src={chatBg}/>
            <div className={s.messagesBlock}>{messages}</div>
            <div className={s.messageInputBlock}>
            <input className={s.messageInput} type="text" value={messageBody} onChange={onMessageChange} placeholder="Message"/>
            <Button onClick={onMessageSend} type="primary"><IoMdSend/></Button>
            </div>
        </div>
    )
}
export default withAuthRedirect(Chat)