import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { Form, Formik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import example from '../../assets/example.png';
import arrowBack from "../../assets/icons/arrowback.svg";
import google from '../../assets/icons/google.svg';
import login from "../../assets/icons/login.svg";
import { Button } from '../../components/Buttons/Button';
import { ErrorBanner } from '../../components/Errors/ErrorBanner';
import { Input } from '../../components/Forms/Input';
import { PasswordInput } from '../../components/Forms/PasswordInput';
import { useActions, useAppState } from '../../overmind';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Register: React.FC = () => {
    const { register, resetError } = useActions().profile
    const { authenticating, error } = useAppState().profile

    const initialValues = {
        email: "",
        username: "",
        password: ""
    }

    const submitForm = (values: typeof initialValues) => {
        register(values)
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("email is required"),
        username: Yup.string().min(3, "username must be at least 3 characters long").max(24, "username cannot be longer than 24 characters").required("username is required"),
        password: Yup.string().min(8, "password must be at least 8 characters long").max(124, "password cannot be longer than 124 characters").required("password is required")
    })

    useIonViewWillEnter(() => {
        setSeoTitle('Register')
    }, [])

    useIonViewWillLeave(() => {
        resetError()
    }, [])

    return (
        <IonPage className="bg-center bg-no-repeat bg-background-black " style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 172px', backgroundPosition: 'top' }}>
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
                        <h1 className="text-3xl text-white font-bold pb-4">Create an account</h1>
                        <p className="text-lightgrey">Enter your account details below</p>
                    </div>
                </div>
                <div className='bg-background-black'>
                    <div className='container '>
                        {error && <ErrorBanner dataCy="register-error-banner" message={error} />}
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                            {(formik) => (
                                <Form>
                                    <Input dataCy="register-email-input" formik={formik} autocomplete="email" hasLabel field="email" id="register-email" type="email" placeholder="E-Mail" />
                                    <Input dataCy="register-username-input" formik={formik} autocomplete="username" hasLabel field="username" id="register-username" type="text" placeholder="Username" />
                                    <PasswordInput dataCy="register-password-input" autocomplete="new-password" hasLabel formik={formik} id="register-password" />

                                    <Button dataCy="register-button" className='w-full' keepFocus={true} loading={authenticating} onClick={() => null} icon={login} type="submit" disabled={!(formik.dirty && formik.isValid)}>Register</Button>
                                </Form>
                            )}
                        </Formik>

                        <Link data-cy="register-login-link" to="/account/login" className="block text-darkgray text-center my-4">Login insted</Link>
                        <small className="block text-darkgray text-lines text-center px-4 my-4">or</small>
                        <Button keepFocus={false} to="#" icon={google} className="mb-4">Continue with Google</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
