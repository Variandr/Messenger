import React, {useState} from "react"
import {Field, reduxForm} from "redux-form"
// @ts-ignore
import s from './login.module.css'
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import {HiOutlineUserCircle} from "react-icons/hi"
import {BiLockAlt} from "react-icons/bi"

const renderField = ({input, label, type, meta, icon}: any) => {
    return <div>
        <div className={s.icon}>{icon}</div>
        <div>
            <input className={meta.touched && meta.error ? s.error : s.input} {...input} placeholder={label}
                   type={type}/>

            {meta.touched && (meta.error && <span className={s.error_message}>{meta.error}</span>)}
        </div>
    </div>
}
const required = (value: any) => value ? undefined : 'Field is required';
const maxLength = (maxLength: number) => (value: any): string | undefined => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
const minLength = (minLength: number) => (value: any): string | undefined => value && value.length < minLength ? `Min length is ${minLength} symbols` : undefined
const minLength5 = minLength(5)
const minLength8 = minLength(8)
const maxLength20 = maxLength(20)
const maxLength40 = maxLength(40)

const SignInForm = (props: any) => {
    let [isVisible, setVisibility] = useState<boolean>(false)
    return (
        <form className={s.sign_in} onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.input} icon={<HiOutlineUserCircle/>} component={renderField} name="login"
                       label="Login"
                       type="text"
                       validate={[required, minLength5, maxLength20]}/>
            </div>
            <div>
                <Field className={s.input} icon={<BiLockAlt/>} component={renderField} name="password"
                       type={isVisible ? "text" : "password"}
                       label="Password"
                       validate={[required, minLength8, maxLength40]}/>
                <div onClick={isVisible ? () => setVisibility(false) : () => setVisibility(true)}
                     className={s.iconPass}>{isVisible ? <AiFillEye/> : <AiFillEyeInvisible/>}</div>
            </div>
            <div>
                <button className={s.button_log} type="submit">Sign in</button>
            </div>
        </form>
    )
}
const ReduxSignInForm = reduxForm({form: "login"})(SignInForm);
const SignUpForm = (props: any) => {
    return (
        <form className={s.sign_up} onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.input && s.user} component={renderField} name="username" label="Username"
                       type="text"/>
            </div>
            <div>
                <Field className={s.input && s.email}
                       component={renderField} name="login" label="Login" type="text"
                       validate={[required, minLength5, maxLength20]}/>
            </div>
            <div>
                <Field className={s.input && s.pass} component={renderField} name="password" type="text"
                       label="Password"
                       validate={[required, minLength8, maxLength40]}/>
            </div>
            <div>
                <button className={s.button_log} type="submit">Sign up</button>
            </div>
        </form>
    )
}
const ReduxSignUpForm = reduxForm({form: "registration"})(SignUpForm);
const Auth = (props: any) => {
    let [isSignUp, setSignUp] = useState<boolean>(false)
    const onSubmit = (formData: any) => {
        props.Login(formData.login, formData.password);
    }
    const onSubmitReg = (formData: any) => {
        props.Registration(formData.login, formData.password, formData.username);
    }
    return <div className={s.body}>
        <div className={s.sign}>
            <button className={s.signButton} onClick={() => setSignUp(false)}>Sign In</button>
        </div>
        <div className={s.sign}>
            <button className={s.signButton} onClick={() => setSignUp(true)}>Sign Up</button>
        </div>
        {isSignUp
            ? <ReduxSignUpForm onSubmit={onSubmitReg}/>
            : <ReduxSignInForm onSubmit={onSubmit}/>
        }
    </div>
}

export default Auth;