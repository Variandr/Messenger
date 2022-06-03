import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import AuthorizationReducer from './Reducers/authReducer';
import ProfileReducer from './Reducers/profileReducer';
import AppReducer from './Reducers/appReducer';
import UsersReducer from './Reducers/usersReducer';
import DialogsReducer from './Reducers/dialogsReducer';

export type Actions<T> = T extends { [key: string]: (...args: never[]) => infer U } ? U : never;
export type BaseThunk<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>;
export type StateType = ReturnType<typeof reducers>;

const reducers = combineReducers({
  profilePage: ProfileReducer,
  authPage: AuthorizationReducer,
  appPage: AppReducer,
  usersPage: UsersReducer,
  dialogsPage: DialogsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
