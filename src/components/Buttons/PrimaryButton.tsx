import { IonRouterLink } from "@ionic/react"

export const PrimaryButton: React.FC<{
    link: string,
    content: string,
    icon: string
}> = ({ link, content, icon }) => {
    return (
        <IonRouterLink routerLink={link} className="flex justify-center items-baseline cursor-pointer bg-white rounded-lg py-4">
            <i className={`fas ${icon} text-black mr-3`}></i>
            <span className="text-black font-bold">{content}</span>
        </IonRouterLink>
    )
}
