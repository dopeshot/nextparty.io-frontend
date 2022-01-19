import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonProgressBar, IonToolbar, useIonActionSheet, useIonAlert, useIonRouter, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import trash from "../../assets/icons/trash.svg";
import { SecondaryButton } from "../../components/Buttons/SecondaryButton";
import { MetaEditor } from "../../components/Editor/MetaEditor";
import { TaskEditor } from "../../components/Editor/TaskEditor";
import { useActions, useAppState } from "../../overmind";


type EditorParams = {
    setId: string
}
export const Editor: React.FC = () => {

    const { loadSet, deleteSet, resetSet } = useActions().creative
    const { isLoading, isEdit, set } = useAppState().creative
    const { addSetToGame } = useActions().game
    const { setId } = useParams<EditorParams>()
    const history = useHistory()
    const ionRouter = useIonRouter()
    const [showDeleteAlert] = useIonAlert()
    const [showSetOptions] = useIonActionSheet()


    useIonViewWillEnter(() => {
        if (setId) {
            loadSet(setId)
        }
    }, [setId])

    useIonViewDidLeave(() => {
        resetSet()
    })

    const onDeleteSet = () => {
        showDeleteAlert({
            header: "Delete this Set?",
            message: "It will be gone forever",
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Yes, delete it', role: 'destructive', handler: (d) => {
                        ionRouter.push('/account/profile')
                        deleteSet()
                    }
                },
            ]
        })
    }


    return <IonPage className="bg-center bg-no-repeat bg-dark-700" style={!isLoading ? { backgroundPosition: "top", backgroundSize: "100% 134px", backgroundImage: set ? `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/${set.category}.svg')` : `url('${process.env.REACT_APP_PUBLIC_URL}/assets/themes/default.svg')` } : {}}>
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
                            handler: () => onDeleteSet()
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
            {isLoading ? <IonProgressBar data-cy="detail-set-progress-bar" type="indeterminate"></IonProgressBar> : <>
                <div className='pb-10 bg-gradient-to-t from-dark-700'>
                    <div className="container">
                        <h1 className="text-3xl text-light-500 font-bold">{isEdit ? 'Edit Set' : 'Create Set'}</h1>
                    </div>
                </div>
                <main className="bg-dark-700 mb-12">
                    <div className="container">
                        <MetaEditor />
                        {isEdit && <>
                            <SecondaryButton disabled={set?.tasks.length === 0} onClick={(event: any) => {
                                event.preventDefault()
                                addSetToGame(set!._id!)
                                history.push('/game')
                            }}>Play now</SecondaryButton>
                            <TaskEditor />
                        </>}
                    </div>
                </main>
            </>}
        </IonContent>
    </IonPage >
}