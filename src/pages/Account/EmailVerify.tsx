import { IonContent, IonHeader, IonPage, IonProgressBar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useParams } from 'react-router';
import { Error } from '../../components/Errors/Error';
import { useActions, useAppState } from '../../overmind';

type EmailVerifyParams = {
    code: string
}

export const EmailVerify: React.FC = () => {
    const { code } = useParams<EmailVerifyParams>()

    const { verifyMail } = useActions().profile
    const { emailVerified, isEmailVerifying } = useAppState().profile

    useIonViewWillEnter(() => {
        verifyMail(code)
    }, [])

    return (
        <IonPage className="bg-background-black">
            <IonHeader className="container ion-no-border my-4">
                <IonToolbar color="transparent">
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {isEmailVerifying ? <IonProgressBar data-cy="email-verify-progress-bar" type="indeterminate" /> :
                    <>
                        {emailVerified ?
                            <Error to="/" buttonContent="Start" errorType="Success" titleContent="Email Verified!" paragraphContent="Your Email was successfull verified login to start creating awesome sets." /> :
                            <Error to="/account/login" buttonContent="Login" errorType="Failed" titleContent="Email verification link has expired." paragraphContent="Try to login and send email again." />}
                    </>
                }
            </IonContent>
        </IonPage >
    )
}
