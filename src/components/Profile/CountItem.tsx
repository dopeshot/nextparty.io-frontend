// @ts-ignore //no type package
import AnimatedNumber from "animated-number-react";

type CountItemProps = {
    name: string
    number: number
}

export const CountItem: React.FC<CountItemProps> = (props) => {
    const animationDuration = 500

    return (
        <div className="text-center">
            <AnimatedNumber className="font-semibold" value={props.number} formatValue={(value: number) => value.toFixed(0)} duration={animationDuration} />
            <p className="text-light-500">{props.name}</p>
        </div>
    )
}


