let initialState = {
    isAuth: false,
    login: null as string | null,
    userId: null as number | null,
    accessToken: null as string | null,
    refreshToken: null as string | null
};
type initialStateType = typeof initialState
const AuthorizationReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default AuthorizationReducer