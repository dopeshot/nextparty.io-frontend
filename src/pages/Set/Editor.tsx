import { ChevronDownIcon, DotsHorizontalIcon, PencilIcon, PlusIcon, SaveIcon, XIcon } from "@heroicons/react/outline";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTextarea, IonTitle, IonToggle, IonToolbar, useIonActionSheet, useIonAlert, useIonPicker, useIonRouter } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { arrowBack } from "ionicons/icons";
import { useRef, useState } from "react";
import * as Yup from "yup";
import example from '../../assets/example.png';
import trash from "../../assets/icons/trash.svg";
import { Button } from "../../components/Buttons/Button";
import { ErrorInput } from "../../components/Forms/ErrorMessage";
import { Input } from "../../components/Forms/Input";
import { useActions, useAppState } from "../../overmind";
import { Task } from "../../overmind/explore/state";
import { replaceCurrentPlayerStringWithIcon, replaceIconWithString, replaceStringWithIcon } from "../../services/utilities/utilities";
import { Language } from "../../shared/enums/Language";
import { Visibility } from "../../shared/enums/Visibility";
import { languagePickerOptions, languages } from "../../shared/types/Language";
import { categories, categoriesList, ForegroundColor, SetCategory } from "../../shared/types/SetCategory";
import { TaskCurrentPlayerGender, taskCurrentPlayerGenders } from "../../shared/types/TaskCurrentPlayerGender";
import { taskPlayerGenders } from "../../shared/types/TaskPlayerGender";
import { TaskType, taskTypes } from "../../shared/types/TaskType";

