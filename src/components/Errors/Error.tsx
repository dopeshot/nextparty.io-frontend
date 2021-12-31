import { Button } from '../Buttons/Button';

type ErrorProps = {
    errorType: number
    titleContent: string
    paragraphContent: string
    buttonContent: string
    icon: string
    link?: string
    onClick?: (values: any) => void
}

export const Error: React.FC<ErrorProps> = (props) => {
    return (
        <div className="container h-full flex items-center">
            <div className="mb-10">
                <span className={`text-3xl ${props.link ? 'text-dare-green' : 'text-truth-yellow'} font-bold`}>{props.errorType}</span>
                <h1 className="text-3xl font-bold mb-2">{props.titleContent}</h1>
                <p className="text-lightgrey mb-4">{props.paragraphContent}</p>
                <div className="md:w-44">
                    {props.link ?
                        <Button to={props.link} />
                        :
                        props.onClick && <Button keepFocus={false} onClick={props.onClick} />}
                    {/* {props.link ?
                        <PrimaryButton link={props.link} icon={props.icon} className="bg-dare-green">
                            {props.buttonContent}
                        </PrimaryButton>
                        :
                        <SecondaryButton icon={props.icon} type='button' color='secondary' keepFocus={false} onClick={props.onClick ? props.onClick : () => ""}>
                            {props.buttonContent}
                        </SecondaryButton>} */}
                </div>
            </div>
        </div>
    )
}
