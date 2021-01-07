import './WeddingDetails.css';
import React, { useState } from 'react'; 
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

		const [detailsView, setDetailsView] = useState(true)
		const [photoListView, setPhotoListView] = useState(false)
		const [guestListView, setGuestListView] = useState(false)

		const determineCurrentState = (e: React.MouseEvent<HTMLAnchorElement>) => {
			setDetailsView(false)
			let buttonTarget: HTMLElement | null = document.getElementById("photoListButton")
			if (buttonTarget !== null) {
				console.log(buttonTarget.innerHTML)
					buttonTarget.innerHTML === 'View Photo List' && setPhotoListView(true) 
			} else {
				console.log('dammit')
			}
			
		}

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
						<a className="link" id="photoListButton" onClick={(e) => determineCurrentState(e)}>View Photo List</a> :
						<Link className="link" to="/:weddingId/create-guest-list">Create Guest List</Link>
					}
				</StyledButton>
			</div>
			<section className="detailImageWrap">
				{photoListView && 
					<WeddingPhotoList 
					name={individualWedding.name}
					weddingId={individualWedding.weddingId}
					photoList={individualWedding.photoList} /> 
				}
				<img className="detailImage" src={image} />
			</section>
		</section>
	)
}
export default WeddingDetails;
