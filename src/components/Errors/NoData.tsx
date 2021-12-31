import plus from '../../assets/icons/plus.svg';
import { Button } from "../Buttons/Button";

type NoDataProps = {
    headline: string
    text: string
    onClick: () => void
    dataCy?: string
}

export const NoData: React.FC<NoDataProps> = (props) => {
    return (
        <div data-cy={props.dataCy} className="flex flex-col items-center text-center pt-5 md:pt-20">
            <h3 className="text-2xl text-white font-bold pb-1">{props.headline}</h3>
            <p className="text-lightgrey pb-5">{props.text}</p>
            <Button keepFocus={false} type="button" onClick={props.onClick} icon={plus} className="w-full md:w-40 px-7">New</Button>
        </div>
    )
}