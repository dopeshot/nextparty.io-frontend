import { RefreshIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

export type BaseButtonProps = {
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    className?: string
    disabled?: boolean
    dataCy?: string
}

export type LinkButtonProps = {
    to: string
} & BaseButtonProps

export type ButtonButtonProps = {
    type?: "button" | "reset" | "submit"
    onClick: (values: any) => void
    keepFocus?: boolean
    loading?: boolean
} & BaseButtonProps

export type ButtonProps = LinkButtonProps | ButtonButtonProps

export const Button: React.FC<ButtonProps> = (props) => {
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
                <Link data-cy={props.dataCy} aria-disabled={props.disabled} to={props.disabled ? "#" : props.to} className={`flex justify-center items-center text-dark-800 ${props.disabled ? "cursor-default bg-light-700" : "bg-light-500 transition hover:-translate-y-1 cursor-pointer focus:shadow-focus"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
                    {props.Icon && <props.Icon className="w-5 h-5 mr-3" />}
                    <span className="font-bold">{props.children}</span>
                </Link> :
                <button data-cy={props.dataCy} type={props.type ?? "button"} disabled={props.disabled ? true : false} onClick={props.disabled ? () => null : props.onClick} onMouseDown={(event: React.MouseEvent) => handleMouseDown(event)} className={`flex justify-center items-center text-dark-800 ${props.disabled ? "cursor-default bg-light-700" : "bg-light-500 transition hover:-translate-y-1 cursor-pointer focus:shadow-focus"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
                    {props.Icon && (props.loading ? <RefreshIcon className="animate-spin w-5 h-5 mr-3" /> : <props.Icon className="w-5 h-5 mr-3" />)}
                    <span className="text-dark-800 font-bold">{props.children}</span>
                </button>}
        </>
    )
}
