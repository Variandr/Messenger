import React from "react"
import {connect} from "react-redux"
import {Navigate} from "react-router-dom"
import {StateType} from "../state/store"
import {getAuth, getUserId} from "../selectors/authSelectors"

type MapStateToProps = {
    isAuth: boolean
    userId: number | null
}
let mapStateToProps = (state: StateType): MapStateToProps => ({
    isAuth: getAuth(state),
    userId: getUserId(state)
});
export const withProfileRedirect = (Component: any) => {
    const RedirectComponent = (props: any) => {
        if (props.isAuth) return <Navigate to={'/profile/' + props.userId}/>
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(RedirectComponent);
}