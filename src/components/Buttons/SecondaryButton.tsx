import { IonButton, IonIcon } from "@ionic/react"

export const SecondaryButton: React.FC<{
    onClick: () => void,
    content: string,
    icon: string,
    keepFocus: boolean
}> = ({ onClick, content, icon, keepFocus }) => {
    return (
        <IonButton className="m-0 h-12 rounded-lg text-black capitalize font-bold text-base" onMouseDown={(e) => {
            if (keepFocus) {
                e.preventDefault()
                e.stopPropagation()
            }
            onClick()
        }} expand="block"><IonIcon slot="start" icon={icon} />{content}</IonButton>
    )
}