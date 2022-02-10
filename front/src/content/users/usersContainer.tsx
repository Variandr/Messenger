import React, {useEffect} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import Users from "./users"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {getUsers} from "../../state/usersReducer"

const UsersContainer = (props:any) => {
    useEffect(() => props.getUsers(), [])
    return <Users/>
}
export default compose(withAuthRedirect, connect(null, {getUsers}))(UsersContainer)