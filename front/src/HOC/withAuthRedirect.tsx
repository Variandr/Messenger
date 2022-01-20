import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {StateType} from "../state/store";

let mapStateToProps = (state: StateType) => ({
    isAuth: state.authPage.isAuth
});
export const withAuthRedirect = (Component: any) => {
    const RedirectComponent = (props: any) => {
        if (!props.isAuth) return <Navigate to='/auth'/>
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(RedirectComponent);
}