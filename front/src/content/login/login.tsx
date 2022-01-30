import React, {FC, useState} from "react"
// @ts-ignore
import s from './login.module.css'
// @ts-ignore
import {FieldCreator} from "../../helpers/formCreator"
import {ReduxSignInForm, ReduxSignUpForm} from "./signForms"

const Auth = ({Login, Registration}: any) => {
    let [isSignUp, setSignUp] = useState(false)
    const onSubmit = (formData: any) => {
        Login(formData.login, formData.password);
    }
    const onSubmitReg = (formData: any) => {
        Registration(formData.login, formData.password, formData.username);
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