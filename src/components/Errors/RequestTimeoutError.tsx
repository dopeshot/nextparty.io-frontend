import { RefreshIcon } from '@heroicons/react/outline';
import { Error } from './Error';

type InternalServerErrorProps = {
    onClick: () => void
}

const data = {
    title: "Request Timeout",
    content: "Our Server sadly drank to much. He is unavailable right now. Try again later when he got normal again.",
    button: "Try again"
}

export const RequestTimeoutError: React.FC<InternalServerErrorProps> = (props) => {
    return <Error errorType={408} titleContent={data.title} paragraphContent={data.content} buttonContent={data.button} Icon={RefreshIcon} onClick={props.onClick} />
}