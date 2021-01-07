import './WeddingDetails.css';
import React, { useState } from 'react';
import { individualWedding } from '../../weddingData'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import {Link} from 'react-router-dom'
import { StyledButton } from '../App/styledComponents.styles'
import GuestList from '../GuestList/GuestList'
import Guest from '../Guest/Guest';

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
		const [requestListView, setRequestListView] = useState(false)
		const [editListView, setEditListView] = useState(false)

		const determineCurrentState = (e: React.MouseEvent<HTMLAnchorElement>, view: string) => {
			if (view === "photoView") {
				setDetailsView(false)
				setPhotoListView(true)
				setRequestListView(false)
				setEditListView(false)
			} else if (view === "requestListView") {
				setDetailsView(false)
				setPhotoListView(false)
				setRequestListView(true)
				setEditListView(false)
			} else if (view === "editListView") {
				setDetailsView(false)
				setPhotoListView(false)
				setRequestListView(false)
				setEditListView(true)
			} else {
				setDetailsView(true)
				setPhotoListView(false)
				setRequestListView(false)
				setEditListView(false)
			}
		}

		const displayCurrentView = () => {
			if (editListView) {
					return (
						<GuestList />
					)
			} else if (requestListView) {
					return <div>Request List View</div>
			} else {
					return <img className="detailImage" src={image} />
			}
		}

		//function for each view state
		// new component for request photolist- will be form 
				//email the client- *mailTo or PHP 
		//weddingPhotoList component if photoListView is true
		//editList component if editListView === GuestList component is true

		// add third button - message guests
			// conditional render if current date is === wedding date
			// will send messages to people in photos
			// possibly with 2 clicks - one will change innerText - second will send text

	return (
		<section className="detailsWrapper">
			<div className="detailsHeader">
				<h1 className="weddingTitle">{name} Wedding</h1>
				<h2 className="weddingDate">{date}</h2>
				<p className="weddingDetails">Email: {email}</p>
				<p className="weddingDetails">Status: {familyPhotoList.length === 0 ? "Pending" : "Received"}</p>
					{photoList.length === 0 &&
					<StyledButton>
						<div id="translate"></div>
								<a className="link" id="requestListButton" onClick={(e) => determineCurrentState(e, "requestListView")}>Request Photo List</a>
						</StyledButton>
					}
				<StyledButton>
					<div id="translate"></div>
					{photoList.length > 0 ?
						<a className="link" id="editListButton" onClick={(e) => determineCurrentState(e, "editListView")}>Edit Photo Details</a> :
						<a className="link" id="addListButton" onClick={(e) => determineCurrentState(e, "editListView")}>Add Photo List</a>
					}
				</StyledButton>
			</div>
			{photoList.length > 0 &&
				 <div>
							<WeddingPhotoList
							name={individualWedding.name}
							weddingId={individualWedding.weddingId}
							photoList={individualWedding.photoList} />
						</div>
				}
			<section className="detailImageWrap">
				{displayCurrentView()}
			</section>
		</section>
	)
}
export default WeddingDetails;
