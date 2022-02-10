import React, {FC, useState} from "react"
import {AiOutlineUnorderedList} from "react-icons/ai"
import {BiFace} from "react-icons/bi"
import {ImExit, ImUsers} from "react-icons/im"
import {TiMessages} from "react-icons/ti"
import {NavLink} from "react-router-dom"
// @ts-ignore
import s from './navbar.module.css'
import {getAuth} from "../selectors/authSelectors"
import {Logout} from "../state/authReducer"
import {useDispatch, useSelector} from "react-redux"

type PropsType = {}
export const Navbar: FC<PropsType> = () => {
    const isAuth = useSelector(getAuth)
    const dispatch = useDispatch()

    let NavItemCreator = (redirect: string, icon: any) => {
        return <div>
            <NavLink to={redirect} className={s.button} onClick={() => setVisibility(false)}>{icon}</NavLink>
        </div>
    }
    let [isVisible, setVisibility] = useState(false)
    return <div className={s.body}>
        {isAuth && <div>
            <div className={s.mainButton} onClick={() => setVisibility(!isVisible)}><AiOutlineUnorderedList/></div>
            <div className={s.exitButton} onClick={() => dispatch(Logout())}><ImExit/></div>
        </div>
        }
        {isVisible &&
            <div className={s.nav}>
                {NavItemCreator('profile/me', <BiFace/>)}
                {NavItemCreator('users', <ImUsers/>)}
                {NavItemCreator('dialogs', <TiMessages/>)}
            </div>
        }
    </div>
}