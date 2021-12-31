import { ChevronDownIcon, PencilIcon, XIcon } from "@heroicons/react/outline";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToggle, IonToolbar, useIonPicker } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { arrowBack } from "ionicons/icons";
import { useState } from "react";
import * as Yup from "yup";
import example from '../../assets/example.png';
import { Button } from "../../components/Buttons/Button";
import { Input } from "../../components/Forms/Input";
import { Language } from "../../shared/enums/Language";
import { Visibility } from "../../shared/enums/Visibility";
import { languagePickerOptions, languages } from "../../shared/types/Language";
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
        category: Yup.string().required(),
        language: Yup.string().required(),
        visibility: Yup.string().required()
    })

    const [showThemePicker, setShowThemePicker] = useState(false);
    const [languagePicker] = useIonPicker()

    return <IonPage className="bg-center bg-no-repeat bg-background-black" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 134px', backgroundPosition: 'top' }}>
        <IonHeader className="container ion-no-border my-1">
            <IonToolbar color="transparent">
                <IonButtons>
                    <IonBackButton className="text-white" icon={arrowBack} defaultHref="/account" />
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent style={{ "--background": "transparent" }}>
            <div className='pb-10 bg-gradient-to-t from-background-black'>
                <div className="container">
                    <h1 className="text-3xl text-white font-bold">Create Set</h1>
                </div>
            </div>
            <main className="bg-background-black">
                <div className="container">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>{(formik) =>
                        <Form className="mb-8">
                            {/** Title input */}
                            <div>
                                <label className="mb-1" htmlFor="name">Name</label>
                                <Input formik={formik} field="name" id="name" type="text" placeholder="Set name" autocomplete="on" />
                            </div>
                            {/** Background picker */}
                            <div className="mb-4">
                                <label className="mb-1" htmlFor="name">Choose your theme</label>
                                <button id="category" type="button" onClick={() => setShowThemePicker(true)}
                                    className={`${categories[formik.values.category as SetCategory]?.background} rounded-lg h-12 w-full flex justify-between px-4 items-center ${categories[formik.values.category as SetCategory]?.foreground === ForegroundColor.DARK ? `text-black` : `text-white`}`}>
                                    <span>{formik.values.category}</span>
                                    <PencilIcon className={`h-6`} />
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
                            </div>


                            {/** Lanuage Picker */}
                            <div className="mb-4">
                                <label className="mb-1" htmlFor="language">Language</label>
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
                                }} type="button" name="language" className={`rounded-lg h-12 w-full bg-itemgrey flex justify-between items-center px-4`}>
                                    <div className="flex flex-row">
                                        <IonIcon icon={languages[formik.values.language].icon} className="h-6 mr-3" />
                                        <span>{languages[formik.values.language].text}</span>
                                    </div>
                                    <ChevronDownIcon className="h-6" />
                                </button>
                            </div>
                            {/** Visibility Picker */}
                            <div className="mb-4">
                                <label className="mb-1" htmlFor="language">Visibility</label>
                                <div className="flex items-center mb-1">
                                    <IonToggle mode="ios" checked={formik.values.visibility === Visibility.PUBLIC} onIonChange={(e) => formik.setFieldValue('visibility', e.detail.checked ? Visibility.PUBLIC : Visibility.PRIVATE)} />
                                    <span className="ml-3">{formik.values.visibility}</span>
                                </div>
                                <p className="text-itemactivegrey">{formik.values.visibility === Visibility.PUBLIC ? 'Everyone can see and play the set.' : 'Only you can see and play the set.'}</p>
                            </div>

                            <Button keepFocus={true} onClick={() => null} type="submit" disabled={!(formik.dirty && formik.isValid)}>Create</Button>
                        </Form>
                    }
                    </Formik>
                    {/** Tasks */}
                    <h2 className="text-2xl">Tasks</h2>
                    <p className="text-itemactivegrey">12 Truth - 23 Dare</p>
                    <div>
                        <div className="rounded-lg h-12 w-full px-4 flex bg-itemgrey items-center">
                            <button onClick={() => console.log("modal")} className="flex items-center flex-grow min-w-0">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-itemactivegrey flex items-center justify-center mr-3">
                                    <span className="text-xl">D</span>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-itemactivegrey flex items-center justify-center mr-3">
                                    <span className="text-xl">👦</span>
                                </div>
                                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">Lorem Ipsum is simply dummy text  ins been the industry's standard dummy text ever since the 1500s</p>
                            </button>
                            <button onClick={() => console.log("delete item")} className="ml-3 flex-shrink-0 w-8 h-8 rounded-full hover:bg-itemactivegrey flex justify-center items-center">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </IonContent>
    </IonPage>
}