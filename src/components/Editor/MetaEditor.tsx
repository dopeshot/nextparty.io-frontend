import { ChevronDownIcon, PencilIcon, SaveIcon } from "@heroicons/react/outline";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToggle, IonToolbar, useIonPicker } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { Input } from "../../components/Forms/Input";
import { useActions, useAppState } from "../../overmind";
import { Visibility } from "../../shared/enums/Visibility";
import { Language, languagePickerOptions, languages } from "../../shared/types/Language";
import { categories, categoriesList, ForegroundColor, SetCategory } from "../../shared/types/SetCategory";
import { Button } from "../Buttons/Button";

export const MetaEditor: React.FC = () => {
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [languagePicker] = useIonPicker()
    const { isSubmitting, isEdit, set } = useAppState().creative
    const { submitSet } = useActions().creative
    const history = useHistory()

    const initialValues = {
        name: set ? set.name : "",
        category: set ? set.category : SetCategory.CLASSIC,
        language: set ? set.language : Language.DE,
        visibility: set ? set.visibility : Visibility.PUBLIC
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Your creative name must be at least 3 characters").max(32, "Your creative name must be at most 32 characters").required("Name is a required field"),
        category: Yup.string().oneOf(Object.values(SetCategory)).required(),
        language: Yup.string().oneOf(Object.values(Language)).required(),
        visibility: Yup.string().oneOf(Object.values(Visibility)).required()
    })

    const submitForm = async (values: typeof initialValues) => {
        const response = await submitSet(values)
        if (response)
            history.replace(`/account/profile/creative/${response.data._id}`)
    }

    return <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>{(formik) =>
        <Form className="mb-4">
            {/** Title input */}
            <div>
                <label className="text-light-600 mb-1" htmlFor="name">Name</label>
                <Input formik={formik} field="name" id="name" type="text" placeholder="Set name" autocomplete="on" />
            </div>
            {/** Background picker */}
            <div className="mb-5">
                <label className="text-light-600 mb-1" htmlFor="name">Choose your theme</label>
                <button id="category" type="button" onClick={() => setShowThemePicker(true)}
                    className={`rounded-lg h-12 w-full flex justify-between px-4 items-center ${categories[formik.values.category as SetCategory]?.foreground === ForegroundColor.DARK ? `text-dark-700` : `text-light-500`}`}
                    style={{ backgroundImage: `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/${categories[formik.values.category as SetCategory].name}.svg')`, backgroundSize: "100% 48px" }}>
                    <span>{formik.values.category}</span>
                    <PencilIcon className={`h-6`} />
                </button>
                <IonModal onWillDismiss={() => setShowThemePicker(false)} isOpen={showThemePicker}>
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
                                categoriesList.map(category => <label key={category.name} className={`rounded-lg h-24 w-full flex items-center mb-4 px-4 cursor-pointer ${category.foreground === ForegroundColor.LIGHT ? 'text-light-500' : 'text-dark-700'} ${formik.values.category === category.name ? `border-4 border-green-500 box-border` : ``}`}
                                    style={{ backgroundImage: `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/${category.name}.svg')`, backgroundSize: "100% 96px" }}>
                                    <Field type="radio" name="category" value={category.name} onClick={() => setShowThemePicker(false)} className="hidden" />
                                    {category.name}
                                </label>
                                )
                            }
                        </div>
                    </IonContent>
                </IonModal>
            </div>


            {/** Lanuage Picker */}
            <div className="mb-5">
                <label className="text-light-600 mb-1" htmlFor="language">Language</label>
                <button onClick={() => {
                    languagePicker({
                        buttons: [
                            {
                                text: 'Confirm',
                                handler: (selected) => {
                                    formik.setFieldValue('language', selected.language.value)
                                },
                            },
                        ],
                        columns: [
                            {
                                name: 'language',
                                options: languagePickerOptions,
                            },
                        ],

                    })
                }} type="button" name="language" className={`rounded h-12 w-full bg-dark-500 flex justify-between items-center px-4`}>
                    <div className="flex flex-row">
                        <IonIcon icon={languages[formik.values.language].icon} className="h-6 mr-3" />
                        <span>{languages[formik.values.language].text}</span>
                    </div>
                    <ChevronDownIcon className="h-6" />
                </button>
            </div>
            {/** Visibility Picker */}
            <div className="mb-5">
                <label className="text-light-600 mb-1" htmlFor="language">Visibility</label>
                <div className="flex items-center mb-1">
                    <IonToggle color="medium" mode="ios" checked={formik.values.visibility === Visibility.PUBLIC} onIonChange={(e) => formik.setFieldValue('visibility', e.detail.checked ? Visibility.PUBLIC : Visibility.PRIVATE)} />
                    <span className="ml-3">{formik.values.visibility}</span>
                </div>
                <small className="text-light-600 mt-1">{formik.values.visibility === Visibility.PUBLIC ? 'Everyone can see and play the set.' : 'Only you can see and play the set.'}</small>
            </div>
            <Button className="w-full" keepFocus={true} onClick={() => null} Icon={SaveIcon} loading={isSubmitting} type="submit" disabled={!(formik.dirty && formik.isValid)}>{isEdit ? 'Update Set Details' : 'Create Set'}</Button>
        </Form>
    }
    </Formik>

}
