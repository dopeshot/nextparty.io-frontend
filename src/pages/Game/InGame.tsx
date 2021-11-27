import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

export const InGame: React.FC = () => {

    return (
        <IonPage className="bg-background-black">
            <IonHeader className="ion-no-border container">
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton className="text-white" defaultHref="/game" />
                    </IonButtons>
                    <IonTitle>Ingame Dev</IonTitle>
                </ IonToolbar>
            </IonHeader>
        </IonPage>
    )
}
