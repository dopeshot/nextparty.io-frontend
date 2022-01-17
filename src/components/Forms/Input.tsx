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
    dataCy?: string
}

export const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="flex flex-col mb-4">
            {props.hasLabel ? <label className="text-light-600 mb-1" htmlFor={props.id}>{props.placeholder}</label> : <></>}
            <Field data-cy={props.dataCy} type={props.type} name={props.field} id={props.id} placeholder={props.placeholder} autoComplete={props.autocomplete} className={`bg-dark-600 rounded pl-4 py-3 ${props.formik.errors[props.field] && props.formik.touched[props.field] ? "border-2 border-red-400 focus:outline-none mb-2" : ""}`} />
            <ErrorInput field={props.field} />
        </div>
    )
}