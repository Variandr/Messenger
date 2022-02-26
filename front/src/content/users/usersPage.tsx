import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import Users from "./users"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {getUsers} from "../../state/usersReducer"
import {getUsersSelector} from "../../selectors/usersSelectors"
import {getUserId, getUserLogin} from "../../selectors/authSelectors";
import {getDialogsSelector} from "../../selectors/dialogsSelectors";

const UsersPage = () => {
    let dispatch = useDispatch()
    let users = useSelector(getUsersSelector)
    let dialogs = useSelector(getDialogsSelector)
    let userId = useSelector(getUserId)
    let login = useSelector(getUserLogin)
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    let myData = [{id: userId, username: login}]
    let showUsers = users?.map(u => {
        return <Users dialogs={dialogs} key={u.id} u={u} myData={myData} userId={userId}/>
    })
    return <div>{showUsers}</div>
}
export default withAuthRedirect(UsersPage)