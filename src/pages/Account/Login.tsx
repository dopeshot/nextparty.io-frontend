import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import example from '../../assets/example.png';
import arrowBack from "../../assets/icons/arrowback.svg";
import google from '../../assets/icons/google.svg';
import login from "../../assets/icons/login.svg";
import { Button } from '../../components/Buttons/Button';
import { setSeoTitle } from '../../services/utilities/setSeoTitle';

export const Login: React.FC = () => {
    const initialValues = {
        email: "",
        password: ""
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("email is required"),
        password: Yup.string().required("password is required")
    })

    useIonViewWillEnter(() => {
        setSeoTitle('Login')
    }, [])

    return (
        <IonPage className="bg-center bg-no-repeat" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100%', backgroundPosition: 'top' }}>
            <IonHeader className="container ion-no-border my-4">
                <IonToolbar color="transparent">
                    <IonButtons>
                        <IonBackButton className="text-white" icon={arrowBack} defaultHref="/explore" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ "--background": "transparent" }}>
                <div className="bg-gradient-to-t from-background-black via-background-black h-32 xxs:h-56 xs:h-full">
                    <div className="container flex flex-col items-center mb-14">
                        <h1 className="text-3xl text-white font-bold pb-4">Welcome back!</h1>
                        <p className="text-lightgrey">Enter your account details below</p>
                    </div>

                    <div className='container'>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                            {(formik) => (
                                <Form>
                                    <div className="flex flex-col mb-4">
                                        <Field type="email" name="email" id="email" placeholder="E-Mail" className={`rounded pl-4 py-3 ${formik.errors.email && formik.touched.email ? "border-2 border-red-400 focus:outline-none mb-2" : ""}`} />
                                        <ErrorMessage name="email" component="span">
                                            {errorMessage => <div className="flex items-center text-red-400">
                                                <ExclamationCircleIcon className="h-6 w-6 mr-2" />
                                                <span className="text-sm font-semibold">{errorMessage}</span>
                                            </div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className="flex flex-col mb-6">
                                        <Field type="password" name="password" id="password" placeholder="Password" className={`rounded pl-4 py-3 ${formik.errors.password && formik.touched.password ? "border-2 border-red-400 focus:outline-none mb-2" : ""}`} />
                                        <ErrorMessage name="password" component="span">
                                            {errorMessage => <div className="flex items-center text-red-400">
                                                <ExclamationCircleIcon className="h-6 w-6 mr-2" />
                                                <span className="text-sm font-semibold">{errorMessage}</span>
                                            </div>}
                                        </ErrorMessage>
                                    </div>
                                    <Button onClick={() => null} icon={login} type="submit" disabled={!(formik.dirty && formik.isValid)}>Login</Button>
                                </Form>
                            )}
                        </Formik>

                        <Link to="#" className="block text-darkgray text-center my-4">Forgot your Password?</Link>
                        <small className="block text-darkgray text-lines text-center px-4 my-4">or</small>
                        <Button to="#" icon={google} className="mb-4">Continue with Google</Button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
