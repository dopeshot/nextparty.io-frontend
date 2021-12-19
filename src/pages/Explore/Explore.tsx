import { IonContent, IonHeader, IonList, IonPage, IonProgressBar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { InternalServerError } from '../../components/Errors/InternalServerError';
import { NotFoundError } from '../../components/Errors/NotFoundError';
import { RequestTimeoutError } from '../../components/Errors/RequestTimeoutError';
import { SetItem } from '../../components/SetItem/SetItem';
import { HttpStatus } from '../../enums/http-status';
import { useActions, useAppState } from '../../overmind';
import { Set } from '../../overmind/explore/state';

export const Explore: React.FC = () => {
  const { isLoadingSets, sets } = useAppState().explore
  const { loadExplore } = useActions().explore

  const [errorStatusCode, setErrorStatusCode] = useState<HttpStatus>()

  useIonViewWillEnter(() => {
    loadExplore(setErrorStatusCode)
  }, [loadExplore])

  return (
    <>
      {(errorStatusCode === HttpStatus.NOT_FOUND || errorStatusCode == HttpStatus.BAD_REQUEST) && <NotFoundError link='explore' />}
      {errorStatusCode == HttpStatus.INTERNAL_SERVER_ERROR && <InternalServerError onClick={() => loadExplore(setErrorStatusCode)} />}
      {errorStatusCode == HttpStatus.REQUEST_TIMEOUT && <RequestTimeoutError onClick={() => loadExplore(setErrorStatusCode)} />}
      {!errorStatusCode && <IonPage>
        <IonHeader className="container ion-no-border my-4">
          <IonToolbar color="transparent">
            <h1 className="text-3xl font-bold">Explore</h1>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="container">
            <h2 className="text-xl font-bold mb-2">All Sets</h2>
            {isLoadingSets ? (<IonProgressBar type="indeterminate"></IonProgressBar>) : (
              <div>
                <IonList>
                  {sets.map((set: Set, index) => (
                    <SetItem key={index} name={set.name} author={set.createdBy.username} truthCount={set.truthCount} dareCount={set.daresCount} link={`/explore/${set._id}`} />
                  ))}
                </IonList>
              </div>
            )}
          </div>
        </IonContent>
      </IonPage>}
    </>
  )
}
