import { PencilIcon } from "@heroicons/react/outline";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { closeOutline } from "ionicons/icons";
import { useState } from "react";
import * as Yup from "yup";
import female from '../../assets/icons/female.svg';
import { Button } from "../../components/Buttons/Button";
import { IconButton } from "../../components/Buttons/IconButton";
import { Input } from "../../components/Forms/Input";
import { Language } from "../../shared/enums/Language";
import { Visibility } from "../../shared/enums/Visibility";
import { categories, categoriesList, ForegroundColor, SetCategory } from "../../shared/types/SetCategory";

export const Editor: React.FC = () => {
    const initialValues = {
        name: "",
        category: SetCategory.CLASSIC,
        language: Language.EN,
        visibility: Visibility.PUBLIC
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values)
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(32).required(),
        category: Yup.string().required()
    })
    const [showThemePicker, setShowThemePicker] = useState(false);

    return <IonPage className="bg-background-black">
        <IonContent>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>{(formik) =>
                    <Form>
                        {/** Background picker */}
                        <button type="button" onClick={() => setShowThemePicker(true)}
                            className={`${categories[formik.values.category as SetCategory]?.background} rounded-lg h-24 w-full flex justify-center items-center`}>
                            <PencilIcon className={`${categories[formik.values.category as SetCategory]?.foreground === ForegroundColor.DARK ? `text-black` : `text-white`} h-6`} />
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
                                        categoriesList.map(category => <label key={category.name} className={`rounded-lg h-24 w-full flex items-center mb-4 px-4 cursor-pointer ${category.background} ${category.foreground === ForegroundColor.LIGHT ? 'text-white' : 'text-black'} ${formik.values.category === category.name ? `border-4 border-green-500 box-border` : ``}`}>
                                            <Field type="radio" name="category" value={category.name} onClick={() => setShowThemePicker(false)} className="hidden" />
                                            {category.name}
                                        </label>
                                        )
                                    }
                                </div>
                            </IonContent>
                        </IonModal>


                        {/** Title input */}
                        <Input formik={formik} field="name" id="name" type="text" placeholder="Set name" autocomplete="on" />

                        {/** Tasks */}
                        <IonList>
                            <IonItem>
                                <IonButtons slot="start">
                                    <IconButton icon={female} onClick={() => console.log("Hello world!")} />
                                    <IconButton icon={female} onClick={() => console.log("Hello world!")} />
                                </IonButtons>
                                <IonInput />

                                <IonButtons slot="end">
                                    <IonButton onClick={() => console.log("delete")}>
                                        <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
                                    </IonButton>
                                </IonButtons>

                            </IonItem>
                        </IonList>

                        <Button onClick={() => null} type="submit" disabled={!(formik.dirty && formik.isValid)}>Create</Button>
                    </Form>
                }
                </Formik>
            </div>
        </IonContent>
    </IonPage>
}