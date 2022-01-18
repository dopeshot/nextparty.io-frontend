import { RefreshIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import { ButtonProps } from "./Button"

export const SecondaryButton: React.FC<ButtonProps> = (props) => {
    const handleMouseDown = (event: React.MouseEvent) => {
        if ('to' in props || !props.keepFocus)
            return

        if (props.keepFocus) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    return (
        <>
            {'to' in props ?
                <Link data-cy={props.dataCy} aria-disabled={props.disabled} to={props.disabled ? "#" : props.to} className={`flex justify-center items-center text-light-500 border border-light-500 border-solid ${props.disabled ? "cursor-default" : "transition hover:-translate-y-1 cursor-pointer"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
                    {props.Icon && <props.Icon className="w-5 h-5 mr-3" />}
                    <span className="font-bold">{props.children}</span>
                </Link> :
                <button data-cy={props.dataCy} type={props.type ?? "button"} disabled={props.disabled ? true : false} onClick={props.disabled ? () => null : props.onClick} onMouseDown={(event: React.MouseEvent) => handleMouseDown(event)} className={`flex justify-center items-center text-light-500 border border-light-500 border-solid ${props.disabled ? "cursor-default bg-opacity-75 text-opacity-75" : "transition hover:-translate-y-1 cursor-pointer"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
                    {props.Icon && (props.loading ? <RefreshIcon className="animate-spin w-5 h-5 mr-3" /> : <props.Icon className="w-5 h-5 mr-3" />)}
                    <span className="text-light-500 font-bold">{props.children}</span>
                </button>}
        </>
    )
}
