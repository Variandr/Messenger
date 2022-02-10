import React, {FC, useEffect} from 'react'
import './App.css'
import AuthorizationContainer from "./content/login/loginContainer"
import {Navigate, Route, Routes} from "react-router-dom"
import ProfileContainer from "./content/profile/profileContainer"
import UsersContainer from "./content/users/usersContainer"
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from './state/appReducer'
import Preloader from "./helpers/preloader"
import {Navbar} from "./navbar/navbar"
import {getAuth} from "./selectors/authSelectors"
import {getInitialize} from "./selectors/appSelectors"

const Profile: FC<any> = () => {
    return <div>
        <Routes>
            <Route path=":id" element={<UsersContainer/>}/>
            <Route path="me" element={<ProfileContainer/>}/>
        </Routes>
    </div>
}

export const App: FC<any> = () => {
    const isAuth = useSelector(getAuth)
    const isInitialized = useSelector(getInitialize)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeApp())
        }
    })
    if (!isInitialized) {
        return <div className="App">
            <Preloader/>
        </div>
    }
    return <div className="App">
        <Navbar/>
        <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/profile/me"/> : <Navigate to="auth"/>}/>
            <Route path="profile/*" element={<Profile/>}/>
            <Route path='users' element={<UsersContainer/>}/>
            <Route path='auth' element={<AuthorizationContainer/>}/>
            <Route path='*' element={<div className='center'><h1>404 Page not found</h1></div>}/>
        </Routes>
    </div>
}
