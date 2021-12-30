
type CountItemProps = {
    name: string
    number: number
}

export const CountItem: React.FC<CountItemProps> = (props) => {
    return (
        <div className="text-center">
            <p className="font-semibold">{props.number}</p>
            <p>{props.name}</p>
        </div>
    )
}


