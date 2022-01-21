import React, {useState} from "react"
import {AiOutlineUnorderedList} from "react-icons/ai"
import {BiFace} from "react-icons/bi"
import {ImExit, ImUsers} from "react-icons/im"
import {TiMessages} from "react-icons/ti"
import {NavLink} from "react-router-dom"
// @ts-ignore
import s from './navbar.module.css'

const Navbar = (props: any) => {
    let [isVisible, setVisibility] = useState<boolean>(false)
    return <div className={s.body}>
        {props.isAuth && <div>
            <div className={s.mainButton} onClick={() => setVisibility(!isVisible)}><AiOutlineUnorderedList/></div>
            <div className={s.exitButton} onClick={() => props.Logout()}><ImExit/></div>
        </div>
        }
        {isVisible &&
            <div className={s.nav}>
                <div><NavLink to='/users/me' className={s.button}><BiFace/></NavLink></div>
                <div><NavLink to='/users' className={s.button}><ImUsers/></NavLink></div>
                <div><NavLink to='/dialogs' className={s.button}><TiMessages/></NavLink></div>
            </div>
        }
    </div>
}
export default Navbar