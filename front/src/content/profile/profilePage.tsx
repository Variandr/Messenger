import React, {FC, useEffect} from "react"
import {useDispatch} from "react-redux"
import Profile from "./profile"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {getProfile} from "../../state/profileReducer"
import {useParams} from "react-router-dom"

export const ProfilePage: FC = () => {
    let dispatch = useDispatch()
    let {id} = useParams()
    useEffect(() => {
        if (id) dispatch(getProfile(id))
    }, [id])
    useEffect(() => {

    })
    return <Profile/>
}
export default withAuthRedirect(ProfilePage)