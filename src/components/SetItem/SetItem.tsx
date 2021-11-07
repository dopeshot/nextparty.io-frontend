import { IonRouterLink } from '@ionic/react';
import gradient from '../../assets/example.png';

export const SetItem: React.FC<{
  name: string,
  author: string,
  truthCount: number,
  dareCount: number,
  link: string
}> = ({ name, author, truthCount, dareCount, link }) => {
  return (
    <IonRouterLink routerLink={link}>
      <div className="flex mb-5">
        <img src={gradient} className="object-cover rounded-lg w-24 h-24 mr-2" />
        <div className="flex flex-col">
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <p className="text-gray-500 mb-3">by {author}</p>
          <div className="flex items-baseline">
            {/* Truth Count */}
            <p className="truth-label">W</p>
            <p className="text-gray-500 mr-3">{truthCount}</p>
            {/* Dare Count */}
            <p className="dare-label">P</p>
            <p className="text-gray-500">{dareCount}</p>
          </div>
        </div>
      </div>
    </IonRouterLink>
  )
}
