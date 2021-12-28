import { CheckCircleIcon, ChevronRightIcon, MinusCircleIcon } from "@heroicons/react/outline"
import { IonRouterLink } from "@ionic/react"

type ActionBlockType = {
    routerLink: string
    isReady: boolean
    dataCy?: string
}

export const ActionBlock: React.FC<ActionBlockType> = (props) => {

    return <IonRouterLink data-cy={props.dataCy} routerLink={props.routerLink}>
        <div className='bg-white cursor-pointer rounded-lg h-16 w-full flex items-center mb-4 transition-colors hover:bg-dare-green'>
            {props.isReady ? <CheckCircleIcon data-cy="checkcircle-icon" className="text-black ml-6 mr-4 w-6" /> : <MinusCircleIcon data-cy="minuscircle-icon" className="text-black ml-6 mr-4 w-6" />}
            <span className="text-black font-bold">{props.children}</span>
            <ChevronRightIcon className="ml-auto text-black mr-6 w-6" />
        </div>
    </IonRouterLink>
}