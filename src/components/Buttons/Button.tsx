import { IonIcon } from "@ionic/react"
import { Link } from "react-router-dom"

type BaseButtonProps = {
    icon?: string
    className?: string
    disabled?: boolean
    dataCy?: string
}

type LinkButtonProps = {
    to: string
} & BaseButtonProps

type ButtonButtonProps = {
    type?: "button" | "reset" | "submit"
    onClick: (values: any) => void
} & BaseButtonProps

type ButtonProps = LinkButtonProps | ButtonButtonProps

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <>
            {'to' in props ?
                <Link data-cy={props.dataCy} aria-disabled={props.disabled} to={props.disabled ? "#" : props.to} className={`flex justify-center items-center group text-black ${props.disabled ? "cursor-default bg-dare-green opacity-30" : "bg-white hover:bg-hover-green cursor-pointer focus:shadow-focus"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
                    {props.icon && <IonIcon src={props.icon} className={`${props.disabled ? "" : "group-hover:text-dare-green"} w-5 h-5 mr-3`} />}
                    <span className="font-bold">{props.children}</span>
                </Link> :
                <button data-cy={props.dataCy} type={props.type ?? "button"} disabled={props.disabled ? true : false} onClick={props.disabled ? () => null : props.onClick} className={`flex justify-center items-center group text-black ${props.disabled ? "cursor-default bg-dare-green opacity-30" : "bg-white hover:bg-hover-green focus:shadow-focus"} rounded-lg w-full py-3 ${props.className ? props.className : ""}`}>
                    {props.icon && <IonIcon src={props.icon} className={`${props.disabled ? "" : "group-hover:text-dare-green"} w-5 h-5 mr-3`} />}
                    <span className="text-black font-bold">{props.children}</span>
                </button>}
        </>
    )
}
