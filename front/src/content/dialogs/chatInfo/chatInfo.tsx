// @ts-ignore
import s from "./chatInfo.module.css"
import {IoMdAddCircle} from "react-icons/io"
import React, {FC, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getUsers} from "../../../selectors/usersSelectors"
import {addParticipant} from "../../../state/dialogsReducer"
import {getDialogDataSelector} from "../../../selectors/dialogsSelectors"

export const ChatInfo: FC = () => {
    let dispatch = useDispatch()
    let dialogData = useSelector(getDialogDataSelector)
    let users = useSelector(getUsers)
    let [isUsersShow, setUsersShow] = useState(false)
    let participants = dialogData?.chatMembers.map(m => {
        return <div key={m.id} className={s.chatMemberBlock}>
            <div className={s.memberImg}>{m.username[0].toUpperCase()}</div>
            <div className={s.memberName + ' ' + s.truncateText}>{m.username}</div>
        </div>
    })
    let isUserParticipant = (id: number) => {
        let check = false
        dialogData?.chatMembers.map(m => {
            if (m.id === id) check = true
            return m
        })
        return check
    }
    let showUsers = users?.map(u => {
        let check = isUserParticipant(u.id)
        if (check) return null
        return <div key={u.id} className={s.chatMemberBlock} onClick={() => {
            if (dialogData) dispatch(addParticipant(dialogData.id, u.id))
            setUsersShow(false)
        }}>
            <div className={s.memberImg}>{u.username[0].toUpperCase()}</div>
            <div className={s.memberName + ' ' + s.truncateText}>{u.username}</div>
        </div>
    })
    return <div className={s.infoBlock}>
        <div className={s.chatName + ' ' + s.truncateText}>{dialogData?.chat_name}</div>
        <div className={s.participantsBlock}>
            <div>Participants</div>
            <div className={s.participants}>{participants}</div>
            <div className={s.addParticipantBtn} onClick={() => setUsersShow(true)}><IoMdAddCircle/></div>
            {isUsersShow &&
                <div className={s.usersBlock}>
                    {showUsers}
                </div>
            }
        </div>
    </div>
}