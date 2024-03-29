import { CheckCircleIcon, MailIcon } from "@heroicons/react/outline";
import { IonContent, IonItem, IonLabel, IonList, IonPage, useIonViewWillEnter } from "@ionic/react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Buttons/Button";
import { GoogleLoginButton } from "../../components/Buttons/GoogleLoginButton";
import { useAppState } from "../../overmind";
import { setSeoTitle } from "../../services/Utilities";
import { getFrontendOrigin } from "../../services/utilities/getFrontendOrigin";

export const GuestLanding: React.FC = () => {
    useIonViewWillEnter(() => {
        setSeoTitle('Account')
    }, [])

    const { set } = useAppState().game

    return (
        <IonPage className="bg-dark-700">
            <IonContent>
                <div className="ion-no-border bg-cover mb-4" style={{ backgroundSize: "100% 204px", backgroundImage: set ? `url('${getFrontendOrigin}/assets/themes/${set.category}.svg')` : `url('${getFrontendOrigin}/assets/themes/default.svg')` }}>
                    <div className="bg-gradient-to-t from-dark-700 w-full h-full">
                        <div className="container flex flex-col items-center text-center">
                            <h1 className="text-xl text-light-500 font-bold pt-20 pb-4">Create your own questions</h1>
                            <p className="text-light-600">Make the next party with your friends <br /> for the evening of the evenings!</p>
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

                    <GoogleLoginButton />
                    <Button dataCy="guestlanding-signup-button" to="/account/register" Icon={MailIcon} className="mb-6">Sign up with E-Mail</Button>
                    <Link data-cy="guestlanding-login-link" className="block text-light-600 text-center" to="/account/login">Login instead</Link>
                </div>

            </IonContent>
        </IonPage>
    )
}