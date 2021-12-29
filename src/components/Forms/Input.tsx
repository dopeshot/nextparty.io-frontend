import { Field, FormikProps } from "formik";
import { ErrorInput } from "./ErrorMessage";

type IconButtonProps = {
    formik: FormikProps<any>
    field: "email" | "password" | "username"
    type: "email" | "text" | "password"
    id: string
    placeholder: string
}

export const Input: React.FC<IconButtonProps> = (props) => {
    return (
        <div className="flex flex-col mb-4">
            <Field type={props.type} name={props.field} id={props.id} placeholder={props.placeholder} className={`rounded pl-4 py-3 ${props.formik.errors[props.field] && props.formik.touched[props.field] ? "border-2 border-red-400 focus:outline-none mb-2" : ""}`} />
            <ErrorInput field={props.field} />
        </div>
    )
}