export const Editor: React.FC = () => {
    const { submitSet, addTask, updateTask, deleteTask, deleteSet } = useActions().creative
    const { isLoading, isEdit, isNew, set } = useAppState().creative
    const ionRouter = useIonRouter()

    const initialValuesSet = {
        name: set?.name ?? "",
        category: set?.category ?? SetCategory.CLASSIC,
        language: set?.language ?? Language.EN,
        visibility: set?.visibility ?? Visibility.PUBLIC
    }

    const submitFormSet = (values: typeof initialValuesSet) => {
        submitSet(values)
    }

    const validationSchemaSet = Yup.object().shape({
        name: Yup.string().min(3, "Your creative name must be at least 3 characters").max(32, "Your creative name must be at most 32 characters").required("Name is a required field"),
        category: Yup.string().oneOf(Object.values(SetCategory)).required(),
        language: Yup.string().oneOf(Object.values(Language)).required(),
        visibility: Yup.string().oneOf(Object.values(Visibility)).required()
    })

    const initialValuesTask = {
        message: "",
        type: TaskType.TRUTH,
        currentPlayerGender: TaskCurrentPlayerGender.ANYONE,
    }

    const submitFormTask = (values: typeof initialValuesTask) => {
        // Removes whitespaces from task
        values.message = values.message.replace(/(\r\n|\n|\r)/gm, "")

        // Replace icons with strings (👩 => @f)
        values.message = replaceIconWithString(values.message)

        if (!set || !set._id) {
            console.error("There is no id for this set created yet.")
            return
        }
        if (editData && editData._id) {
            updateTask({ setId: set._id, taskId: editData._id, task: values })
            setEditData(null)
        }
        else
            addTask({ setId: set._id, task: values })

        setShowTaskEditor(false)
    }

    const closeTaskEditorModal = () => {
        // Hide modal
        setShowTaskEditor(false)

        // The editData is getting reset in the onDidDismiss hook (we have to wait for the animation)
    }

    const validationSchemaTask = Yup.object().shape({
        message: Yup.string().min(10).max(280).required(),
        type: Yup.string().oneOf(Object.values(TaskType)).required(),
        currentPlayerGender: Yup.string().oneOf(Object.values(TaskCurrentPlayerGender)).required()
    })

    const onDeleteTask = (taskId: string) => {
        showDeleteAlert({
            header: "Delete this task?",
            message: "It will be gone forever",
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Yes, delete it', role: 'destructive', handler: (d) => {
                        if (!set || !set._id) {
                            console.error("There is no id for this set created yet.")
                            return
                        }

                        deleteTask({ setId: set._id, taskId })

                        if (showTaskEditor) {
                            // There is no need to reset editData since this is done by the task editor on dismiss did
                            setShowTaskEditor(false)
                        }
                    }
                },
            ]
        })
    }

    const onDeleteSet = () => {
        showDeleteAlert({
            header: "Delete this Set?",
            message: "It will be gone forever",
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Yes, delete it', role: 'destructive', handler: (d) => {
                        deleteSet()
                        ionRouter.push('/account/profile')
                    }
                },
            ]
        })
    }

    const generateTaskMessage = (string: string, addString: string): string => {
        return string + addString
    }

    // The return type is required (for some reason)
    const useFocus = (): [React.RefObject<HTMLIonTextareaElement>, () => void] => {
        const htmlElementReference = useRef<HTMLIonTextareaElement>(null)
        const setFocus = () => { htmlElementReference.current && htmlElementReference.current.setFocus() }

        return [htmlElementReference, setFocus]
    }

    const [taskMessage, setTaskMessageFocus] = useFocus()
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [showTaskEditor, setShowTaskEditor] = useState(false)
    const [editData, setEditData] = useState<Task | null>(null)
    const [languagePicker] = useIonPicker()
    const [showDeleteAlert] = useIonAlert()
    const [showSetOptions] = useIonActionSheet()

    return <IonPage className="bg-center bg-no-repeat bg-dark-700" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 134px', backgroundPosition: 'top' }}>
        <IonHeader className="container ion-no-border my-1">
            <IonToolbar color="transparent">
                <IonButtons>
                    <IonBackButton className="text-light-500" icon={arrowBack} defaultHref="/account" />
                </IonButtons>
                {isEdit && <IonButtons slot="end">
                    <IonButton data-cy="set-details-threedot-icon" onClick={() => showSetOptions({
                        buttons: [{
                            text: 'Delete this Set',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                onDeleteSet()
                            }
                        }],
                        header: "Edit set"
                    })}>
                        <DotsHorizontalIcon className="h-6 w-6 text-light-500" />
                    </IonButton>
                </IonButtons>
                }
            </IonToolbar>
        </IonHeader>

        <IonContent style={{ "--background": "transparent" }}>
            <div className='pb-10 bg-gradient-to-t from-dark-700'>
                <div className="container">
                    <h1 className="text-3xl text-light-500 font-bold">{isNew ? 'Create Set' : 'Edit Set'}</h1>
                </div>
            </div>
            <main className="bg-dark-700 mb-12">
                <div className="container">
                    <Formik initialValues={initialValuesSet} validationSchema={validationSchemaSet} onSubmit={submitFormSet}>{(formik) =>
                        <Form className="mb-8">
                            {/** Title input */}
                            <div>
                                <label className="text-light-600 mb-1" htmlFor="name">Name</label>
                                <Input formik={formik} field="name" id="name" type="text" placeholder="Set name" autocomplete="on" />
                            </div>
                            {/** Background picker */}
                            <div className="mb-4">
                                <label className="text-light-600 mb-1" htmlFor="name">Choose your theme</label>
                                <button id="category" type="button" onClick={() => setShowThemePicker(true)}
                                    className={`${categories[formik.values.category as SetCategory]?.background} rounded-lg h-12 w-full flex justify-between px-4 items-center ${categories[formik.values.category as SetCategory]?.foreground === ForegroundColor.DARK ? `text-dark-700` : `text-light-500`}`}>
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
                                                categoriesList.map(category => <label key={category.name} className={`rounded-lg h-24 w-full flex items-center mb-4 px-4 cursor-pointer ${category.background} ${category.foreground === ForegroundColor.LIGHT ? 'text-light-500' : 'text-dark-700'} ${formik.values.category === category.name ? `border-4 border-theme-kids-dare box-border` : ``}`}>
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
                                }} type="button" name="language" className={`rounded-lg h-12 w-full bg-dark-500 flex justify-between items-center px-4`}>
                                    <div className="flex flex-row">
                                        <IonIcon icon={languages[formik.values.language].icon} className="h-6 mr-3" />
                                        <span>{languages[formik.values.language].text}</span>
                                    </div>
                                    <ChevronDownIcon className="h-6" />
                                </button>
                            </div>
                            {/** Visibility Picker */}
                            <div className="mb-4">
                                <label className="text-light-600 mb-1" htmlFor="language">Visibility</label>
                                <div className="flex items-center mb-1">
                                    <IonToggle mode="ios" checked={formik.values.visibility === Visibility.PUBLIC} onIonChange={(e) => formik.setFieldValue('visibility', e.detail.checked ? Visibility.PUBLIC : Visibility.PRIVATE)} />
                                    <span className="ml-3">{formik.values.visibility}</span>
                                </div>
                                <p className="text-light-600">{formik.values.visibility === Visibility.PUBLIC ? 'Everyone can see and play the set.' : 'Only you can see and play the set.'}</p>
                            </div>
                            <Button className="w-full" keepFocus={true} onClick={() => null} Icon={SaveIcon} loading={isLoading} type="submit" disabled={!(formik.dirty && formik.isValid)}>{isEdit ? 'Update Set Details' : 'Create Set'}</Button>
                        </Form>
                    }
                    </Formik>
                    {/** Tasks  */}
                    {set?.tasks && set.tasks.length !== 0 && <>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Tasks</h2>
                            <Button keepFocus={false} type="button" onClick={() => { setShowTaskEditor(true) }} Icon={PlusIcon} className="w-34 px-7">Task</Button>
                        </div>
                        <p className="text-light-600 mb-3">{set.tasks.filter(task => task.type === TaskType.TRUTH).length} Truth - {set.tasks.filter(task => task.type === TaskType.DARE).length} Dare</p>
                        <div>
                            {set.tasks.map(task => <div key={task._id} className="rounded-lg h-12 w-full px-4 flex bg-dark-500 items-center mb-4">
                                <button onClick={() => {
                                    setEditData(task)
                                    setShowTaskEditor(true)
                                }} className="flex items-center grow min-w-0">
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                                        <span className="text-xl">{task.type === TaskType.DARE ? 'D' : 'T'}</span>
                                    </div>
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                                        <span className="text-xl">{replaceCurrentPlayerStringWithIcon(task.currentPlayerGender)}</span>
                                    </div>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{replaceStringWithIcon(task.message)}</p>
                                </button>
                                <button onClick={() => onDeleteTask(task._id)} className="ml-3 shrink-0 w-8 h-8 rounded-full flex justify-center items-center">
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>)}
                        </div>
                    </>}

                    {isEdit &&
                        <button className="rounded-lg h-12 w-full px-4 flex bg-dark-500 items-center mb-4 cursor-pointer" onClick={() => {
                            setShowTaskEditor(true)
                        }}>
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                                <span className="text-xl">T</span>
                            </div>
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                                <span className="text-xl">👤</span>
                            </div>
                            <p className="text-light-700">Create new task...</p>
                        </button>
                    }

                    {/** Task Editor Modal */}
                    <IonModal onWillDismiss={closeTaskEditorModal} onDidDismiss={() => setEditData(null)} isOpen={showTaskEditor}>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>{editData ? 'Edit task' : 'Create task'}</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton onClick={closeTaskEditorModal}>Close</IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>

                        <IonContent className="bg-dark-500">
                            <Formik initialValues={editData ? {
                                message: editData.message,
                                type: editData.type,
                                currentPlayerGender: editData.currentPlayerGender,
                            } : initialValuesTask} validationSchema={validationSchemaTask} onSubmit={submitFormTask}>{(formik) =>
                                <Form className="container mt-4 mb-8">
                                    <div>
                                        <div className="mb-6">
                                            <p className="text-light-600 mb-1">Which gender can play the task?</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex gap-4 bg-dark-600 p-1 rounded-full">
                                                    {
                                                        Object.values(taskCurrentPlayerGenders).map(taskCurrentPlayerGender =>
                                                            <label key={taskCurrentPlayerGender.name} className={`${formik.values.currentPlayerGender === taskCurrentPlayerGender.name ? 'bg-light-500' : ''} hover:bg-light-600 text-xl rounded-full w-9 h-9 flex justify-center items-center cursor-pointer`}>
                                                                {taskCurrentPlayerGender.icon}
                                                                <Field className="appearance-none hidden" type="radio" name="currentPlayerGender" value={taskCurrentPlayerGender.name} />
                                                            </label>
                                                        )
                                                    }
                                                </div>
                                                <span>{taskCurrentPlayerGenders[formik.values.currentPlayerGender].text}</span>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-light-600 mb-1">Write task</p>
                                            <IonTextarea ref={taskMessage} className="bg-dark-600 rounded pl-3 mb-1" placeholder={formik.values.type === TaskType.DARE ? `Show your last photo in your smartphone gallery.` : `What is the most attractive thing about 👤?`} autoGrow value={replaceStringWithIcon(formik.values.message)} onIonChange={e => {
                                                formik.setFieldValue('message', e.detail.value)
                                            }} onIonBlur={() => {
                                                // This is required since of the custom field of IonTextarea....
                                                formik.setFieldTouched('message')
                                            }}></IonTextarea>
                                            <ErrorInput field="message" />
                                            <div className="flex gap-4 pt-1">{Object.values(taskPlayerGenders).map(taskPlayerGenders =>
                                                <label onClick={() => {
                                                    formik.setFieldValue('message', generateTaskMessage(formik.values.message, taskPlayerGenders.name))
                                                    setTaskMessageFocus()
                                                }} key={taskPlayerGenders.name} className={`hover:bg-light-600 text-xl rounded-full w-9 h-9 flex justify-center items-center cursor-pointer`}>
                                                    {taskPlayerGenders.icon}
                                                </label>
                                            )}</div>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-light-600 mb-1">Is the task a truth or dare?</p>
                                            <div className="flex">
                                                <div className="flex gap-2 bg-dark-600 p-1 rounded-full">
                                                    {Object.values(taskTypes).map(taskType =>
                                                        <label key={taskType.name} className={`${formik.values.type === taskType.name ? 'bg-light-500 text-dark-700' : ''}  rounded-full px-6 py-2 flex justify-center items-center cursor-pointer`}>
                                                            {taskType.name}
                                                            <Field className="appearance-none hidden" type="radio" name="type" value={taskType.name} />
                                                        </label>)}
                                                </div>
                                            </div>
                                        </div>
                                        <Button className="w-full mb-4" type="submit" onClick={() => { }} disabled={!(formik.dirty && formik.isValid)} Icon={SaveIcon}>Save</Button>
                                        {editData && <Button className="w-full" type="button" onClick={() => onDeleteTask(editData._id)}>Delete</Button>}
                                    </div>
                                </Form>
                                }</Formik>
                        </IonContent>
                    </IonModal>
                </div>
            </main>
        </IonContent>
    </IonPage >
}