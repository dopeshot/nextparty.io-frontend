import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { Form, Formik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import example from '../../assets/example.png';
import arrowBack from "../../assets/icons/arrowback.svg";
import google from '../../assets/icons/google.svg';
import login from "../../assets/icons/login.svg";
import { Button } from '../../components/Buttons/Button';
import { Input } from '../../components/Forms/Input';
import { PasswordInput } from '../../components/Forms/PasswordInput';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Register: React.FC = () => {
    const initialValues = {
        email: "",
        username: "",
        password: ""
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("email is required"),
        username: Yup.string().min(3, "username must be at least 3 characters long").max(20, "username cannot be longer than 20 characters").required("username is required"),
        password: Yup.string().min(8, "password must be at least 8 characters long").max(32, "password cannot be longer than 32 characters").required("password is required")
    })

    useIonViewWillEnter(() => {
        setSeoTitle('Register')
    }, [])

    return (
        <IonPage className="bg-center bg-no-repeat" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100%', backgroundPosition: 'top' }}>
            <IonHeader className="container ion-no-border my-1">
                <IonToolbar color="transparent">
                    <IonButtons>
                        <IonBackButton className="text-white" icon={arrowBack} defaultHref="/explore" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
                <div className="bg-gradient-to-t from-background-black via-background-black h-32 xxs:h-56 xs:h-full">
                    <div className="container flex flex-col items-center mb-10">
                        <h1 className="text-3xl text-white font-bold pb-4">Create an account</h1>
                        <p className="text-lightgrey">Enter your account details below</p>
                    </div>

                    <div className='container'>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                            {(formik) => (
                                <Form>
                                    <Input formik={formik} field="email" id="register-email" type="email" placeholder="E-Mail" />
                                    <Input formik={formik} field="username" id="register-username" type="text" placeholder="Username" />
                                    <PasswordInput formik={formik} id="register-password" />

                                    <Button onClick={() => null} icon={login} type="submit" disabled={!(formik.dirty && formik.isValid)}>Register</Button>
                                </Form>
                            )}
                        </Formik>

                        <Link to="/account/login" className="block text-darkgray text-center my-4">Login insted</Link>
                        <small className="block text-darkgray text-lines text-center px-4 my-4">or</small>
                        <Button to="#" icon={google} className="mb-4">Continue with Google</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
