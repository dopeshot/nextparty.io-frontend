import { PencilIcon } from "@heroicons/react/outline";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Button } from "../../components/Buttons/Button";
import { Input } from "../../components/Forms/Input";
import { categories, categoriesList, ForegroundColor, SetCategory } from "../../overmind/creative/types/categories";

export const Editor: React.FC = () => {
    const initialValues = {
        name: "",
        background: ""
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values)
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(32).required(),
        background: Yup.string().required()
    })
    const [showThemePicker, setShowThemePicker] = useState(false);

    return <IonPage>
        <IonContent>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>{(formik) =>
                    <Form>
                        {/** Background picker */}
                        <button type="button" onClick={() => setShowThemePicker(true)}
                            className={`${categories[formik.values.background as SetCategory]?.background} rounded-lg h-24 w-full flex justify-center items-center`}>
                            <PencilIcon className={`${categories[formik.values.background as SetCategory]?.foreground === ForegroundColor.DARK ? `text-black` : `text-white`} h-6`} />
                        </button>

                        <IonModal onWillDismiss={() => setShowThemePicker(false)} isOpen={showThemePicker} cssClass="my-custom-class">
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle>Choose Theme</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton onClick={() => setShowThemePicker(false)}>Close</IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>

                            <IonContent>
                                <div className="container mt-4">
                                    {
                                        categoriesList.map(category => <label key={category.name} className={`rounded-lg h-24 w-full flex items-center mb-4 px-4 cursor-pointer ${category.background} ${category.foreground === ForegroundColor.LIGHT ? 'text-white' : 'text-black'} ${formik.values.background === category.name ? `border-4 border-green-500 box-border` : ``}`}>
                                            <Field type="radio" name="background" value={category.name} onClick={() => setShowThemePicker(false)} className="hidden" />
                                            {category.name}
                                        </label>
                                        )
                                    }
                                </div>
                            </IonContent>
                        </IonModal>


                        {/** Title input */}
                        <Input formik={formik} field="name" id="name" type="text" placeholder="Set name" autocomplete="on" />


                        <Button onClick={() => null} type="submit" disabled={!(formik.dirty && formik.isValid)}>Create</Button>
                    </Form>
                }
                </Formik>
            </div>
        </IonContent>
    </IonPage>
}