// @ts-ignore
import s from "./chat.module.css"
// @ts-ignore
import chatBg from "../../../../assets/chatBg.png"
import {Button} from "antd"
import {IoMdSend} from "react-icons/io"
import React, {FC, useEffect, useState} from "react"
import {messages} from "../../../../state/dialogsReducer"
import {MessageItem} from "./messageItem"
import {useSelector} from "react-redux"
import {getDialogDataSelector} from "../../../../selectors/dialogsSelectors"
import socket from "../../../../API/socket"
import {getUserId} from "../../../../selectors/authSelectors";

export const Chat: FC = () => {
    let userId = useSelector(getUserId)
    let dialogData = useSelector(getDialogDataSelector)
    let [messages, setMessages] = useState<Array<messages>>([])
    useEffect(() => {
        if (dialogData) {
            socket.emit('chat:join', {chatId: dialogData.id})
            socket.on('messages', (data: Array<messages>) => {
                setMessages(data)
            })
        }
    }, [dialogData])
    useEffect(() => {
        socket.on('message', (req) => {
            switch (req.type) {
                case 'send-message':
                        setMessages([...messages, req.data])
                    break
                case 'change-message':
                    setMessages([...messages.map(m => {
                        if (m.id === req.data.id) {
                            m.body = req.data.body
                            m.updated_at = req.data.updated_at
                        }
                        return m
                    })])
                    break
                case 'delete-message':
                    setMessages([...messages.filter(m => m.id !== req.data)])
            }
        })
    })
    let [isEditingAvailable, setEditing] = useState(false)
    let [messageBody, setMessageBody] = useState<string>('')
    let addMessage = () => {
        if (dialogData) {
            socket.emit('chat:sendMessage', {chatId: dialogData.id, message: messageBody})
            setMessageBody('')
        }
    }

    let editMessage = (m: messages, messageForEdit: string) => {
        if (userId === m.user_id && messageForEdit !== m.body && messageForEdit.length > 0 && dialogData) {
            socket.emit('chat:changeMessage', {chatId: dialogData.id, msgId: m.id, message: messageForEdit})
        }
    }

    let deleteMessageOnClick = (m: messages) => {
        if (userId === m.user_id && dialogData) {
            socket.emit('chat:deleteMessage', {chatId: dialogData.id, msgId: m.id})
        }
    }
    let onMessageChange = (e: any) => {
        setMessageBody(e.target.value)
    }
    let showMessages
    let sortedMessages = messages.sort((a, b) => {
        return +new Date(a.created_at) - +new Date(b.created_at)
    })
    showMessages = sortedMessages?.map(m => {
        return <MessageItem key={m.id} m={m}
                            userId={userId}
                            deleteMessageOnClick={deleteMessageOnClick}
                            editMessage={editMessage}
                            isEditingAvailable={isEditingAvailable}
                            setEditing={setEditing}
        />
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