import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {createChat, getDialogs, user} from "../../../state/dialogsReducer"
import {getDialogsSelector} from "../../../selectors/dialogsSelectors"
// @ts-ignore
import s from "./dialogs.module.css"
import {NavLink} from "react-router-dom"
import {withAuthRedirect} from "../../../HOC/withAuthRedirect"
import {BiCommentAdd} from "react-icons/bi"
import {IoMdPersonAdd} from "react-icons/io"
import {AiOutlineSend} from "react-icons/ai"
import {getUserId, getUserLogin} from "../../../selectors/authSelectors"
import ShowFreeUsers from "../../../helpers/showFreeUsers/showFreeUsers"

const DialogsPage = () => {
    let showDate = (date: string) => {
        let d = new Date(date)
        let localDate = new Date()
        if (d.getDate() === localDate.getDate()) {
            return d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
        } else if (Math.abs(d.getDate() - localDate.getDate()) <= 7) {
            return d.toLocaleString('en-US', {weekday: 'short'})
        } else if (d.getFullYear() === localDate.getFullYear()) {
            let month = d.toLocaleString('en-US', {month: 'short'}).toLowerCase()
            let day = d.toLocaleString('en-US', {day: '2-digit'})
            return day + ' ' + month + '.'
        } else return d.toLocaleString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'})
    }
    let dispatch = useDispatch()
    let dialogs = useSelector(getDialogsSelector)
    let userId = useSelector(getUserId) || null
    let login = useSelector(getUserLogin) || null
    useEffect(() => {
        dispatch(getDialogs())
    }, [])
    let DialogItems
    if (dialogs) {
        let sortedDialogs = dialogs.sort((a, b) => {
            let bDate = b.updated_at ? b.updated_at : b.created_at
            let aDate = a.updated_at ? a.updated_at : a.created_at
            return +new Date(bDate) - +new Date(aDate)
        })
        DialogItems = sortedDialogs.map(d => {
            let actualDate = d.updated_at ? d.updated_at : d.created_at
            return <div key={d.id} className={s.dialogContainer}>
                <NavLink to={'/dialogs/' + d.id} className={s.navLink}>
                    <div className={s.chatAndDateBlock}>
                        <div className={s.chatName}>{d.chat_name}</div>
                        <div className={s.date}>{showDate(actualDate)}</div>
                    </div>
                    <div className={s.dialogText}>
                        <div className={s.username}>{d.username ? d.username + ":" : ''}</div>
                        <div className={s.truncateText}>{d.message && d.message}</div>
                    </div>
                </NavLink>
            </div>
        })
    }

    let [isAddChat, setAddChat] = useState(false)
    let [chatName, setChatName] = useState('')
    let [isUsersShow, setUsersShow] = useState(false)

    let [participants, setParticipant] = useState<Array<user>>([{id: userId, username: login}])
    let addParticipant = (id: number, username: string) => {
        setParticipant([...participants, {id: id, username: username}])
    }
    let showParticipants = participants.map(p => {
        if (p.id === userId) return null
        return <div key={p.id} className={s.participants}>
            <div className={s.participantImg}>{p.username && p.username[0].toUpperCase()}</div>
            <div className={s.participantName}>{p.username}</div>
        </div>
    })
    return (
        <div className={s.dialogsPageBlock}>
            <div>
                <div>{DialogItems}</div>
                <div className={s.addChatBtnBlock}>
                    <BiCommentAdd className={s.addChatBtn} onClick={() => setAddChat(!isAddChat)}/>
                </div>
            </div>
            {isAddChat &&
                <div className={s.addChatBlock}>
                    <input type="text"
                           placeholder="Input chat name..."
                           className={s.chatNameInput}
                           value={chatName}
                           onChange={(e) => setChatName(e.target.value)}
                    />
                    <div className={s.participants}>{showParticipants}
                        <div className={s.addParticipantBtnBlock}>
                            <IoMdPersonAdd className={s.addParticipantBtn} onClick={() => setUsersShow(true)}/>
                        </div>
                    </div>
                    {isUsersShow &&
                        <div className={s.usersBlock}>
                            <ShowFreeUsers chatMembers={participants}
                                           setUsersShow={setUsersShow}
                                           addParticipant={addParticipant}
                            />
                        </div>
                    }
                    {participants.length > 1 && chatName.length > 3 && chatName.length < 40 &&
                        <div className={s.createChatBtnBlock}>
                            <AiOutlineSend className={s.createChatBtn}
                                           onClick={() => {
                                               dispatch(createChat(chatName, participants))
                                               setAddChat(false)
                                               setChatName('')
                                               setParticipant([])
                                           }}
                            />
                        </div>}
                </div>
            }
        </div>
    )
}
export default withAuthRedirect(DialogsPage)