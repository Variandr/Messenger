import {applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import AuthorizationReducer from "./authReducer"
import ProfileReducer from "./profileReducer"

let reducers = combineReducers({
    profilePage: ProfileReducer,
    authPage: AuthorizationReducer
})
type ReducersType = typeof reducers
export type StateType = ReturnType<ReducersType>
let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store