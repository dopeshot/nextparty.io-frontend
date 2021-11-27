import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonButton } from "@ionic/react";

type IconButtonProps = {
    icon: IconProp,
    bgColor: string,
    onClick: (values: any) => void
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <IonButton className={`${props.bgColor} border-4 border-background-black rounded-full no-ripple`} onClick={props.onClick} style={{ minWidth: "38px", minHeight: "38px"}}>
            <FontAwesomeIcon className="text-background-black text-lg" icon={props.icon} />
        </IonButton>
    )
}