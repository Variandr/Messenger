import React, {FC} from "react"
import {FiMessageSquare} from "react-icons/fi"
import {useDispatch} from "react-redux"
// @ts-ignore
import s from "./users.module.css"
import {createChat, dialogs, user} from "../../state/dialogsReducer"
import {NavLink} from "react-router-dom"
import {users} from "../../state/usersReducer"
import {isChatExisting} from "../../helpers/isChatExisting"

type usersType = {
    u: users
    myData: Array<user>
    userId: number | null
    dialogs: Array<dialogs> | null
}
const Users: FC<usersType> = ({u, myData, userId, dialogs}) => {
    let dispatch = useDispatch()
    if (u.id === userId) return null
    let data = isChatExisting(dialogs, u.username)
    return <div className={s.userBlock}>
        <NavLink end to={'/profile/' + u.id} className={s.navLink}>
            <div className={s.userNickAndImgBlock}>
                <div className={s.memberImg}>{u.username[0].toUpperCase()}</div>
                <div className={s.userNick}>{u.username}</div>
            </div>
        </NavLink>
        <div className={s.userTextBtnBlock}>
            {data.isExisting ?
                <NavLink to={'/dialogs/' + data.chatId} className={s.navLink}><FiMessageSquare/></NavLink>
                : <FiMessageSquare onClick={() => {
                    dispatch(createChat(u.login, [...myData, {id: u.id, username: u.username}]))
                }} className={s.userTextBtn}/>
            }
        </div>
    </div>
}
export default Users