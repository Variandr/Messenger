import React from "react"
import {connect} from "react-redux"
import Login from "./login"

const AuthorizationContainer = () => {
    return <Login/>
}

export default connect(null, {})(AuthorizationContainer)