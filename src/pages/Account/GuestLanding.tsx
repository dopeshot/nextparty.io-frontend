import { CheckCircleIcon } from "@heroicons/react/outline";
import { IonContent, IonItem, IonLabel, IonList, IonPage, useIonViewWillEnter } from "@ionic/react";
import GoogleLogin from 'react-google-login';
import { Link } from "react-router-dom";
import example from '../../assets/example.png';
import email from '../../assets/icons/email.svg';
import google from '../../assets/icons/google.svg';
import { Button } from "../../components/Buttons/Button";
import { useActions } from "../../overmind";
import { setSeoTitle } from "../../services/utilities/setSeoTitle";

export const GuestLanding: React.FC = () => {
    useIonViewWillEnter(() => {
        setSeoTitle('Account')
    }, [])


    const { loginWithGoogle } = useActions().profile
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

                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={loginWithGoogle}
                        onFailure={loginWithGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => <Button icon={google} onClick={renderProps.onClick} disabled={renderProps.disabled} className="mb-4 w-full">Continue with Google</Button>}
                    />

                    <Button dataCy="guestlanding-signup-button" to="/account/register" icon={email} className="bg-dare-green mb-6">Sign up with E-Mail</Button>

                    <Link data-cy="guestlanding-login-link" className="block text-darkgray text-center" to="/account/login">Login instead</Link>
                </div>

            </IonContent>
        </IonPage>
    )
}