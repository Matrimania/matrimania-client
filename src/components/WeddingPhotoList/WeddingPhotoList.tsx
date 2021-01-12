import './WeddingPhotoList.css';
import { StyledCard } from '../App/styledComponents.styles'


type PhotoListData = {
	name: string;
	weddingId: number;
	photoList: {photoId: number, guests: string[], description: string}[]
}

const WeddingPhotoList: React.FC<PhotoListData> = ({
	name,
	weddingId,
	photoList
}) => {

	const displayPhotoList = photoList.map(photo => {
		  return <div className="photoListDetails" key={photo.photoId}>
								<p className="photoNumber">Photo: {photo.photoId}</p>
								<p className="photoGuest">Guests: {photo.guests}</p>
								<p className="photoDescription">Description: {photo.description}</p>
						</div>
		})


	return (
		<section className="weddingPhotoListWrapper">
			<StyledCard contents="list" className="photoListWrapper">
<<<<<<< HEAD
			<div className="photoListHeader">Your Photo List</div>
=======
			<div className="photoListHeader">WeddingPhotoList</div>
>>>>>>> d879c012... Pass weddingList title test in WeddingDetails.test
				{/* <h1>{name} Wedding</h1> */}
				<div className="photoListWrapper">
					{displayPhotoList}
				</div>
			</StyledCard>
		</section>
	)
}

export default WeddingPhotoList;
