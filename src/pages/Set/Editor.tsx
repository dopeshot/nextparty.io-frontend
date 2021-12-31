import { ChevronDownIcon, PencilIcon, XIcon } from "@heroicons/react/outline";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToggle, IonToolbar, useIonPicker } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { arrowBack } from "ionicons/icons";
import { useState } from "react";
import * as Yup from "yup";
import example from '../../assets/example.png';
import save from "../../assets/icons/save.svg";
import { Button } from "../../components/Buttons/Button";
import { Input } from "../../components/Forms/Input";
import { useActions, useAppState } from "../../overmind";
import { Task } from "../../overmind/explore/state";
import { replaceCurrentPlayerStringWithIcon } from "../../services/utilities/utilities";
import { Language } from "../../shared/enums/Language";
import { Visibility } from "../../shared/enums/Visibility";
import { languagePickerOptions, languages } from "../../shared/types/Language";
import { categories, categoriesList, ForegroundColor, SetCategory } from "../../shared/types/SetCategory";

export const Editor: React.FC = () => {
    const { submitSet } = useActions().creative
    const { isLoading, isEdit, isNew, set } = useAppState().creative

    const initialValues = {
        name: set?.name ?? "",
        category: set?.category ?? SetCategory.CLASSIC,
        language: set?.language ?? Language.EN,
        visibility: set?.visibility ?? Visibility.PUBLIC
    }

    const submitForm = (values: typeof initialValues) => {
        submitSet(values)
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Your creative name must be at least 3 characters").max(32, "Your creative name must be at most 32 characters").required("Name is a required field"),
        category: Yup.string().oneOf(Object.values(SetCategory)).required(),
        language: Yup.string().oneOf(Object.values(Language)).required(),
        visibility: Yup.string().oneOf(Object.values(Visibility)).required()
    })

    const [showThemePicker, setShowThemePicker] = useState(false);
    const [showTaskEditor, setShowTaskEditor] = useState(false)
    const [languagePicker] = useIonPicker()

    const [editData, setEditData] = useState<Task | null>(null)

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
                    <h1 className="text-3xl text-white font-bold">{isNew ? 'Create Set' : 'Edit Set'}</h1>
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
                            <Button keepFocus={true} onClick={() => null} icon={save} loading={isLoading} type="submit" disabled={!(formik.dirty && formik.isValid)}>{isEdit ? 'Save' : 'Create'}</Button>
                        </Form>
                    }
                    </Formik>
                    {/** Tasks */}
                    {
                        set?.tasks && set.tasks.length !== 0 ? <>
                            <h2 className="text-2xl">Tasks</h2>
                            <p className="text-itemactivegrey">12 Truth - 23 Dare</p>
                            <div>
                                {set.tasks.map(set => <div key={set._id} className="rounded-lg h-12 w-full px-4 flex bg-itemgrey items-center mb-4">
                                    <button onClick={() => {
                                        setEditData(set)
                                        setShowTaskEditor(true)
                                    }} className="flex items-center flex-grow min-w-0">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-itemactivegrey flex items-center justify-center mr-3">
                                            <span className="text-xl">{set.type}</span>
                                        </div>
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-itemactivegrey flex items-center justify-center mr-3">
                                            <span className="text-xl">{replaceCurrentPlayerStringWithIcon(set.currentPlayerGender)}</span>
                                        </div>
                                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">{set.message}</p>
                                    </button>
                                    <button onClick={() => console.log("delete item")} className="ml-3 flex-shrink-0 w-8 h-8 rounded-full hover:bg-itemactivegrey flex justify-center items-center">
                                        <XIcon className="w-6 h-6" />
                                    </button>
                                </div>)}

                            </div>

                            {/** Task Editor Modal */}
                            <IonModal onWillDismiss={() => setShowTaskEditor(false)} isOpen={showTaskEditor} cssClass="my-custom-class">
                                <IonHeader>
                                    <IonToolbar>
                                        <IonTitle>Create / Edit Task</IonTitle>
                                        <IonButtons slot="end">
                                            <IonButton onClick={() => setShowTaskEditor(false)}>Close</IonButton>
                                        </IonButtons>
                                    </IonToolbar>
                                </IonHeader>

                                <IonContent>
                                    <div className="container mt-4">
                                        <p>{JSON.stringify(editData)}</p>
                                    </div>
                                </IonContent>
                            </IonModal>
                        </> : <>
                            <p>Start creating Tasks!</p>
                        </>
                    }

                </div>
            </main>
        </IonContent>
    </IonPage>
}