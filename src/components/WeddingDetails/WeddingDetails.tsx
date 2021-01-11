import './WeddingDetails.css';
import React, { useState, useEffect } from 'react';
import { individualWedding } from '../../weddingData';
import { getWeddingGuests } from '../../apiCalls';
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import { Link } from 'react-router-dom'
import { StyledButton } from '../App/styledComponents.styles'
import GuestList from '../GuestList/GuestList'
import PhotoListForm from '../PhotoListForm/PhotoListForm';

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
	const [editGuestListView, setGuestListView] = useState(false)
	const [editPhotoListView, setEditPhotoListView] = useState(false)
	const [guestsTEMP, setGuestsTEMP] = useState([])

	// probably should be GET for individualWedding and not just guests when BE is ready with that?
	// useEffect(() => {
	// 	const individualWeddingGuests = async () => {
	// 		const result = await getWeddingGuests()
	// 		console.log(result)
	// 		// sort for only this specific wedding by ID
	// 		setGuestsTEMP(result)
	// 	}
	// 	individualWeddingGuests()
	// }, [])
	const emailBody = `Dear ${name},
		it is time to fill out your family photo list! Please follow the link provided to complete the missing photo information. Feel free to reach out if you have any questions.
		LINK: https://matrimania-client.herokuapp.com/wedding/${weddingId}`

	const determineCurrentState = (view: string) => {
		if (view === "photoListView") {
			setDetailsView(false)
			setPhotoListView(true)
			setGuestListView(false)
			setEditPhotoListView(false)
		} else if (view === "editGuestListView") {
			setDetailsView(false)
			setPhotoListView(false)
			setGuestListView(true)
			setEditPhotoListView(false)
		} else if (view === "editPhotoListView") {
			setDetailsView(false)
			setPhotoListView(false)
			setGuestListView(false)
			setEditPhotoListView(true)
		} else {
			setDetailsView(true)
			setPhotoListView(false)
			setGuestListView(false)
			setEditPhotoListView(false)
		}
	}

	const displayCurrentView = () => {
		if (editGuestListView) {
				return (
					<GuestList
						changeView={determineCurrentState}
					/>
				)
		} else if (editPhotoListView) {
			return(
				<PhotoListForm 
					guests={familyPhotoList}
					changeView={determineCurrentState}
				/>
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
				<StyledButton onClick={() => determineCurrentState("editGuestListView")}>
					<div id="translate"></div>
					{photoList.length > 0 ?
						<a className="link" id="editListButton">Edit Photo Details</a> :
						<a className="link" id="addListButton">Add Photo List</a>
					}
				</StyledButton>
				{photoList.length > 0 &&
					<WeddingPhotoList
						name={individualWedding.name}
						weddingId={individualWedding.weddingId}
						photoList={individualWedding.photoList} /> }
				</div>
			}
			<section className="detailFormWrap">
				{displayCurrentView()}
			</section>
		</section>
	)
}
export default WeddingDetails;
