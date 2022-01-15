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
    const { currentUser, isLoadingSets, sets, userDetailed } = useAppState().profile
    const { profile: { getSetsByUser, logout, resendMail, getUserDetailed }, creative: { createNewSet, editSet } } = useActions()
    const [present] = useIonActionSheet()
    const history = useHistory()

    const getProfile = async (event?: CustomEvent<RefresherEventDetail>) => {
        await getSetsByUser()
        await getUserDetailed()

        // istanbul ignore next // not testable with cypress
        if (event) event.detail.complete()
    }

    useIonViewWillEnter(() => {
        setSeoTitle('Profile')
        getProfile()
    }, [])

    // istanbul ignore next // not testable with cypress
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getProfile(event)
    }

    return (
        <IonPage className="bg-center bg-no-repeat bg-background-black" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 320px', backgroundPosition: 'top' }}>
            <IonContent style={{ "--background": "transparent" }}>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent pullingIcon={refresh}
                        refreshingSpinner="circles" />
                </IonRefresher>
                <div className="bg-gradient-to-t from-background-black w-full">
                    <div className="container pb-12 md:pb-20">
                        <div className="flex justify-between pt-14 pb-6 md:pb-10">
                            <div className="flex items-center">
                                <div className="bg-cover rounded-full h-24" style={{ backgroundImage: `url(${example})`, minWidth: "100px" }}></div>
                                <h1 className="text-2xl text-white font-bold break-all px-4 pb-4">{currentUser?.username}</h1>
                            </div>
                            <button data-cy="profile-settings-button" onClick={() => present({ buttons: [{ text: 'Logout', icon: signout, handler: () => logout() }], header: 'Settings' })}>
                                <CogIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {isLoadingSets ? <IonProgressBar data-cy="profile-progress-bar" type="indeterminate" className="mt-5" /> :
                            <>
                                {sets.data?.length !== 0 && <div className="flex justify-around">
                                    <CountItem number={sets.truthCount} name="Truths" />
                                    <CountItem number={sets.dareCount} name="Dares" />
                                    <CountItem number={sets.setCount} name="Sets" />
                                    <CountItem number={sets.playedCount} name="Total played" />
                                </div>}
                            </>}
                    </div>
                </div>
                <div className="bg-background-black">
                    <div className="container">
                        {/* {userDetailed?.status === "unverified" && <ErrorBanner color="warning" message={`Verification Email has been send to ${userDetailed.email}. Check your inbox.`} buttonText="Resend Mail" onClick={() => resendMail()} />} */}
                        <div>
                            {!isLoadingSets &&
                                <>
                                    {sets.data?.length !== 0 &&
                                        <div data-cy="profile-sets-container" className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">Your Sets</h2>
                                            <Button type="button" onClick={() => {
                                                createNewSet()
                                                history.push("/account/creative")
                                            }} icon={plus} className="w-34 px-7">New</Button>
                                        </div>}
                                    {sets.data?.length === 0 ?
                                        <NoData onClick={() => {
                                            createNewSet()
                                            history.push("/account/creative")
                                        }} dataCy="profile-no-data" headline="Start creating awesome sets!" text="Create new sets to play with your friends and share with other people." />
                                        :
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
            </IonContent>
        </IonPage >
    )
}