import './WeddingDetails.css';
import { individualWedding } from '../../weddingData'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import {Link} from 'react-router-dom'

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
			<div className="button" id="addWeddingButton">
				<div id="translate"></div>
				{photoList.length > 0 ? 
					<Link to={`/${weddingId}/photo-list`}>View Photo List</Link> :
					<Link to="/:weddingId/create-guest-list">Create Guest List</Link>
					}
			</div>		
		</section>
	)
}
export default WeddingDetails;


