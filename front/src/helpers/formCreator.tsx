import React, {FC, useState} from "react";
// @ts-ignore
import s from "../content/login/login.module.css";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Field} from "redux-form";

type metaType = {
    touched: boolean
    error: string
}
type RenderFieldProps = {
    input: any
    label: string
    meta: metaType
    icon: any
    isPass: boolean
}
const RenderField:FC<RenderFieldProps> = ({input, label, meta: {touched, error}, icon, isPass}) => {
    let [isVisible, setVisibility] = useState(false)
    return <div>
        <div className={s.icon}>{icon}</div>
        {isPass ? <div>
                <input className={touched && error ? s.error : s.input} {...input} placeholder={label}
                       type={isVisible ? "text" : "password"}/>
                <div onClick={() => setVisibility(!isVisible)}
                     className={s.iconEye}>{isVisible ? <AiFillEye/> :
                    <AiFillEyeInvisible/>}</div>
                {touched && (error && <span className={s.error_message}>{error}</span>)}
            </div>
            : <div>
                <input className={touched && error ? s.error : s.input} {...input} placeholder={label}
                       type="text"/>
                {touched && (error && <span className={s.error_message}>{error}</span>)}
            </div>}
    </div>
}

export const FieldCreator = (icon: any, name: string, label: string, validate: Array<any>, isPass: boolean = false) => {
    return <div>
        <Field className={s.input} icon={icon} component={RenderField} name={name}
               label={label} isPass={isPass} validate={validate}/>
    </div>
}