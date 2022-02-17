import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getUserId } from "../../selectors/authSelectors"
import {getDialogs} from "../../state/dialogsReducer"
import {getDialogsSelector} from "../../selectors/dialogsSelectors"
// @ts-ignore
import s from "./dialogs.module.css"
import {NavLink} from "react-router-dom"

export const DialogsPage = () => {
    let userId = useSelector(getUserId)
    let dispatch = useDispatch()
    useEffect(() => {
        if(userId) dispatch(getDialogs(userId))
    })
    let dialogs = useSelector(getDialogsSelector)
    let DialogItems
    if(dialogs){
        let sortedDialogs = dialogs.sort((a,b) => {
            let bDate = b.updated_at ? b.updated_at : b.created_at
            let aDate = a.updated_at ? a.updated_at : a.created_at
            return +new Date(bDate) - +new Date(aDate)
        })
        DialogItems = sortedDialogs.map(d => {
            return <div key={d.id} className={s.dialogContainer}>
                <NavLink to={'/dialogs/' + d.id} className={s.navLink}>
                <div className={s.chatName}>{d.chat_name}</div>
                    <div className={s.dialogText}><div className={s.username}>{d.username ? d.username + ":" : ''}</div><div className={s.truncateText}>{d.message ? d.message : ''}</div></div>
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