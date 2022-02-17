import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import Profile from "./profile"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {getProfile} from "../../state/profileReducer";
import {getUserId} from "../../selectors/authSelectors";

export const ProfilePage = (props: any) => {
    let dispatch = useDispatch()
    let userId = useSelector(getUserId)
    useEffect(() => {
        if (userId) dispatch(getProfile(userId))
    }, [])
    return <Profile/>
}
export default withAuthRedirect(ProfilePage)