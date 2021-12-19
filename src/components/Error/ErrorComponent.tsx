import { IonButton } from "@ionic/react"
import { arrowBack, sync } from 'ionicons/icons';
import { SecondaryButton } from "../Buttons/SecondaryButton"

type ErrorProps = {
    type: 404 | 500
}

const data = {
    404: {
        title: "Go home you're drunk",
        content: "You are too drunk for the page. Just go home dude!",
        button: "Get me back",
        icon: "faArrowBack"
    },
    500: {
        title: "Our Server drank to much",
        content: "Our Server sadly drank to much. He is unavailable right now. Try again later when he got normal again.",
        button: "Try again",
        icon: "faSync"
    }
}


export const ErrorComponent: React.FC<ErrorProps> = (props) => {
    return (
        <div className="mb-10">
            <span className={`text-3xl ${props.type === 404 ? "text-dare-green" : "text-truth-yellow"} font-bold`}>
                {props.type === 404 && 404}
                {props.type === 500 && 500}
            </span>
            <h1 className="text-3xl font-bold mb-2">
                {props.type === 404 && data[404].title}
                {props.type === 500 && data[500].title}
            </h1>
            <p className="text-lightgrey mb-4">
                {props.type === 404 && data[404].content}
                {props.type === 500 && data[500].content}
            </p>
            <div className="md:w-44">
                <SecondaryButton icon={props.type === 404 ? arrowBack : sync} color={`${props.type === 404 ? "primary" : "secondary"}`} type="button" keepFocus={false} onClick={() => ""}>
                    {props.type === 404 && data[404].button}
                    {props.type === 500 && data[500].button}
                </SecondaryButton>
            </div>
        </div>
    )
}