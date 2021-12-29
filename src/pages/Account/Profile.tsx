import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import example from '../../assets/example.png';
import { setSeoTitle } from "../../services/utilities/setSeoTitle";

export const Profile: React.FC = () => {
    useIonViewWillEnter(() => {
        setSeoTitle('Profile')
    }, [])

    return (
        <IonPage className="bg-background-black">
            <IonContent>
                <div className="ion-no-border bg-cover mb-4" style={{ backgroundImage: `url(${example})` }}>
                    <div className="bg-gradient-to-t from-background-black w-full h-full">
                        <div className="container flex flex-col items-center text-center">
                            <h1 className="text-xl text-white font-bold pt-20 pb-4">Profile</h1>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}