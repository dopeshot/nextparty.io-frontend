import { IonContent, IonHeader, IonPage, IonProgressBar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { EmailVerifyComponent } from '../../components/Profile/EmailVerifyComponent';
import { useActions, useAppState } from '../../overmind';


interface EmailVerifyParams extends RouteComponentProps<{
    code: string;
}> { }

export const EmailVerify: React.FC<EmailVerifyParams> = ({ match: { params: { code } } }) => {
    const { verifyMail } = useActions().profile
    const { emailVerified, isEmailVerifying } = useAppState().profile

    useIonViewWillEnter(() => {
        verifyMail(code)
    }, [])

    return (
        <IonPage className="bg-dark-700">
            <IonHeader className="container ion-no-border my-4">
                <IonToolbar color="transparent">
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {isEmailVerifying ? <IonProgressBar data-cy="email-verify-progress-bar" type="indeterminate" /> :
                    <>
                        {emailVerified ?
                            <EmailVerifyComponent to="/account" buttonContent="Start" type="Success" titleContent="Email Verified!" paragraphContent="Your Email was successfull verified login to start creating awesome sets." /> :
                            <EmailVerifyComponent to="/account/login" buttonContent="Login" type="Failed" titleContent="Email verification link has expired." paragraphContent="Try to login and send email again." />}
                    </>
                }
            </IonContent>
        </IonPage >
    )
}
