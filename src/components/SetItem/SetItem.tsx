import { PlayIcon } from '@heroicons/react/outline';
import { IonItem } from '@ionic/react';
import { getFrontendOrigin } from '../../services/utilities/getFrontendOrigin';
import { SetCategory } from '../../shared/types/SetCategory';
import { DareLabel } from './DareLabel';
import { TruthLabel } from './TruthLabel';

type SetItemProps = {
	name: string
	author?: string
	truthCount: number
	dareCount: number
	category: SetCategory
	link?: string
	onClick?: () => void
	dataCy?: string
	played: number
}

export const SetItem: React.FC<SetItemProps> = ({ name, author, truthCount, dareCount, link, dataCy, onClick, category, played }) => {

	return (
		<IonItem data-cy={dataCy} lines="none" routerLink={link ?? '#'} onClick={onClick} className="mb-5 rounded-lg">
			<div className="flex items-center">
				<img src={`${getFrontendOrigin}/assets/themes/${category}.svg`} alt={`${name} by ${author}`} className={`row-start-1 col-start-1 object-cover rounded-lg ${author ? "w-24 h-24" : "w-20 h-20"}`} />
				<div className="flex flex-col ml-3">
					<h3 className={`text-light-500 font-bold ${author ? "text-xl" : "text-lg mb-2"}`}>{name}</h3>
					{author && <p className="text-light-600 mb-3">by {author}</p>}
					<div className="flex items-center">
						{/* Truth Count */}
						<TruthLabel category={category} />
						<p className="text-light-600 mr-3">{truthCount}</p>
						{/* Dare Count */}
						<DareLabel category={category} />
						<p className="text-light-600 mr-3">{dareCount}</p>
						{/* Played Count */}
						<PlayIcon className="w-6 h-6 text-light-600" />
						<p className="text-light-600 ml-1">{played}</p>
					</div>
				</div>
			</div>
		</IonItem>

	)
}