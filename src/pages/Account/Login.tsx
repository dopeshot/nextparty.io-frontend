import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { Form, Formik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import example from '../../assets/example.png';
import arrowBack from "../../assets/icons/arrowback.svg";
import loginicon from "../../assets/icons/login.svg";
import { Button } from '../../components/Buttons/Button';
import { ErrorBanner } from '../../components/Errors/ErrorBanner';
import { Input } from '../../components/Forms/Input';
import { PasswordInput } from '../../components/Forms/PasswordInput';
import { useActions, useAppState } from '../../overmind';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Login: React.FC = () => {
    const { login, resetError } = useActions().profile
    const { authenticating, error } = useAppState().profile

    const initialValues = {
        email: "",
        password: ""
    }

    const submitForm = (values: typeof initialValues) => {
        login(values)
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
        <IonPage className="bg-center bg-no-repeat bg-background-black" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 172px', backgroundPosition: 'top' }}>
            <IonHeader className="container ion-no-border my-1">
                <IonToolbar color="transparent">
                    <IonButtons>
                        <IonBackButton className="text-white" icon={arrowBack} defaultHref="/account" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
                <div className='pb-10 bg-gradient-to-t from-background-black'>
                    <div className="container flex flex-col items-center">
                        <h1 className="text-3xl text-white font-bold pb-4">Welcome back!</h1>
                        <p className="text-lightgrey">Enter your account details below</p>
                    </div>
                </div>
                <div className='bg-background-black'>
                    <div className='container '>
                        {error && <ErrorBanner color="danger" dataCy="login-error-banner" message={error} />}
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                            {(formik) => (
                                <Form>
                                    <Input dataCy="login-email-input" formik={formik} field="email" hasLabel autocomplete="email" id="login-email" type="email" placeholder="E-Mail" />
                                    <PasswordInput dataCy="login-password-input" formik={formik} hasLabel autocomplete="current-password" id="login-password" />

                                    <Button dataCy="login-button" className="w-full" keepFocus={true} loading={authenticating} onClick={() => null} icon={loginicon} type="submit" disabled={!(formik.dirty && formik.isValid)}>Login</Button>
                                </Form>
                            )}
                        </Formik>

                        <Link to="#" className="block text-darkgray text-center my-4">Forgot your Password?</Link>
                        {/* { <small className="block text-darkgray text-lines text-center px-4 my-4">or</small>
                        <Button keepFocus={true} to="#" icon={google} className="w-full mb-4">Continue with Google</Button> } */}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
