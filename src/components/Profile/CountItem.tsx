
type CountItemProps = {
    name: string
    number: number
    id: string
}

export const CountItem: React.FC<CountItemProps> = (props) => {
    return (
        <div className="text-center">
            <p id={props.id} className="font-semibold count-number">{props.number}</p>
            <p>{props.name}</p>
        </div>
    )
}


