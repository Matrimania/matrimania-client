import './WeddingDetails.css';
import { individualWedding } from '../../weddingData'

type IndividualWedding = {
		weddingId: number;
  name: string;
  image: string;
  date: string;
  email: string;
  familyPhotoList: {name: string, photos: number[], phone: number}[] 
  photoList: {photoId: number, guests: string[], description: string}[]
}

const WeddingDetails: React.FC<IndividualWedding> = ({
	weddingId, 
	name,
	image, 
	date, 
	email, 
	familyPhotoList, 
	photoList
}) => {

	return (
		<section className="detailsWrapper">
			<div className="detailsHeader">
				<h1>{name} Wedding</h1>
				<h2>{date}</h2>
				<p className="email">Email: {email}</p>
				<p className="status">Status: {familyPhotoList.length === 0 ? "Pending" : "Received"}</p>
			</div>
			<section className="weddingImage">
				<img src={image} />
			</section>			
	<button className="button">{photoList.length > 0 ? 'View Photo List' : 'Request Photo List'}</button>
		</section>
	)
}
export default WeddingDetails;

// we need:
	// name of wedding
	//date
	//email
	//status
	//image - same as on vendor wedding page
	// request list/photo list button -conditional rendering?
	// create my guest list button
	// back button 
