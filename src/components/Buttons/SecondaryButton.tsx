import { IonButton, IonIcon } from "@ionic/react"
import React from "react"

type SecondaryButtonProps = {
    icon: string
    type: "submit" | "reset" | "button" | undefined
    color: string
    onClick: () => void
    keepFocus: boolean
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
    const handleMouseDown = (event: React.MouseEvent) => {
        if (props.keepFocus) {
            event.preventDefault()
            event.stopPropagation()
        }
        props.onClick()
    }

    return (
        <IonButton mode="md" type={props.type} color={props.color} className="rounded-lg capitalize font-bold text-base h-12 m-0" onMouseDown={(event: React.MouseEvent) => handleMouseDown(event)} expand="block">
            <IonIcon slot="start" icon={props.icon} />
            {props.children}
        </IonButton>
    )
}