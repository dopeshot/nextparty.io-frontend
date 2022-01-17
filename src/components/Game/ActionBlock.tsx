import { CheckCircleIcon, ChevronRightIcon, MinusCircleIcon } from "@heroicons/react/outline"
import { IonRouterLink } from "@ionic/react"

type ActionBlockType = {
    routerLink: string
    isReady: boolean
    dataCy?: string
}

export const ActionBlock: React.FC<ActionBlockType> = (props) => {

    return <IonRouterLink data-cy={props.dataCy} routerLink={props.routerLink}>
        <div className='cursor-pointer rounded-lg h-16 w-full flex items-center mb-4 transition-colors border border-light-500'>
            {props.isReady ? <CheckCircleIcon data-cy="checkcircle-icon" className="text-theme-kids-dare ml-6 mr-4 w-6" /> : <MinusCircleIcon data-cy="minuscircle-icon" className="text-theme-default-truth ml-6 mr-4 w-6" />}
            <span className="text-light-500 font-bold">{props.children}</span>
            <ChevronRightIcon className="ml-auto text-light-500 mr-6 w-6" />
        </div>
    </IonRouterLink>
}