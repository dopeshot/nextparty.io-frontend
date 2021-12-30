import { CheckCircleIcon } from "@heroicons/react/outline";
import { IonContent, IonItem, IonLabel, IonList, IonPage, useIonViewWillEnter } from "@ionic/react";
import { Link } from "react-router-dom";
import example from '../../assets/example.png';
import email from '../../assets/icons/email.svg';
import google from '../../assets/icons/google.svg';
import { Button } from "../../components/Buttons/Button";
import { setSeoTitle } from "../../services/utilities/setSeoTitle";

export const NotLoggedInProfile: React.FC = () => {
    useIonViewWillEnter(() => {
        setSeoTitle('Account')
    }, [])

    return (
        <IonPage className="bg-background-black">
            <IonContent>
                <div className="ion-no-border bg-cover mb-4" style={{ backgroundImage: `url(${example})` }}>
                    <div className="bg-gradient-to-t from-background-black w-full h-full">
                        <div className="container flex flex-col items-center text-center">
                            <h1 className="text-xl text-white font-bold pt-20 pb-4">Create your own questions</h1>
                            <p className="text-lightgrey">Make the next party with your friends <br /> for the evening of the evenings!</p>
                        </div>
                    </div>
                </div>
                <div className="container mb-4">
                    <IonList className="mb-5" lines="none">
                        <IonItem>
                            <CheckCircleIcon className="w-6 h-6 mr-4" />
                            <IonLabel>Create own sets</IonLabel>
                        </IonItem>
                        <IonItem>
                            <CheckCircleIcon className="w-6 h-6 mr-4" />
                            <IonLabel>Share with your friends</IonLabel>
                        </IonItem>
                        <IonItem>
                            <CheckCircleIcon className="w-6 h-6 mr-4" />
                            <IonLabel>We only ask for your email</IonLabel>
                        </IonItem>
                        <IonItem>
                            <CheckCircleIcon className="w-6 h-6 mr-4" />
                            <IonLabel>Free (No cost never)</IonLabel>
                        </IonItem>
                    </IonList>

                    <Button keepFocus={false} to="#" icon={google} className="mb-4">Continue with Google</Button>
                    <Button keepFocus={true} to="/account/register" icon={email} className="bg-dare-green mb-6">Sign up with E-Mail</Button>

                    <Link className="block text-darkgray text-center" to="/account/login">Login instead</Link>
                </div>
            </IonContent>
        </IonPage>
    )
}