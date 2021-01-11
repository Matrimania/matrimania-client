import './WeddingDetails.css';
import React, { useState, useEffect } from 'react';
import { individualWedding } from '../../weddingData';
import { getWeddingGuests } from '../../apiCalls';
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import PhotoShootView from '../PhotoShootView/PhotoShootView';
import { Link } from 'react-router-dom'
import { StyledButton } from '../App/styledComponents.styles'
import GuestList from '../GuestList/GuestList'
import Guest from '../Guest/Guest';
import dayjs from 'dayjs';
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
	const [photoShootView, setPhotoShootView] = useState(false)
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
		if (view === "photoShootView") {
			setDetailsView(false)
			setPhotoShootView(true)
			setGuestListView(false)
			setEditPhotoListView(false)
		} else if (view === "editGuestListView") {
			setDetailsView(false)
			setPhotoShootView(false)
			setGuestListView(true)
			setEditPhotoListView(false)
		} else if (view === "editPhotoListView") {
			setDetailsView(false)
			setPhotoShootView(false)
			setGuestListView(false)
			setEditPhotoListView(true)
		} else {
			setDetailsView(true)
			setPhotoShootView(false)
			setGuestListView(false)
			setEditPhotoListView(false)
		}
	}

	const weddingDate = dayjs(date).format("MM/DD/YYYY")

	const displayCurrentView = () => {
		if (editGuestListView) {
<<<<<<< HEAD
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
=======
				return (
					<GuestList
						changeView={determineCurrentState}
					/>
				)
		} else if (photoShootView) {
				return (
					<PhotoShootView
						name={individualWedding.name}
						weddingId={individualWedding.weddingId}
						photoList={individualWedding.photoList}
						guests={familyPhotoList}
						changeView={determineCurrentState}
					/>
				)
		} else if (editPhotoListView) {
			return (
				<PhotoListForm
					guests={familyPhotoList}
					changeView={determineCurrentState}
				/>
			)
>>>>>>> a4327cfd... Resolve merge conflicts
		} else {
						return (
						<section className="detailImageWrap">
								<img className="detailImage" alt="detailImage" src={image} />
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
<<<<<<< HEAD
=======
				<PhotoListForm
					guests={familyPhotoList}
					changeView={determineCurrentState}
				/>
				{weddingDate === dayjs().format("MM/DD/YYYY") &&
					<StyledButton onClick={() => determineCurrentState("photoShootView")}>
						<div id="translate"></div>
						<a className="link">Start Photo Session</a>
					</StyledButton>
				}
>>>>>>> a4327cfd... Resolve merge conflicts
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
