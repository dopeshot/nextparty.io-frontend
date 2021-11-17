import { IonButton, IonIcon } from "@ionic/react"

export const SecondaryButton: React.FC<{
    onClick: () => void,
    content: string,
    icon: string
}> = ({ onClick, content, icon }) => {
    return (
        <IonButton className="m-0 h-12 rounded-lg text-black capitalize font-bold text-base" onClick={onClick} expand="block"><IonIcon slot="start" icon={icon} />{content}</IonButton>
    )
}