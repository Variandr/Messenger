import React, {FC} from "react"
import {FiMessageSquare} from "react-icons/fi"
import {useDispatch} from "react-redux"
// @ts-ignore
import s from "./users.module.css"
import {createChat, user} from "../../state/dialogsReducer"
import {NavLink} from "react-router-dom"
import {users} from "../../state/usersReducer"

type usersType = {
    u: users
    myData: Array<user>
    userId: number | null
}
const Users: FC<usersType> = ({u, myData, userId}) => {
    let dispatch = useDispatch()
    if (u.id === userId) return null
    return <div className={s.userBlock}>
        <NavLink end to={'/profile/' + u.id} className={s.navLink}>
            <div className={s.userNick}>{u.username}</div>
        </NavLink>
        <div className={s.userTextBtnBlock}><FiMessageSquare onClick={() => {
            dispatch(createChat(u.login, [...myData, {id: u.id, username: u.username}]))
        }
        } className={s.userTextBtn}/></div>
    </div>
}
export default Users