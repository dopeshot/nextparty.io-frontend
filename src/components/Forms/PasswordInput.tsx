import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { AutocompleteTypes } from "@ionic/core";
import { Field, FormikProps } from "formik";
import { useState } from "react";
import { ErrorInput } from "./ErrorMessage";

type PasswordInputProps = {
    formik: FormikProps<any>
    id: string
    autocomplete: AutocompleteTypes
}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative flex flex-col mb-4">
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon className="absolute top-3 left-auto right-5 w-6 h-6" /> : <EyeOffIcon className="absolute top-3 left-auto right-5 w-6 h-6" />}
            </button>
            <Field type={showPassword ? "text" : "password"} name="password" id={props.id} placeholder="Password" autoComplete={props.autocomplete} className={`rounded pl-4 py-3 ${props.formik.errors.password && props.formik.touched.password ? "border-2 border-red-400 focus:outline-none mb-2" : ""}`} />
            <ErrorInput field="password" />
        </div>
    )
}