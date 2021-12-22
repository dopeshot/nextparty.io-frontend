import { faCheckCircle, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IonRouterLink } from "@ionic/react"

type ActionBlockType = {
    routerLink: string
    isReady: boolean
}

export const ActionBlock: React.FC<ActionBlockType> = ({ routerLink, isReady, children }) => {
    const statusIcon = isReady ? faCheckCircle : faCircle

    return <IonRouterLink routerLink={routerLink} className="">
        <div className='bg-white cursor-pointer rounded-lg h-16 w-full flex items-center mb-4'>
            <FontAwesomeIcon icon={statusIcon} className="text-black ml-6 mr-4" />
            <span className="text-black font-bold">{children}</span>
            <FontAwesomeIcon icon={faChevronRight} className="ml-auto text-black mr-6" />
        </div>
    </IonRouterLink>
}