import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"

type ButtonProps = {
    icon?: IconProp
    className?: string
    to?: string
    type?: "button" | "reset" | "submit"
    onClick?: (values: any) => void
    disabled?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <>
            {props.to ?
                <Link to={props.disabled ? "#" : props.to} className={`flex justify-center items-center group text-black ${props.disabled ? "cursor-default bg-dare-green opacity-30" : "bg-white hover:bg-hover-green cursor-pointer focus:shadow-focus"} ${props.className} rounded-lg py-4`}>
                    {props.icon && <FontAwesomeIcon icon={props.icon} className={`${props.disabled ? "" : "group-hover:text-dare-green"} mr-3`} />}
                    <span className="font-bold">{props.children}</span>
                </Link> :
                <button type={props.type ? props.type : "button"} onClick={props.disabled ? () => "" : props.onClick} className={`flex justify-center items-center group text-black ${props.disabled ? "cursor-default bg-dare-green opacity-30" : "bg-white hover:bg-hover-green focus:shadow-focus"} ${props.className} rounded-lg w-full py-4`}>
                    {props.icon && <FontAwesomeIcon icon={props.icon} className={`${props.disabled ? "" : "group-hover:text-dare-green"} mr-3`} />}
                    <span className="text-black font-bold">{props.children}</span>
                </button>}
        </>
    )
}
