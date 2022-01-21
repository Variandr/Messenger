import React, {useState} from "react";
// @ts-ignore
import s from "../login/login.module.css";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Field} from "redux-form";

const RenderField = ({input, label, meta: {touched, error}, icon, isPass}: any) => {
    let [isVisible, setVisibility] = useState<boolean>(false)
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