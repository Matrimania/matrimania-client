import './WeddingDetails.css';
import React, { useState, useEffect, useMemo } from 'react';
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList';
import PhotoShootView from '../PhotoShootView/PhotoShootView';
import { StyledButton, DetailsWrapper, DetailsFormWrapper } from '../App/styledComponents.styles';
import GuestList from '../GuestList/GuestList';
import dayjs from 'dayjs';
import PhotoListForm from '../PhotoListForm/PhotoListForm';
import { Link } from 'react-router-dom';


type Props = {
  weddingId: number;
  currentWeddingData: Wedding;
  guests: Guest[];
  photos: Photo[];
  deleteSingleWedding: any
  loadWeddingData: any
  error: Error
  updateGuests: any
  updatePhotoList: any
}
type Error = {
  photoError: string;
  guestError: string;
  weddingError: string
}
type Wedding = {
  id: number;
  name: string;
  email: string;
  date: string;
  image: string;
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
	weddingId: number;
}

const WeddingDetails: React.FC<Props> = ({
	weddingId,
  currentWeddingData,
  guests,
  photos,
	deleteSingleWedding,
  loadWeddingData,
  error,
  updateGuests,
  updatePhotoList
}) => {
	const [errorMessage, setErrorMessage] = useState(error)
	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [detailsView, setDetailsView] = useState(true)
	const [photoShootView, setPhotoShootView] = useState(false)
	const [editGuestListView, setGuestListView] = useState(false)
	const [editPhotoListView, setEditPhotoListView] = useState(false)
	const [currentWeddingGuests, setCurrentWeddingGuests] = useState(guests)
	const [currentWeddingPhotos, setCurrentWeddingPhotos] = useState(photos)
	const [weddingData, setWeddingData] = useState(currentWeddingData);


	useEffect(() => {
    window.scrollTo(0, 0)
		setIsLoading(true)
    loadWeddingData(weddingId)
    determineError()
    setIsLoading(false)
	}, [detailsView, photoShootView, editGuestListView, editPhotoListView])

  useMemo(() => setWeddingData(currentWeddingData), [currentWeddingData])
  useMemo(() => setCurrentWeddingGuests(guests), [guests])
  useMemo(() => setCurrentWeddingPhotos(photos), [photos])

  const determineError = () => {
    if(error.photoError || error.guestError || error.weddingError){
      setHasError(true)
    } else {
      setHasError(false)
    }
  }


	const emailBody = `It is time to fill out your family photo list! Please follow the link provided to complete the missing photo information. Feel free to reach out if you have any questions.
		LINK: https://matrimania-client.herokuapp.com/wedding/${weddingData.id}`

	const determineCurrentState = (view: string) => {
		if (view === "photoShootView") {
			setDetailsView(false)
			setPhotoShootView(true)
			setGuestListView(false)
			setEditPhotoListView(false)
      window.scrollTo(0, 0)
		} else if (view === "editGuestListView") {
			setDetailsView(false)
			setPhotoShootView(false)
			setGuestListView(true)
			setEditPhotoListView(false)
      window.scrollTo(0, 0)
		} else if (view === "editPhotoListView") {
			setDetailsView(false)
			setPhotoShootView(false)
			setGuestListView(false)
			setEditPhotoListView(true)
      window.scrollTo(0, 0)
		} else {
			setDetailsView(true)
			setPhotoShootView(false)
			setGuestListView(false)
			setEditPhotoListView(false)
      window.scrollTo(0, 0)
		}
	}

  const isToday = () => {
    return dayjs(weddingData.date).format("MM/DD/YYYY") === dayjs().format("MM/DD/YYYY") ? true : false
  }

  const determineContents = () => {
    if(detailsView){
      return 'details'
    } else if(photoShootView){
      return 'shoot'
    } else {
      return 'other'
    }
  }
	const displayCurrentView = () => {
		if (editGuestListView) {
				return (
					<GuestList
						loading={isLoading}
						guestList={currentWeddingGuests}
						changeView={determineCurrentState}
						weddingId={weddingData.id}
						updateGuests={updateGuests}
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
					photoList={currentWeddingPhotos}
					changeView={determineCurrentState}
					updatePhotoList={updatePhotoList}
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
		<DetailsWrapper contents={determineContents()}>
			{detailsView &&
				<div className="detailsHeader">
          <article className="weddingInfo">
    				<h1 className="weddingTitle">{weddingData.name} Wedding</h1>
    				<h2 className="weddingDate">{dayjs(weddingData.date).format("MM/DD/YYYY")}</h2>
    				<p className="weddingDetails" data-testid="emailSection">Email: {weddingData.email}</p>
    				<p className="weddingDetails" data-testid="status">Status: {currentWeddingGuests.length === 0 ? "Pending" : "Received"}</p>
          </article>
          <section className="buttonWrap">
					<Link to={`/`}>
						<StyledButton onClick={() => deleteSingleWedding(weddingData.id)}>
							<div id="translate"></div>
							<h3 className="link">Delete Wedding</h3>
						</StyledButton>
					</Link>
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
				{isToday() &&
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
			<DetailsFormWrapper
        contents={determineContents()}>
				{displayCurrentView()}
			</DetailsFormWrapper>
		</DetailsWrapper>
	)
}
export default WeddingDetails;
