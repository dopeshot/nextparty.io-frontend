import { IonItem } from '@ionic/react';
import gradient from '../../assets/example.png';

export const SetItem: React.FC<{
	name: string,
	author: string,
	truthCount: number,
	dareCount: number,
	link: string
}> = ({ name, author, truthCount, dareCount, link }) => {
	return (
		<IonItem lines="none" routerLink={link} className="mb-5 rounded-lg">
			<div className="flex items-center">
				<img src={gradient} className="object-cover rounded-lg w-24 h-24 mr-2" />
				<div className="flex flex-col">
					<h3 className="text-white text-xl font-bold">{name}</h3>
					<p className="text-lightgrey mb-3">by {author}</p>
					<div className="flex items-center">
						{/* Truth Count */}
						<span className="truth-label">T</span>
						<p className="text-lightgrey mr-3">{truthCount}</p>
						{/* Dare Count */}
						<p className="dare-label">D</p>
						<p className="text-lightgrey">{dareCount}</p>
					</div>
				</div>
			</div>
		</IonItem>

	)
}
