import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { peopleSharp, sync } from 'ionicons/icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ErrorProps = {
    errorType: number
    titleContent: string
    paragraphContent: string
    buttonContent: string
    icon: IconProp
    link?: string
    onClick?: () => void
}

export const Error: React.FC<ErrorProps> = (props) => {
    return (
        <IonPage>
            <IonHeader className="container ion-no-border my-4">
            </IonHeader>
            <IonContent>
                <div className="container h-full flex items-center">
                    <div className="mb-10">
                        <span className={`text-3xl ${props.link ? 'text-dare-green' : 'text-truth-yellow'} font-bold`}>{props.errorType}</span>
                        <h1 className="text-3xl font-bold mb-2">{props.titleContent}</h1>
                        <p className="text-lightgrey mb-4">{props.paragraphContent}</p>
                        <div className="md:w-44">
                            {props.link ?
                                <PrimaryButton link='/explore' icon={props.icon} className="bg-dare-green" type="button">
                                    {props.buttonContent}
                                </PrimaryButton>
                                :
                                <SecondaryButton icon={props.icon} type='button' color='secondary' keepFocus={false} onClick={props.onClick ? props.onClick : () => ""}>
                                    {props.buttonContent}
                                </SecondaryButton>}
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
