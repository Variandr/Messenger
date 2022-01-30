import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import Users from "./users"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"

const UsersContainer = () => {
    return <Users/>
}
export default compose(withAuthRedirect, connect(null, {}))(UsersContainer)