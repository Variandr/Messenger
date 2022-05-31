import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import AuthorizationReducer from './authReducer';
import ProfileReducer from './profileReducer';
import AppReducer from './appReducer';
import UsersReducer from './usersReducer';
import DialogsReducer from './dialogsReducer';

const reducers = combineReducers({
  profilePage: ProfileReducer,
  authPage: AuthorizationReducer,
  appPage: AppReducer,
  usersPage: UsersReducer,
  dialogsPage: DialogsReducer,
});

export type Actions<T> = T extends { [key: string]: (...args: never[]) => infer U } ? U : never; // type any for args?
export type BaseThunk<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>;
type ReducersType = typeof reducers;
export type StateType = ReturnType<ReducersType>;
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
