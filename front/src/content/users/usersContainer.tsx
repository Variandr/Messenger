import React from "react"
import { connect } from "react-redux"
import Users from "./users";

const UsersContainer = () => {
    return <Users/>
}
export default connect(null, {})(UsersContainer)