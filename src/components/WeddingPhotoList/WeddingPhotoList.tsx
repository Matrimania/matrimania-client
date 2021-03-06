// Assets //
import './WeddingPhotoList.css';

// Components //
import { StyledCard } from '../App/styledComponents.styles'
import Photo from '../Photo/Photo';

// Types //
type PhotoListData = {
	name: string;
	weddingId: number;
	guestList: Guest[];
	photoList: Photo[];
};
type Guest = {
	id: number;
	name: string;
	phoneNumber: string;
	wedding: number;
};
type Photo = {
	id: number;
	number: number;
	description: string;
	guest: number[];
	weddingId: number;
};

const WeddingPhotoList: React.FC<PhotoListData> = ({
	name,
	weddingId,
	guestList,
	photoList
}) => {

	// Variables //
	const getGuestNames = (guestIds:any) => {
		return guestIds.map((guest:any) => {
			const match = guestList.find((person:any) => person.id === guest)
			if(match){
				return match.name
			}
		})
	};

	const displayPhotoList = photoList.map(photo => {
		const guests = getGuestNames(photo.guest)
		return (
			<Photo
				key={photo.id}
				id={photo.id}
				photoNumber={photo.number}
				guests={guests}
				description={photo.description}
				location={'details'}
			/>
		)
	});

	// Render //
	return (
		<section className="weddingPhotoListWrapper">
			<StyledCard contents="list" className="photoListWrapper">
			<div className="photoListHeader">Wedding Photos</div>
				<div className="photoListWrapper">
					{displayPhotoList}
				</div>
			</StyledCard>
		</section>
	)
};

export default WeddingPhotoList;
