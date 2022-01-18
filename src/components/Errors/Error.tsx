import { Button } from '../Buttons/Button';

type ErrorProps = {
    errorType: number | string
    titleContent: string
    paragraphContent: string
    buttonContent: string
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    to?: string
    onClick?: (values: any) => void
}

export const Error: React.FC<ErrorProps> = (props) => {
    return (
        <div className="container h-full flex items-center">
            <div className="mb-20">
                <span className={`text-3xl ${props.to ? 'text-theme-default-dare' : 'text-theme-default-truth'} font-bold`}>{props.errorType}</span>
                <h1 className="text-light-500 text-3xl font-bold mb-2">{props.titleContent}</h1>
                <p className="text-light-600 mb-4">{props.paragraphContent}</p>
                <div className="md:w-44">
                    {props.to ?
                        <Button to={props.to} Icon={props.Icon} className='bg-theme-default-dare'>
                            {props.buttonContent}
                        </Button>
                        :
                        <Button type="button" Icon={props.Icon} className='bg-theme-default-truth w-full md:w-44' onClick={props.onClick ? props.onClick : () => ""}>
                            {props.buttonContent}
                        </Button>}
                </div>
            </div>
        </div>
    )
}
