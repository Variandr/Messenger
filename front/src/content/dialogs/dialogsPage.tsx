import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDialogs} from "../../state/dialogsReducer"
import {getDialogsSelector} from "../../selectors/dialogsSelectors"
// @ts-ignore
import s from "./dialogs.module.css"
import {NavLink} from "react-router-dom"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"

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
                        <div className={s.truncateText}>{d.message ? d.message : ''}</div>
                    </div>
                </NavLink>
            </div>
        })
    }
    return (
        <div>
            {DialogItems}
        </div>
    )
}
export default withAuthRedirect(DialogsPage)