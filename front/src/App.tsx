import React, {useEffect} from 'react'
import './App.css'
import AuthorizationContainer from "./content/login/loginContainer";
import {Navigate, Route, Routes} from "react-router-dom";
import NavbarContainer from "./navbar/navbarContainer";
import ProfileContainer from "./content/profile/profileContainer"
import UsersContainer from "./content/users/usersContainer"
import {StateType} from "./state/store"
import {connect} from 'react-redux'
import {initializeApp} from './state/appReducer'
import Preloader from "./helpers/preloader";

const Profile: React.FC = () => {
    return <div>
        <Routes>
            <Route path=":id" element={<UsersContainer/>}/>
            <Route path="me" element={<ProfileContainer/>}/>
        </Routes>
    </div>
}

const App: React.FC = (props: any) => {
    useEffect(() => {
        if (!props.isInitialized) {
            props.initializeApp()
        }
    })
    if (!props.isInitialized) {
        return <div className="App">
            <Preloader/>
        </div>
    }
    return <div className="App">
        <NavbarContainer/>
        <Routes>
            <Route path="/" element={props.isAuth ? <Navigate to="/profile/me"/> : <Navigate to="auth"/>}/>
            <Route path="profile/*" element={<Profile/>}/>
            <Route path='users' element={<UsersContainer/>}/>
            <Route path='auth' element={<AuthorizationContainer/>}/>
            <Route path='*' element={<div className='center'><h1>404 Page not found</h1></div>}/>
        </Routes>
    </div>
}
let mapStateToProps = (state: StateType) => ({
    isInitialized: state.appPage.isInitialized,
    isAuth: state.authPage.isAuth
})
export default connect(mapStateToProps, {initializeApp})(App)
