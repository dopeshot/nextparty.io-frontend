import { CogIcon, PlusIcon } from "@heroicons/react/outline";
import { RefresherEventDetail } from "@ionic/core";
import { IonContent, IonList, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, useIonActionSheet, useIonToast, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import signout from '../../assets/icons/logout.svg';
import refresh from '../../assets/icons/refresh.svg';
import { Button } from "../../components/Buttons/Button";
import { NoData } from "../../components/Errors/NoData";
import { CountItem } from "../../components/Profile/CountItem";
import { SetItem } from "../../components/SetItem/SetItem";
import { useActions, useAppState } from "../../overmind";
import { Set } from "../../overmind/explore/state";
import { setSeoTitle } from "../../services/Utilities";
import { getFrontendOrigin } from "../../services/utilities/getFrontendOrigin";

export const Profile: React.FC = () => {
    const { profile: { currentUser, isLoadingSets, sets, userDetailed }, game: { set } } = useAppState()
    const { getSetsByUser, logout, resendMail, getUserDetailed } = useActions().profile
    const [present] = useIonActionSheet()
    const [presentToast, dismiss] = useIonToast()
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

    const [resendClicked, setResendClicked] = useState<boolean>(false)

    // istanbul ignore next // not testable with cypress
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getProfile(event)
    }

    const doLogout = async () => {
        await logout()
        history.replace('/account/login')
    }

    return (
        <IonPage className="bg-center bg-no-repeat bg-dark-700" style={{ backgroundPosition: "top", backgroundSize: "100% 320px", backgroundImage: set ? `url('${getFrontendOrigin}/assets/themes/${set.category}.svg')` : `url('${getFrontendOrigin}/assets/themes/default.svg')` }}>
            <IonContent style={{ "--background": "transparent" }}>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent pullingIcon={refresh}
                        refreshingSpinner="circles" />
                </IonRefresher>
                <div className="bg-gradient-to-t from-dark-700 w-full">
                    <div className="container pb-12 md:pb-20">
                        <div className="flex justify-between pt-14 pb-6 md:pb-10">
                            <div className="flex items-center">
                                <div className="bg-cover rounded-full h-24" style={{ backgroundImage: `${set ? `url('${getFrontendOrigin}/assets/themes/${set.category}.svg')` : `url('${getFrontendOrigin}/assets/themes/default.svg')`}`, minWidth: "100px" }}></div>
                                <h1 className="text-2xl text-white font-bold break-all px-4 pb-4">{currentUser?.username}</h1>
                            </div>
                            <button data-cy="profile-settings-button" onClick={() => present({ buttons: [{ text: 'Logout', icon: signout, handler: () => doLogout() }], header: 'Settings' })}>
                                <CogIcon className="text-light-500 w-6 h-6" />
                            </button>
                        </div>

                        {isLoadingSets ? <IonProgressBar data-cy="profile-progress-bar" type="indeterminate" className="mt-5 mb-20" /> :
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
                <div className="bg-dark-700">
                    <div className="container">
                        <div>
                            {!isLoadingSets &&
                                (sets.data?.length === 0 ?
                                    userDetailed?.status === "unverified" ?
                                        <NoData onClick={() => {
                                            presentToast({
                                                buttons: [{ text: 'hide', handler: () => dismiss() }],
                                                message: 'E-Mail has been sent.',
                                                position: "top",
                                                duration: 1000
                                            })
                                            // Backoff strategy
                                            if (!resendClicked) {
                                                setResendClicked(true)
                                                resendMail()
                                            }
                                        }} dataCy="profile-no-data-unverified" buttonText="Resend Mail" headline="Verification Email has been send!" text={`Email has been send to ${userDetailed.email}. Check your inbox.`} />
                                        : <NoData onClick={() => {
                                            history.push("/account/profile/creative")
                                        }} dataCy="profile-no-data-verified" Icon={PlusIcon} buttonText="New" headline="Start creating awesome sets!" text="Create new sets to play with your friends and share with other people." />
                                    :
                                    <>
                                        <div data-cy="profile-sets-container" className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">Your Sets</h2>
                                            <Button type="button" onClick={() => {
                                                history.push("/account/profile/creative")
                                            }} Icon={PlusIcon} className="w-34 px-7">New</Button>
                                        </div>
                                        <IonList>
                                            {sets.data?.map((set: Set) => (
                                                <SetItem dataCy="profile-set-item" category={set.category} played={set.played} link={`/account/profile/creative/${set._id}`} key={set._id} name={set.name} truthCount={set.truthCount} dareCount={set.dareCount} />
                                            ))}
                                        </IonList>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage >
    )
}