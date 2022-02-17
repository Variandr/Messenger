import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {getMessages} from "../../state/dialogsReducer"
import {useDispatch, useSelector} from "react-redux"
import {getMessagesSelector} from "../../selectors/dialogsSelectors"

const Chat = (props: any) => {
    let dispatch = useDispatch()
    const {dialogId} = useParams()
    useEffect(() => {
        if (dialogId) dispatch(getMessages(dialogId))
    })
    let messagesData = useSelector(getMessagesSelector)
    let messages
    if (messagesData) {
        let sortedMessages = messagesData.sort((a, b) => {
            let bDate = b.updated_at ? b.updated_at : b.created_at
            let aDate = a.updated_at ? a.updated_at : a.created_at
            return +new Date(bDate) - +new Date(aDate)
        })
        messages = sortedMessages.map(m => {
            return <div key={m.id}>
                {m.body}
            </div>
        })
    }
    return (
        <div>
            {messages}
        </div>
    )
}
export default Chat