// @ts-ignore
import s from "./chatInfo.module.css"
import {IoMdAddCircle} from "react-icons/io"
import React, {FC, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {addParticipant} from "../../../../state/dialogsReducer"
import {getDialogDataSelector} from "../../../../selectors/dialogsSelectors"
import ShowFreeUsers from "../../../../helpers/showFreeUsers/showFreeUsers"

export const ChatInfo: FC = () => {
    let dispatch = useDispatch()
    let dialogData = useSelector(getDialogDataSelector)
    let [isUsersShow, setUsersShow] = useState(false)
    let participants = dialogData?.chatMembers.map(m => {
        return <div key={m.id} className={s.chatMemberBlock}>
            <div className={s.memberImg}>{m.username[0].toUpperCase()}</div>
            <div className={s.memberName + ' ' + s.truncateText}>{m.username}</div>
        </div>
    })
    let setParticipant = (id: number) => {
        if (dialogData) dispatch(addParticipant(dialogData.id, id))
    }

    return <div className={s.infoBlock}>
        <div className={s.chatName + ' ' + s.truncateText}>{dialogData?.chat_name}</div>
        <div className={s.participantsBlock}>
            <div>Participants</div>
            <div className={s.participants}>{participants}</div>
            <div className={s.addParticipantBtnBlock}>
                <IoMdAddCircle className={s.addParticipantBtn} onClick={() => setUsersShow(true)}/>
            </div>
            {isUsersShow &&
                <div className={s.usersBlock}>
                    <ShowFreeUsers chatMembers={dialogData && dialogData.chatMembers}
                                   setUsersShow={setUsersShow}
                                   addParticipant={setParticipant}
                    />
                </div>
            }
        </div>
    </div>
}