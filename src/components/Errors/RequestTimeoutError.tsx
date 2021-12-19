import { faSync } from '@fortawesome/free-solid-svg-icons';
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
    return <Error errorType={408} titleContent={data.title} paragraphContent={data.content} buttonContent={data.button} icon={faSync} onClick={props.onClick} />
}
