import React, {useState} from "react"
// @ts-ignore
import s from "./chat.module.css"
import {TiDelete} from "react-icons/ti"

export const MessageItem = ({userId, editMessage, deleteMessageOnClick, m, setEditing, isEditingAvailable}: any) => {
    let [isEdit, setEdit] = useState(false)
    let [messageForEdit, setMessage] = useState<string>('')
    let date = new Date(m.created_at).toLocaleString('en-US', {hour: '2-digit', minute: '2-digit'})
    let onMessageForEditChange = (e: any) => {
        setMessage(e.target.value)
    }
    return <div key={m.id} className={s.messageContainer}>
        {userId === m.user_id ?
            <div className={s.myMessageBlock}>
                {isEdit ?
                    <div className={s.chat + ' ' + s.right}>
                        <textarea value={messageForEdit} onChange={onMessageForEditChange}
                                  onBlur={() => {
                                      setEditing(false)
                                      setEdit(false)
                                      editMessage(m, messageForEdit)
                                  }} className={s.messageEditInput}/>
                        <TiDelete className={s.deleteBtn} onClick={() => {
                            deleteMessageOnClick(m)
                            setEditing(false)
                            setEdit(false)
                        }}/>
                    </div>
                    : <div className={s.chat + ' ' + s.right}>
                        <div className={s.bodyMessageBlock}>
                            <div className={s.message} onDoubleClick={() => {
                                if (!isEditingAvailable) {
                                    setEdit(true)
                                    setEditing(true)
                                    setMessage(m.body)
                                }
                            }}>{m.body}</div>
                            <div className={s.date}>{m.updated_at && "updated"} {date}</div>
                        </div>
                    </div>
                }
            </div>
            : <div className={s.messageBlock}>
                <div className={s.avatar}>{m.username[0].toUpperCase()}</div>
                <div className={s.chat + ' ' + s.left}>
                    <div className={s.username + ' ' + s.truncateText}>{m.username}</div>
                    <div className={s.bodyMessageBlock}>
                        <div className={s.message}>{m.body}</div>
                        <div className={s.date}>{m.updated_at && "updated"} {date}</div>
                    </div>
                </div>
            </div>
        }
    </div>
}