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
			<div className="photoListHeader">WeddingPhotoList</div>
				{/* <h1>{name} Wedding</h1> */}
				<div className="photoListWrapper">
					{displayPhotoList}
				</div>
			</StyledCard>
		</section>
	)
}

export default WeddingPhotoList;
