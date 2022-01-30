// @ts-ignore
import s from "./login.module.css"
import {FieldCreator} from "../../helpers/formCreator"
import {HiOutlineUserCircle} from "react-icons/hi"
import {BiLockAlt} from "react-icons/bi"
import React from "react"
import {FaUserAlt} from "react-icons/fa"
import {reduxForm} from "redux-form"

const required = (value: any) => value ? undefined : 'Field is required'
const maxLength = (maxLength: number) => (value: any): string | undefined => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
const minLength = (minLength: number) => (value: any): string | undefined => value && value.length < minLength ? `Min length is ${minLength} symbols` : undefined
const minLength5 = minLength(5)
const minLength8 = minLength(8)
const maxLength20 = maxLength(20)
const maxLength40 = maxLength(40)

const SignInForm = (props: any) => {
    return (
        <form className={s.sign_in} onSubmit={props.handleSubmit}>
            {FieldCreator(<HiOutlineUserCircle/>, "login", "Login", [required, minLength5, maxLength20])}
            {FieldCreator(<BiLockAlt/>, "password", "Password", [required, minLength8, maxLength40], true)}
            <div>
                <button className={s.button_log} type="submit">Login</button>
            </div>
        </form>
    )
}
const SignUpForm = (props: any) => {
    return (
        <form className={s.sign_up} onSubmit={props.handleSubmit}>
            {FieldCreator(<FaUserAlt/>, "username", "Username", [])}
            {FieldCreator(<HiOutlineUserCircle/>, "login", "Login", [required, minLength5, maxLength20])}
            {FieldCreator(<BiLockAlt/>, "password", "Password", [required, minLength8, maxLength40], true)}
            <div>
                <button className={s.button_log} type="submit">Registration</button>
            </div>
        </form>
    )
}
export const ReduxSignInForm = reduxForm({form: "login"})(SignInForm)
export const ReduxSignUpForm = reduxForm({form: "registration"})(SignUpForm)