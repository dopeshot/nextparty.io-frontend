import { Button } from '../Buttons/Button';

type EmailVerifyComponentProps = {
    type: string
    titleContent: string
    paragraphContent: string
    buttonContent: string
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    to: string
    onClick?: (values: any) => void
}

export const EmailVerifyComponent: React.FC<EmailVerifyComponentProps> = (props) => {
    return (
        <div className="container h-full flex items-center">
            <div className="mb-20">
                <span className={`text-3xl text-theme-default-dare font-bold`}>{props.type}</span>
                <h1 className="text-light-500 text-3xl font-bold mb-2">{props.titleContent}</h1>
                <p className="text-light-600 mb-4">{props.paragraphContent}</p>
                <div className="md:w-44">
                    <Button to={props.to} Icon={props.Icon}>
                        {props.buttonContent}
                    </Button>
                </div>
            </div>
        </div>
    )
}
