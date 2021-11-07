import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage } from "@ionic/react"
import { useParams } from "react-router"

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const { setId } = useParams<SetDetailsParams>()

    return (
        <IonPage>
            <IonHeader className="ion-no-border container my-4">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="explore" />
                </IonButtons>
            </IonHeader>
            <IonContent>
                <div className="container">
                    <p>This is the content of the page</p>
                </div>
            </IonContent>
        </IonPage>
    )
}