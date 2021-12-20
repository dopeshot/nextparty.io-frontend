import { IonRouterLink } from "@ionic/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"

type SecondaryButtonProps = {
    icon: IconProp
    className?: string
    link: string
}

export const PrimaryButton: React.FC<SecondaryButtonProps> = (props) => {
    return (
        <IonRouterLink routerLink={props.link} className={`flex justify-center items-baseline cursor-pointer ${props.className} rounded-lg py-4`}>
            <FontAwesomeIcon icon={props.icon} className="text-black mr-3" />
            <span className="text-black font-bold">{props.children}</span>
        </IonRouterLink>
    )
}
