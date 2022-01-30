import React, {FC, useState} from "react"
import {AiOutlineUnorderedList} from "react-icons/ai"
import {BiFace} from "react-icons/bi"
import {ImExit, ImUsers} from "react-icons/im"
import {TiMessages} from "react-icons/ti"
import {NavLink} from "react-router-dom"
// @ts-ignore
import s from './navbar.module.css'

type PropsType = {
    Logout: () => void
    isAuth: boolean
}
const Navbar:FC<PropsType> = ({Logout, isAuth}) => {
    let [isVisible, setVisibility] = useState(false)
    return <div className={s.body}>
        {isAuth && <div>
            <div className={s.mainButton} onClick={() => setVisibility(!isVisible)}><AiOutlineUnorderedList/></div>
            <div className={s.exitButton} onClick={() => Logout()}><ImExit/></div>
        </div>
        }
        {isVisible &&
            <div className={s.nav}>
                <div><NavLink to='profile/me' className={s.button}><BiFace/></NavLink></div>
                <div><NavLink to='users' className={s.button}><ImUsers/></NavLink></div>
                <div><NavLink to='dialogs' className={s.button}><TiMessages/></NavLink></div>
            </div>
        }
    </div>
}
export default Navbar