import { IonButton, IonIcon } from "@ionic/react";

type IconButtonProps = {
    icon: string,
    onClick: (values: any) => void
    dataCy?: string
    className?: string,
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <IonButton data-cy={props.dataCy} className={`border-4 border-dark-800 rounded-full no-ripple ${props.className}`} onClick={props.onClick} style={{ minWidth: "44px", minHeight: "44px" }}>
            <IonIcon icon={props.icon} className="text-dark-800 text-xl" />
        </IonButton>
    )
}