import React from "react"
import {connect} from "react-redux"
import Navbar from "./navbar"
import {StateType} from "../state/store";
import {Logout} from "../state/authReducer";

const NavbarContainer = (props: any) => {
    return <Navbar {...props}/>
}
let mapStateToProps = (state: StateType) => ({
    isAuth: state.authPage.isAuth
})
export default connect(mapStateToProps, {Logout})(NavbarContainer)

