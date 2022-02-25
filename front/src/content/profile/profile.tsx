import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {updateStatus, updateUsername} from "../../state/profileReducer"
import {getProfile} from "../../selectors/profileSelectors"
import {getUserId} from "../../selectors/authSelectors"

const Profile = () => {
    let dispatch = useDispatch()
    let profile = useSelector(getProfile)
    let userId = useSelector(getUserId)
    let editStatus = () => {
        if (profile && profile.status !== status && status)
            dispatch(updateStatus(status))
    }
    let editUsername = () => {
        if (profile && profile.username !== username && username)
            dispatch(updateUsername(username))
    }
    let isMyProfile = false
    if (profile) {
        isMyProfile = userId === profile.id
    }
    let [status, setStatus] = useState<string | null>(profile ? profile.status : null)
    let [username, setUsername] = useState<string | null>(profile ? profile.username : null)
    let onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }
    let onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    let [isEditUsername, setEditUsername] = useState(false)
    let [isEditStatus, setEditStatus] = useState(false)
    return <div>
        {isMyProfile && isEditUsername && !isEditStatus ?
            <div>
                <input onBlur={() => {
                    setEditUsername(false)
                    editUsername()
                }} onChange={onUsernameChange} value={username ? username : ''}/>
            </div>
            : <div onDoubleClick={() => !isEditStatus && setEditUsername(true)}>{profile && profile.username}</div>
        }
        {isMyProfile && isEditStatus && !isEditUsername ?
            <div>AboutMe:
                <input onBlur={() => {
                    setEditStatus(false)
                    editStatus()
                }} onChange={onStatusChange} value={status ? status : ''}/>
            </div>
            :
            <div onDoubleClick={() => !isEditUsername && setEditStatus(true)}>AboutMe: {profile && profile.status}</div>
        }
    </div>
}
export default Profile