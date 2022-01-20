type profileType = {
    id: number,
    username: string,
    login: string,
    status: string
}
let initialState = {
    profile: null as profileType | null,
    isFetching: false
};
type initialStateType = typeof initialState
const ProfileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default ProfileReducer