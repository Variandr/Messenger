import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import AuthorizationReducer from "./authReducer"
import ProfileReducer from "./profileReducer"
import {reducer as formReducer} from "redux-form";
import AppReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: ProfileReducer,
    authPage: AuthorizationReducer,
    appPage: AppReducer,
    form: formReducer
})
type ReducersType = typeof reducers
export type StateType = ReturnType<ReducersType>
let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store
export default store