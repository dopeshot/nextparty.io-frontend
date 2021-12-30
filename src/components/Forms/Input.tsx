import { AutocompleteTypes } from "@ionic/core";
import { Field, FormikProps } from "formik";
import { ErrorInput } from "./ErrorMessage";

type InputProps = {
    formik: FormikProps<any>
    field: string
    type: "email" | "text" | "password"
    id: string
    placeholder: string
    autocomplete: AutocompleteTypes
    hasLabel?: boolean
}

export const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="flex flex-col mb-4">
            {props.hasLabel ? <label htmlFor={props.id}>{props.placeholder}</label> : <></>}
            <Field type={props.type} name={props.field} id={props.id} placeholder={props.placeholder} autoComplete={props.autocomplete} className={`rounded pl-4 py-3 ${props.formik.errors[props.field] && props.formik.touched[props.field] ? "border-2 border-red-400 focus:outline-none mb-2" : ""}`} />
            <ErrorInput field={props.field} />
        </div>
    )
}