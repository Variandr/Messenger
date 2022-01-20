import React from "react"
import {connect} from "react-redux"
import Auth from "./login"
import {Login, Registration} from "../../state/authReducer";
import {compose} from "redux";
import {withProfileRedirect} from "../../HOC/withProfileRedirect";

const AuthorizationContainer = (props: any) => {
    return <Auth {...props}/>
}

export default compose(withProfileRedirect, connect(null, {Login, Registration}))(AuthorizationContainer)