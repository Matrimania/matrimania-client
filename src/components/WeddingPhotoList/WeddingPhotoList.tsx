import './WeddingPhotoList.css';

type PhotoList = {
	weddingId: number;
	photoList: {photoId: number, guests: string[], description: string}[]
}

const WeddingPhotoList: React.FC<PhotoList> = ({
	weddingId,
	photoList
}) => {

	return (
		<section className="detailsWrapper">
				<div>WeddingPhotoList</div>
		</section>
	)
}

export default WeddingPhotoList;