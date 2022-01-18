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
        ${props.color === "danger" ? "bg-theme-sexy-truth bg-opacity-10 text-theme-sexy-truth border-l-2 border-theme-sexy-truth" : ""} 
        ${props.color === "warning" ? "bg-theme-friendship-dare bg-opacity-10 text-theme-friendship-dare border-l-2 border-theme-friendship-dare" : ""} 
        py-4 mb-5`}>
            <ExclamationCircleIcon className="h-6 w-6 ml-4 mr-2" />
            <p>{props.message}</p>
            {props.onClick && <button className="underline ml-2" type="button" onClick={props.onClick}>{props.buttonText}</button>}
        </div>
    )
}