import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {StateType} from "../state/store";

let mapStateToProps = (state: StateType) => ({
    isAuth: state.authPage.isAuth
});
export const withProfileRedirect = (Component: any) => {
    const RedirectComponent = (props: any) => {
        console.log(props)
        if (props.isAuth) return <Navigate to='/users/me'/>
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(RedirectComponent);
}