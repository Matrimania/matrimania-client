import './WeddingDetails.css';
import React, { useState } from 'react';
import { individualWedding } from '../../weddingData'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import { Link } from 'react-router-dom'
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
		const [editListView, setEditListView] = useState(false)
		const emailBody = `Dear ${name},
			it is time to fill out your family photo list! Please follow the link provided to complete the missing photo information. Feel free to reach out if you have any questions.
			LINK: https://matrimania-client.herokuapp.com/wedding/${weddingId}`

		const determineCurrentState = (e: React.MouseEvent<HTMLAnchorElement>, view: string) => {
			if (view === "photoView") {
				setDetailsView(false)
				setPhotoListView(true)
				setEditListView(false)
			} else if (view === "editListView") {
				setDetailsView(false)
				setPhotoListView(false)
				setEditListView(true)
			} else {
				setDetailsView(true)
				setPhotoListView(false)
				setEditListView(false)
			}
		}

		const displayCurrentView = () => {
			if (editListView) {
					return (
						<GuestList />
					)
			} else {
					return (
					<section className="detailImageWrap">
						<img className="detailImage" src={image} />
					</section>
				)
			}
		}

	return (
		<section className="detailsWrapper">
			{detailsView &&
				<div className="detailsHeader">
				<h1 className="weddingTitle">{name} Wedding</h1>
				<h2 className="weddingDate">{date}</h2>
				<p className="weddingDetails">Email: {email}</p>
				<p className="weddingDetails">Status: {familyPhotoList.length === 0 ? "Pending" : "Received"}</p>
				{photoList.length === 0 &&
					<StyledButton>
					<div id="translate"></div>
					<a className="link" id="requestListButton" href={`mailto:${email}?subject=Family Photo List&body=${emailBody}`}>Request Photo List</a>
					</StyledButton>
				}
				<StyledButton>
				<div id="translate"></div>
				{photoList.length > 0 ?
					<a className="link" id="editListButton" onClick={(e) => determineCurrentState(e, "editListView")}>Edit Photo Details</a> :
					<a className="link" id="addListButton" onClick={(e) => determineCurrentState(e, "editListView")}>Add Photo List</a>
				}
				</StyledButton>
				{photoList.length > 0 &&
					<div>
						<WeddingPhotoList
							name={individualWedding.name}
							weddingId={individualWedding.weddingId}
							photoList={individualWedding.photoList} />
					</div>
				}
				</div>
			}
			<section className="detailFormWrap">
				{displayCurrentView()}
			</section>
		</section>
	)
}
export default WeddingDetails;
