import { LoginIcon } from '@heroicons/react/outline';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { Form, Formik } from "formik";
import { useHistory } from 'react-router';
import * as Yup from "yup";
import arrowBack from "../../assets/icons/arrowback.svg";
import { Button } from '../../components/Buttons/Button';
import { GoogleLoginButton } from '../../components/Buttons/GoogleLoginButton';
import { ErrorBanner } from '../../components/Errors/ErrorBanner';
import { Input } from '../../components/Forms/Input';
import { PasswordInput } from '../../components/Forms/PasswordInput';
import { useActions, useAppState } from '../../overmind';
import { setSeoTitle } from '../../services/Utilities';
import { getFrontendOrigin } from '../../services/utilities/getFrontendOrigin';

export const Login: React.FC = () => {
    const { login, resetError } = useActions().profile
    const { profile: { authenticating, error }, game: { set } } = useAppState()
    const history = useHistory()

    const initialValues = {
        email: "",
        password: ""
    }

    const submitForm = async (values: typeof initialValues) => {
        await login(values)
        history.replace('/account/profile')
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("email is required"),
        password: Yup.string().required("password is required")
    })

    useIonViewWillEnter(() => {
        setSeoTitle('Login')
    }, [])

    useIonViewWillLeave(() => {
        resetError()
    }, [])

    return (
        <IonPage className="bg-center bg-no-repeat bg-dark-700" style={{ backgroundPosition: "top", backgroundSize: "100% 172px", backgroundImage: set ? `url('${getFrontendOrigin}/assets/themes/${set.category}.svg')` : `url('${getFrontendOrigin}/assets/themes/default.svg')` }}>
            <IonHeader className="container ion-no-border my-1">
                <IonToolbar color="transparent">
                    <IonButtons>
                        <IonBackButton className="text-light-500" icon={arrowBack} defaultHref="/account" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
                <div className='pb-10 bg-gradient-to-t from-dark-700'>
                    <div className="container flex flex-col items-center">
                        <h1 className="text-3xl text-light-500 font-bold pb-4">Welcome back!</h1>
                        <p className="text-light-600">Enter your account details below</p>
                    </div>
                </div>
                <div className='bg-dark-700'>
                    <div className='container '>
                        {error && <ErrorBanner dataCy="login-error-banner" message={error} />}
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                            {(formik) => (
                                <Form>
                                    <Input dataCy="login-email-input" formik={formik} field="email" hasLabel autocomplete="email" id="login-email" type="email" placeholder="E-Mail" />
                                    <PasswordInput dataCy="login-password-input" formik={formik} hasLabel autocomplete="current-password" id="login-password" />

                                    <Button dataCy="login-button" className="w-full" loading={authenticating} onClick={() => null} Icon={LoginIcon} type="submit" disabled={!(formik.dirty && formik.isValid)}>Login</Button>
                                </Form>
                            )}
                        </Formik>

                        <small className="block text-light-600 text-lines text-center px-4 my-4">or</small>
                        <GoogleLoginButton />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
