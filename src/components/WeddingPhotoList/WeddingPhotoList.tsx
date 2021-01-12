import './WeddingPhotoList.css';
import { StyledCard } from '../App/styledComponents.styles'


type PhotoListData = {
	name: string;
	weddingId: number;
	photoList: {id: number, number: number, description: string, guest: number[] }[]
}

const WeddingPhotoList: React.FC<PhotoListData> = ({
	name,
	weddingId,
	photoList
}) => {
	console.log(typeof photoList)
	const displayPhotoList = photoList.map(photo => {
		return <div className="photoListDetails" key={photo.id}>
					<p className="photoNumber">Photo: {photo.number}</p>
					<p className="photoGuest">Guests: {photo.guest}</p>
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
