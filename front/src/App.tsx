import React, {FC, useEffect, useState} from 'react'
import './App.css'
import AuthorizationContainer from "./content/login/loginContainer"
import {Navigate, NavLink, Route, Routes} from "react-router-dom"
import ProfilePage from "./content/profile/profilePage"
import UsersContainer from "./content/users/usersContainer"
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from './state/appReducer'
import Preloader from "./helpers/preloader"
import {getAuth} from "./selectors/authSelectors"
import {getInitialize} from "./selectors/appSelectors"
import {Layout, Menu} from "antd"
import {BiFace} from "react-icons/bi"
import {ImExit, ImUsers} from "react-icons/im"
import {Logout} from "./state/authReducer"
import {TiMessages} from "react-icons/ti"
import {getProfile} from './selectors/profileSelectors'
import DialogsPage from "./content/dialogs/dialogsPage/dialogsPage"
import Chat from "./content/dialogs/ChatPage/chatPage"

const {Header, Content} = Layout;
const Profile = () => {
    return <div>
        <Routes>
            <Route path=":id" element={<UsersContainer/>}/>
            <Route path="me" element={<ProfilePage/>}/>
        </Routes>
    </div>
}

const Dialogs = () => {
    return <div>
        <Routes>
            <Route path=":dialogId" element={<Chat/>}/>
            <Route path="" element={<DialogsPage/>}/>
        </Routes>
    </div>
}


export const App: FC<any> = () => {
    const isAuth = useSelector(getAuth)
    const isInitialized = useSelector(getInitialize)
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    let [isVisible, setVisibility] = useState(false)
    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeApp())
        }
    }, [])
    if (!isInitialized) {
        return <div className="App">
            <Preloader/>
        </div>
    }
    return <div className="App">
        <Layout style={{minHeight: '100vh'}}>
            {isAuth &&
                <Layout.Sider collapsible collapsed={isVisible} onCollapse={() => setVisibility(!isVisible)}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline">
                        <Menu.SubMenu key="sub1" icon={<BiFace/>} title="Profile">
                            <Menu.Item key="1">
                                <NavLink to='profile/me'>{profile ? profile.username : "Profile"}</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<ImExit/>} onClick={() => dispatch(Logout())}>
                                Logout
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="3" icon={<ImUsers/>}>
                            <NavLink to='users'>Users</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<TiMessages/>}><NavLink to='dialogs'>Dialogs</NavLink></Menu.Item>
                    </Menu>
                </Layout.Sider>
            }
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '30px 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Routes>
                            <Route path="/" element={isAuth ? <Navigate to="/profile/me"/> : <Navigate to="auth"/>}/>
                            <Route path="profile/*" element={<Profile/>}/>
                            <Route path='users' element={<UsersContainer/>}/>
                            <Route path='auth' element={<AuthorizationContainer/>}/>
                            <Route path='dialogs/*' element={<Dialogs/>}/>
                            <Route path='*' element={<div className='center'><h1>404 Page not found</h1></div>}/>
                        </Routes>
                    </div>
                </Content>
                <Layout.Footer style={{textAlign: 'center'}}>Messenger ©2022 Created by Variandr</Layout.Footer>
            </Layout>
        </Layout>
    </div>
}
