import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {updateStatus} from "../../state/profileReducer"
import {getUserId} from "../../selectors/authSelectors"
import {getProfile} from "../../selectors/profileSelectors"

const Profile = () => {
    let dispatch = useDispatch()
    let profile = useSelector(getProfile)
    let profileId = useSelector(getUserId)
    let UpdateStatus = (profileId: number, status: string) => {
    dispatch(updateStatus(profileId, status))
    }
    return <div>
        <div>{profile && profile.username}</div>
        <div>{profile && profile.status}</div>
    </div>
}
export default Profile