import { PlusIcon, SaveIcon, XIcon } from "@heroicons/react/outline";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTextarea, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Button } from "../../components/Buttons/Button";
import { ErrorInput } from "../../components/Forms/ErrorMessage";
import { useActions, useAppState } from "../../overmind";
import { Task } from "../../overmind/explore/state";
import { replaceCurrentPlayerStringWithIcon, replaceIconWithString, replaceStringWithIcon } from "../../services/Utilities";
import { useFocus } from "../../shared/hooks/FocusHook";
import { TaskCurrentPlayerGender, taskCurrentPlayerGenders } from "../../shared/types/TaskCurrentPlayerGender";
import { taskPlayerGenders } from "../../shared/types/TaskPlayerGender";
import { TaskType, taskTypes } from "../../shared/types/TaskType";
import { SecondaryButton } from "../Buttons/SecondaryButton";


export const TaskEditor: React.FC = () => {
    const { addTask, updateTask, deleteTask } = useActions().creative
    const { set } = useAppState().creative

    const [editData, setEditData] = useState<Task | null>(null)
    const [taskMessage, setTaskMessageFocus] = useFocus()
    const [showTaskEditor, setShowTaskEditor] = useState(false)
    const [showDeleteAlert] = useIonAlert()

    const initialValues = {
        message: "",
        type: TaskType.TRUTH,
        currentPlayerGender: TaskCurrentPlayerGender.ANYONE,
    }

    const validationSchema = Yup.object().shape({
        message: Yup.string().min(10).max(280).required(),
        type: Yup.string().oneOf(Object.values(TaskType)).required(),
        currentPlayerGender: Yup.string().oneOf(Object.values(TaskCurrentPlayerGender)).required()
    })

    const submitForm = (values: typeof initialValues) => {
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



    const generateTaskMessage = (string: string, addString: string): string => {
        return string + addString
    }


    const closeTaskEditorModal = () => {
        // Hide modal
        setShowTaskEditor(false)

        // The editData is getting reset in the onDidDismiss hook (we have to wait for the animation)
    }


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

    return <>
        {set?.tasks && set.tasks.length !== 0 && <>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Tasks</h2>
                <Button dataCy="taskeditor-addtask-button" keepFocus={false} type="button" onClick={() => { setShowTaskEditor(true) }} Icon={PlusIcon} className="w-34 px-7">Task</Button>
            </div>
            <p className="text-light-600 mb-3">{set.tasks.filter(task => task.type === TaskType.TRUTH).length} Truth - {set.tasks.filter(task => task.type === TaskType.DARE).length} Dare</p>
            <div>
                {set.tasks.map(task => <div key={task._id} className="rounded-lg h-12 w-full px-4 flex bg-dark-500 items-center mb-4">
                    <button data-cy="taskeditor-tasks" onClick={() => {
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
                    <button data-cy="taskeditor-tasks-delete-button" onClick={() => onDeleteTask(task._id)} className="ml-3 shrink-0 w-8 h-8 rounded-full flex justify-center items-center">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>)}
            </div>
        </>}

        <button data-cy="taskeditor-addtask-input" className="rounded-lg h-12 w-full px-4 flex bg-dark-500 items-center mb-4 cursor-pointer" onClick={() => {
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

        {/** Task Editor Modal */}
        <IonModal data-cy="taskeditor-modal" onWillDismiss={closeTaskEditorModal} onDidDismiss={() => setEditData(null)} isOpen={showTaskEditor}>
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
                } : initialValues} validationSchema={validationSchema} onSubmit={submitForm}>{(formik) =>
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
                                                    <Field data-cy={`taskeditor-currentplayer-${taskCurrentPlayerGender.name}`} className="appearance-none hidden" type="radio" name="currentPlayerGender" value={taskCurrentPlayerGender.name} />
                                                </label>
                                            )
                                        }
                                    </div>
                                    <span>{taskCurrentPlayerGenders[formik.values.currentPlayerGender].text}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <p className="text-light-600 mb-1">Write task</p>
                                <IonTextarea data-cy="taskeditor-textarea" ref={taskMessage} className="bg-dark-600 rounded px-3 mb-1" placeholder={formik.values.type === TaskType.DARE ? `Show your last photo in your smartphone gallery.` : `What is the most attractive thing about 👤?`} autoGrow value={replaceStringWithIcon(formik.values.message)} onIonChange={e => {
                                    formik.setFieldValue('message', e.detail.value)
                                }} onIonBlur={() => {
                                    // This is required since of the custom field of IonTextarea....
                                    formik.setFieldTouched('message')
                                }}></IonTextarea>
                                <ErrorInput field="message" />
                                <div className="flex gap-4 pt-1">{Object.values(taskPlayerGenders).map(taskPlayerGenders =>
                                    <label data-cy={`taskeditor-player-${taskPlayerGenders.name}`} onClick={() => {
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
                                            <label data-cy={`taskeditor-taskstype-${taskType.name}-label`} key={taskType.name} className={`${formik.values.type === taskType.name ? 'bg-light-500 text-dark-700' : ''}  rounded-full px-6 py-2 flex justify-center items-center cursor-pointer`}>
                                                {taskType.name}
                                                <Field data-cy={`taskeditor-taskstype-${taskType.name}`} className="appearance-none hidden" type="radio" name="type" value={taskType.name} />
                                            </label>)}
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full mb-4" type="submit" onClick={() => { }} disabled={!(formik.dirty && formik.isValid)} Icon={SaveIcon}>Save</Button>
                            {editData && <SecondaryButton onClick={() => onDeleteTask(editData._id)}>Delete</SecondaryButton>}
                        </div>
                    </Form>
                    }</Formik>
            </IonContent>
        </IonModal>
    </>
}