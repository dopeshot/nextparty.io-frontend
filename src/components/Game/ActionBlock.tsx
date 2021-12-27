import { CheckCircleIcon, ChevronRightIcon, MinusCircleIcon } from "@heroicons/react/outline"
import { IonRouterLink } from "@ionic/react"

type ActionBlockType = {
    routerLink: string
    isReady: boolean
}

export const ActionBlock: React.FC<ActionBlockType> = ({ routerLink, isReady, children }) => {

    return <IonRouterLink routerLink={routerLink} className="">
        <div className='bg-white cursor-pointer rounded-lg h-16 w-full flex items-center mb-4 transition-colors hover:bg-dare-green'>
            {isReady ? <CheckCircleIcon className="text-black ml-6 mr-6 w-6" /> : <MinusCircleIcon className="text-black ml-6 mr-4 w-6" />}
            <span className="text-black font-bold">{children}</span>
            <ChevronRightIcon className="ml-auto text-black mr-6 w-6" />
        </div>
    </IonRouterLink>
}