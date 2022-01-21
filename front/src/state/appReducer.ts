import {AuthMe} from "./authReducer";

const SET_APP_LOADED = '/app/SET_APP_LOADED'
let initialState = {
    isInitialized: false
}
type initialStateType = typeof initialState
const AppReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case SET_APP_LOADED:
            return {...state, isInitialized: true}
        default:
            return state
    }
}
export default AppReducer
type AppLoadedType = {
    type: typeof SET_APP_LOADED
}
type ActionTypes = AppLoadedType
const _setInitialSuccess = (): AppLoadedType => ({
    type: SET_APP_LOADED
})
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(AuthMe());
    Promise.all([promise]).then(() => {
        dispatch(_setInitialSuccess());
    })
}