import React from "react"
import {connect} from "react-redux"
import Navbar from "./navbar"

const NavbarContainer = () => {
    return <Navbar/>
}

export default connect(null, {})(NavbarContainer)

