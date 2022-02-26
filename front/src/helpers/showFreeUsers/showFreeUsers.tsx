import isUserParticipant from "../isUserParticipant"
// @ts-ignore
import s from "./showFreeUsers.module.css";
import React, {FC} from "react"
import {useSelector} from "react-redux";
import {getUsersSelector} from "../../selectors/usersSelectors"

type members = {
    id: number | null
    username: string | null
}
type ShowFreeUsersType = {
    chatMembers: Array<members> | null
    setUsersShow: (isUsersShow: boolean) => void
    addParticipant: (id: number, username: string) => void
}
const ShowFreeUsers: FC<ShowFreeUsersType> = ({chatMembers, setUsersShow, addParticipant}) => {
    let users = useSelector(getUsersSelector)
    let showUsers = users?.map(u => {
        let d = new Date(u.last_online)
        let localDate = new Date()
        let offline = () => {
            if (d.getDate() === localDate.getDate()) {
                return d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
            } else return 'last seen recently'
        }
        let check = isUserParticipant(chatMembers, u.id)
        if (check) return null
        return <div key={u.id} className={s.chatMemberBlock} onClick={() => {
            addParticipant(u.id, u.username)
            setUsersShow(false)
        }}>
            <div className={s.memberImg}>{u.username[0].toUpperCase()}</div>
            <div>
                <div className={s.memberName + ' ' + s.truncateText}>{u.username}</div>
                <div className={(u.online ? s.onlineStatus : s.offlineStatus)}>{u.online ? 'online' : offline()}</div>
            </div>
        </div>
    })
    return <div>{showUsers}</div>
}
export default ShowFreeUsers