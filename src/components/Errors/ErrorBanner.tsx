import { ExclamationCircleIcon } from "@heroicons/react/outline"

type ErrorBannerProps = {
    message: string
    dataCy?: string
}

export const ErrorBanner: React.FC<ErrorBannerProps> = (props) => {
    return (
        <div data-cy={props.dataCy} className='flex bg-background-danger-red text-danger-red border-l-2 border-danger-red py-4 mb-5'>
            <ExclamationCircleIcon className="h-6 w-6 ml-4 mr-2" />
            <p>{props.message}</p>
        </div>
    )
}