import { IonContent, IonHeader, IonList, IonPage, IonProgressBar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { InternalServerError } from '../../components/Errors/InternalServerError';
import { SetItem } from '../../components/SetItem/SetItem';
import { HttpStatus } from '../../enums/http-status';
import { useActions, useAppState } from '../../overmind';
import { Set } from '../../overmind/explore/state';

export const Explore: React.FC = () => {
  const { isLoadingSets, sets } = useAppState().explore
  const { loadExplore } = useActions().explore

  const [error, setError] = useState<HttpStatus>()
  
  useIonViewWillEnter(() => {
    loadExplore(setError)
  }, [loadExplore])

  return <>{error && error === HttpStatus.INTERNAL_SERVER_ERROR && <InternalServerError onClick={() => loadExplore(setError)} />}
    {!error && <IonPage>
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
    </IonPage>}</>
}
