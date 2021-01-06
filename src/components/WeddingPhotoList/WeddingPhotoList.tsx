import './WeddingPhotoList.css';

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
		  return <div className="photoListDetails">
								<p className="photoNumber">Photo: {photo.photoId}</p>
								<p className="photoGuest">Guests: {photo.guests}</p>
								<p className="photoDescription">Description: {photo.description}</p>
						</div>	
		})


	return (
		<section className="detailsWrapper">
			<div>WeddingPhotoList</div>
			<section className="photoListWrapper">
				<h1>{name} Wedding</h1>
				<div className="photoListWrapper">
					{displayPhotoList}
				</div>
			</section>
		</section>
	)
}

export default WeddingPhotoList;