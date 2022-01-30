import React, {FC} from "react"
import {connect} from "react-redux"
import Navbar from "./navbar"
import {StateType} from "../state/store"
import {Logout} from "../state/authReducer"
import {getAuth} from "../selectors/authSelectors"

type MapStateToProps = {
    isAuth: boolean
}
type MapDispatchToProps = {
    Logout: () => void
}
type PropsType = MapDispatchToProps & MapStateToProps
const NavbarContainer: FC<PropsType> = ({isAuth, Logout}) => {
    return <Navbar isAuth={isAuth}
                   Logout={Logout}/>
}
let mapStateToProps = (state: StateType): MapStateToProps => ({
    isAuth: getAuth(state)
})
export default connect<MapStateToProps, MapDispatchToProps, {}, StateType>(mapStateToProps, {Logout})(NavbarContainer)

