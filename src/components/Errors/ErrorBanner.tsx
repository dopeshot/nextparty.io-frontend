import { ExclamationCircleIcon } from "@heroicons/react/outline"

type ErrorBannerProps = {
    message: string
    dataCy?: string
    color: "danger" | "warning"
    buttonText?: string
    onClick?: (values: any) => void
}

export const ErrorBanner: React.FC<ErrorBannerProps> = (props) => {
    return (
        <div data-cy={props.dataCy} className={`flex 
        ${props.color === "danger" ? "bg-background-danger-red text-danger-red border-l-2 border-danger-red" : ""} 
        ${props.color === "warning" ? "bg-yellow-800 bg-opacity-25 text-truth-yellow border-l-2 border-truth-yellow" : ""} 
        py-4 mb-5`}>
            <ExclamationCircleIcon className="h-6 w-6 ml-4 mr-2" />
            <p>{props.message}</p>
            {props.onClick && <button className="underline ml-2" type="button" onClick={props.onClick}>{props.buttonText}</button>}
        </div>
    )
}