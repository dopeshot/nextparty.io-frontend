import { PlusIcon } from '@heroicons/react/outline';
import { Button } from "../Buttons/Button";

type NoDataProps = {
    headline: string
    text: string
    onClick: () => void
    dataCy?: string
    buttonText: string
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const NoData: React.FC<NoDataProps> = (props) => {
    return (
        <div data-cy={props.dataCy} className="flex flex-col items-center text-center">
            <h3 className="text-2xl text-white font-bold pb-1">{props.headline}</h3>
            <p className="text-lightgrey pb-5">{props.text}</p>
            <Button type="button" onClick={props.onClick} Icon={props.Icon} className="w-full md:w-40 px-7">{props.buttonText}</Button>
        </div>
    )
}