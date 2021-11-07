import { IonRouterLink } from '@ionic/react';
import { Link } from 'react-router-dom';
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
            <small className="text-yellow-400 text-opacity-50 border-2 border-yellow-400 border-opacity-25 text-center h-6 w-6 mr-2">W</small>
            <small className="text-gray-500 mr-3">{truthCount}</small>
            {/* Dare Count */}
            <small className="text-green-400 text-opacity-50 border-2 border-green-400 border-opacity-25 text-center h-6 w-6 mr-2">P</small>
            <p className="text-gray-500">{dareCount}</p>
          </div>
        </div>
      </div>
    </IonRouterLink>
  )
}
