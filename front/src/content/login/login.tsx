import React, {useState} from "react"
// @ts-ignore
import s from './login.module.css'
// @ts-ignore
import {FieldCreator} from "../../helpers/formCreator"
import {SignInForm, SignUpForm} from "./signForms"

const Auth = ({Login, Registration}: any) => {
    let [isSignUp, setSignUp] = useState(false)
    const onSubmit = (formData: any) => {
        Login(formData.login, formData.password, formData.remember);
    }
    const onSubmitReg = (formData: any) => {
        Registration(formData.login, formData.password, formData.username, formData.remember);
    }
    const RedirectRegForm = () => setSignUp(true)
    const RedirectLoginForm = () => setSignUp(false)
    return <div className={s.body}>
        {isSignUp
            ? <SignUpForm onSubmit={onSubmitReg} setSignUp={RedirectLoginForm}/>
            : <SignInForm onSubmit={onSubmit} setSignUp={RedirectRegForm}/>
        }
    </div>
}

export default Auth;