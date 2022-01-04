import { CogIcon } from "@heroicons/react/outline";
import { RefresherEventDetail } from "@ionic/core";
import { IonContent, IonList, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, useIonActionSheet, useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router";
import example from '../../assets/example.png';
import signout from '../../assets/icons/logout.svg';
import plus from '../../assets/icons/plus.svg';
import refresh from '../../assets/icons/refresh.svg';
import { Button } from "../../components/Buttons/Button";
import { NoData } from "../../components/Errors/NoData";
import { CountItem } from "../../components/Profile/CountItem";
import { SetItem } from "../../components/SetItem/SetItem";
import { useActions, useAppState } from "../../overmind";
import { Set } from "../../overmind/explore/state";
import { setSeoTitle } from "../../services/utilities/setSeoTitle";

export const Profile: React.FC = () => {
    const { currentUser, isLoadingSets, sets } = useAppState().profile
    const { profile: { getSetsByUser, logout }, creative: { createNewSet, editSet } } = useActions()
    const [present, dismiss] = useIonActionSheet()
    const history = useHistory()

    const getSets = async (event?: CustomEvent<RefresherEventDetail>) => {
        await getSetsByUser()

        // istanbul ignore next // not testable with cypress
        if (event) event.detail.complete()
    }

    useIonViewWillEnter(() => {
        setSeoTitle('Profile')
        getSets()
    }, [])

    // istanbul ignore next // not testable with cypress
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getSets(event)
    }

    return (
        <IonPage className="bg-background-black">
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent pullingIcon={refresh}
                        refreshingSpinner="circles" />
                </IonRefresher>
                <div className="ion-no-border bg-cover mb-4" style={{ backgroundImage: `url(${example})` }}>
                    <div className="bg-gradient-to-t from-background-black w-full h-full">
                        <div className="container">
                            <div className="flex justify-between pt-14 pb-6 md:pb-10">
                                <div className="flex items-center">
                                    <div className="bg-cover rounded-full h-24" style={{ backgroundImage: `url(${example})`, minWidth: "100px" }}></div>
                                    <h1 className="text-2xl text-white font-bold break-all px-4 pb-4">{currentUser?.username}</h1>
                                </div>
                                <button data-cy="profile-settings-button" onClick={() => present({ buttons: [{ text: 'Logout', icon: signout, handler: () => logout() }], header: 'Settings' })}>
                                    <CogIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex justify-around mb-12 md:mb-20">
                                <CountItem id="truths" number={sets.truthCount} name="Truths" />
                                <CountItem id="dares" number={sets.dareCount} name="Dares" />
                                <CountItem id="sets" number={sets.setCount} name="Sets" />
                                <CountItem id="total-played" number={sets.playedCount} name="Total played" />
                            </div>

                            <div>
                                {isLoadingSets ? <IonProgressBar data-cy="profile-progress-bar" type="indeterminate" className="mt-5" /> :
                                    <>
                                        {sets.data?.length !== 0 &&
                                            <div data-cy="profile-sets-container" className="flex justify-between items-center">
                                                <h2 className="text-lg font-semibold">Your Sets</h2>
                                                <Button keepFocus={false} type="button" onClick={() => {
                                                    createNewSet()
                                                    history.push("/account/creative")
                                                }} icon={plus} className="w-34 px-7">New</Button>
                                            </div>}
                                        {sets.data?.length === 0 ? <NoData onClick={() => {
                                            createNewSet()
                                            history.push("/account/creative")
                                        }} dataCy="profile-no-data" headline="Start creating awesome sets!" text="Create new sets to play with your friends and share with other people." /> :
                                            <IonList>
                                                {sets.data?.map((set: Set) => (
                                                    <SetItem dataCy="profile-set-item" onClick={() => editSet({ setId: set._id, history })} key={set._id} name={set.name} truthCount={set.truthCount} dareCount={set.dareCount} />
                                                ))}
                                            </IonList>}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}