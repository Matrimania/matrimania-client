import './WeddingDetails.css';
import React, { useState, useEffect } from 'react';
import { getSingleWeddingGuests, getSingleWeddingPhotos, getWeddings } from '../../apiCalls';
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import PhotoShootView from '../PhotoShootView/PhotoShootView';
import { StyledButton, DetailsWrapper, DetailsFormWrapper } from '../App/styledComponents.styles'
import GuestList from '../GuestList/GuestList'
import dayjs from 'dayjs';
import PhotoListForm from '../PhotoListForm/PhotoListForm';


type Props = {
  weddingId: number;
}
type Guest = {
	id: number;
	name: string;
	phoneNumber: string;
	wedding: number;
}
type Photo = {
	id: number;
	number: number;
	description: string;
	guest: number[];
}

const WeddingDetails: React.FC<Props> = ({
	weddingId
}) => {
	const [errorMessage, setErrorMessage] = useState({photoError: '', guestError: '', weddingError: ''})
	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [detailsView, setDetailsView] = useState(true)
	const [photoShootView, setPhotoShootView] = useState(false)
	const [editGuestListView, setGuestListView] = useState(false)
	const [editPhotoListView, setEditPhotoListView] = useState(false)
	const [currentWeddingGuests, setCurrentWeddingGuests] = useState<Guest[]>([])
	const [currentWeddingPhotos, setCurrentWeddingPhotos] = useState<Photo[]>([])
	const [weddingData, setWeddingData] = useState({id: 0, name: "", email: "", date: "", image: ""});


	useEffect(() => {
		setIsLoading(true)
		getWeddingGuests()
		getWeddingPhotos()
		getAllWeddings()
	}, [detailsView, photoShootView, editGuestListView, editPhotoListView])

	const getWeddingPhotos = async () => {
		const photoResult = await getSingleWeddingPhotos(weddingId)
		if(photoResult === "No photos found") {
			setHasError(true)
			setErrorMessage({...errorMessage, weddingError: photoResult})
		} else {
			setCurrentWeddingPhotos(photoResult)
		}
	}
	const getWeddingGuests = async () => {
		const guestResult = await getSingleWeddingGuests(weddingId)
		if(guestResult === "No guests found") {
			setHasError(true)
			setErrorMessage({...errorMessage, guestError: guestResult})
		} else {
			setCurrentWeddingGuests(guestResult)
		}
		return guestResult
	}

	const getAllWeddings = () => {
		const allWeddings = async () => {
			const weddingResult = await getWeddings()
			if(weddingResult === "No weddings found") {
				setHasError(true)
				setErrorMessage({...errorMessage, weddingError: weddingResult})
			} else {
				const currentWedding = weddingResult.find((wed:any) => wed.id === weddingId)
				setWeddingData(currentWedding)
			}
		}
		allWeddings()
		setIsLoading(false)
	}


	const emailBody = `It is time to fill out your family photo list! Please follow the link provided to complete the missing photo information. Feel free to reach out if you have any questions.
		LINK: https://matrimania-client.herokuapp.com/wedding/${weddingData.id}`

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

	const weddingDate = dayjs(weddingData.date).format("MM/DD/YYYY")

	const displayCurrentView = () => {
		if (editGuestListView) {
				return (
					<GuestList
						loading={isLoading}
						guestList={currentWeddingGuests}
						changeView={determineCurrentState}
						weddingId={weddingData.id}
						updateGuests={getWeddingGuests}
					/>
				)
		} else if(photoShootView) {
				return (
					<PhotoShootView
						name={weddingData.name}
						weddingId={weddingId}
						photoList={currentWeddingPhotos}
						guests={currentWeddingGuests}
						changeView={determineCurrentState}
					/>
				)
		} else if (editPhotoListView) {
			return(
				<PhotoListForm
					loading={isLoading}
					weddingId={weddingData.id}
					guests={currentWeddingGuests}
					updateGuests={getWeddingGuests}
					updatePhotos={getWeddingPhotos}
					photoList={currentWeddingPhotos}
					changeView={determineCurrentState}
				/>
			)
		} else {
						return (
						<section className="detailImageWrap">
								<img className="detailImage" alt="detailImage" src={weddingData.image} />
						</section>
				)
		}
}

	return (
		<DetailsWrapper contents={detailsView ? 'details' : 'other'}>
			{detailsView &&
				<div className="detailsHeader">
          <article className="weddingInfo">
    				<h1 className="weddingTitle">{weddingData.name} Wedding</h1>
    				<h2 className="weddingDate">{weddingDate}</h2>
    				<p className="weddingDetails" data-testid="emailSection">Email: {weddingData.email}</p>
    				<p className="weddingDetails" data-testid="status">Status: {currentWeddingGuests.length === 0 ? "Pending" : "Received"}</p>
          </article>
          <section className="buttonWrap">
				{currentWeddingPhotos.length === 0 &&
					<StyledButton>
						<div id="translate"></div>
						<a className="link" id="requestListButton" href={`mailto:${weddingData.email}?subject=Family Photo List&body=${emailBody}`}>Request Photo List</a>
					</StyledButton>
				}
				<StyledButton onClick={() => determineCurrentState("editGuestListView")}>
					<div id="translate"></div>
					{currentWeddingPhotos.length > 0 ?
						<h3 className="link" id="editListButton">Edit Photo Details</h3> :
						<h3 className="link" id="addListButton">Add Photo List</h3>
					}
				</StyledButton>
				{weddingDate === dayjs().format("MM/DD/YYYY") &&
					<StyledButton onClick={() => determineCurrentState("photoShootView")}>
						<div id="translate"></div>
						<h3 className="link">Start Photo Session</h3>
					</StyledButton>
				}
        </section>
				{currentWeddingPhotos.length > 0 &&
					<WeddingPhotoList
						name={weddingData.name}
						weddingId={weddingData.id}
						photoList={currentWeddingPhotos}
						guestList={currentWeddingGuests} /> }
				</div>
			}
			<DetailsFormWrapper contents={detailsView ? 'details' : 'other'}>
				{displayCurrentView()}
			</DetailsFormWrapper>
		</DetailsWrapper>
	)
}
export default WeddingDetails;
