import React from "react"
import {connect} from "react-redux"
import {Navigate} from "react-router-dom"
import {StateType} from "../state/store"
import {getAuth} from "../selectors/authSelectors"

type MapStateToProps = {
    isAuth: boolean
}
let mapStateToProps = (state: StateType): MapStateToProps => ({
    isAuth: getAuth(state)
});
export const withProfileRedirect = (Component: any) => {
    const RedirectComponent = (props: any) => {
        if (props.isAuth) return <Navigate to='/profile/me'/>
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(RedirectComponent);
}