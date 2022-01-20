import React from "react"
import {connect} from "react-redux"
import Profile from "./profile"
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";

const ProfileContainer = () => {
    return <Profile/>
}
export default compose(withAuthRedirect, connect(null, {}))(ProfileContainer)