import { ExclamationCircleIcon } from "@heroicons/react/outline"

type ErrorBannerProps = {
    message: string
    dataCy?: string
    buttonText?: string
}

export const ErrorBanner: React.FC<ErrorBannerProps> = (props) => {
    return (
        <div data-cy={props.dataCy} className={`flex bg-red-700 text-red-500 border-l-2 border-red-500 py-4 mb-5`}>
            <ExclamationCircleIcon className="h-6 w-6 ml-4 mr-2" />
            <p>{props.message}</p>
        </div>
    )
}