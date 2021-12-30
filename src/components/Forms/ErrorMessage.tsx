import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "formik";

type ErrorInputProps = {
    field: string
    className?: string
}

export const ErrorInput: React.FC<ErrorInputProps> = (props) => {
    return (
        <ErrorMessage name={props.field} component="span">
            {errorMessage => <div className={`flex items-center text-red-400 ${props.className}`}>
                <ExclamationCircleIcon className="h-6 w-6 mr-2" />
                <span className="text-sm font-semibold">{errorMessage}</span>
            </div>}
        </ErrorMessage>
    )
}