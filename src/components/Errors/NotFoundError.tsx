import { Error } from './Error';

type NotFoundErrorProps = {
    link: string
}

const data = {
    title: "Go home you're drunk",
    content: "You are too drunk for the page. Just go home dude!",
    button: "Get me home"
}

export const NotFoundError: React.FC<NotFoundErrorProps> = (props) => {
    return <Error errorType={404} titleContent={data.title} paragraphContent={data.content} buttonContent={data.button} icon="fa" to={props.link} />
}