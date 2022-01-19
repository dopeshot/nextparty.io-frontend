
type SecondaryButtonProps = {
    disabled?: boolean,
    onClick: (values: any) => void
    dataCy?: string
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
    return (
        <button type="button" disabled={props.disabled} onClick={() => props.onClick} className={`flex justify-center items-center text-light-500 border border-light-500 border-solid ${props.disabled ? "border-opacity-40" : "transition hover:-translate-y-1 cursor-pointer"} rounded-lg py-3 mb-8 w-full`}>
            <span className={`text-light-500 font-bold" ${props.disabled ? "opacity-40" : ""}`}>{props.children}</span>
        </button>
    )
}