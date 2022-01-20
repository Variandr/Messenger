import React from "react"
import { connect } from "react-redux"
import Profile from "./profile"

const ProfileContainer = () => {
    return <Profile/>
}
export default connect(null, {})(ProfileContainer)