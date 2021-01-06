import './WeddingDetails.css';
import { individualWedding } from '../../weddingData'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import {Link} from 'react-router-dom'
import { StyledButton } from '../App/styledComponents.styles'

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
				<h1 className="weddingTitle">{name} Wedding</h1>
				<h2 className="weddingDate">{date}</h2>
				<p className="weddingDetails">Email: {email}</p>
				<p className="weddingDetails">Status: {familyPhotoList.length === 0 ? "Pending" : "Received"}</p>
				<StyledButton>
					<div id="translate"></div>
					{photoList.length > 0 ?
						<Link className="link" to={`/${weddingId}/photo-list`}>View Photo List</Link> :
						<Link className="link" to="/:weddingId/create-guest-list">Create Guest List</Link>
					}
				</StyledButton>
			</div>
			<section className="detailImageWrap">
				<img className="detailImage" src={image} />
			</section>
		</section>
	)
}
export default WeddingDetails;
