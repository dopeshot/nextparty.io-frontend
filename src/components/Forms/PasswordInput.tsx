import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { AutocompleteTypes } from "@ionic/core";
import { Field, FormikProps } from "formik";
import { useState } from "react";
import { ErrorInput } from "./ErrorMessage";

type PasswordInputProps = {
    formik: FormikProps<any>
    id: string
    autocomplete: AutocompleteTypes
    hasLabel?: boolean
    dataCy?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="mb-4">
            {props.hasLabel ? <label htmlFor={props.id} className="mb-1 block">Password</label> : <></>}
            <div className="relative flex flex-col justify-center">
                <button type="button" onMouseDown={event => event.preventDefault()} onClick={() => setShowPassword(!showPassword)} className="absolute right-4">
                    {showPassword ? <EyeIcon className="w-6 h-6" /> : <EyeOffIcon className="w-6 h-6" />}
                </button>
                <Field data-cy={props.dataCy} type={showPassword ? "text" : "password"} name="password" id={props.id} placeholder="Password" autoComplete={props.autocomplete} className={`rounded pl-4 py-3 ${props.formik.errors.password && props.formik.touched.password ? "border-2 border-red-400 focus:outline-none" : ""}`} />
            </div>
            <ErrorInput field="password" className="mt-2" />
        </div>
    )
}