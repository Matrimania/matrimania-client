// Assets //
import './PhotoShootView.css';
import React, { useState } from 'react';
import done from '../../assets/goodWork.png';
import start from '../../assets/startShoot.png';

// Components //
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles';
import Photo from '../Photo/Photo';

// Types //
type PhotoShootData = {
	name: string;
	weddingId: number;
	photoList: {id: number, number: number, description: string, guest: number[]}[];
	guests: {id: number, name: string, phoneNumber: string, wedding: number}[];
  changeView(view: string): void;
}

const PhotoShootView: React.FC<PhotoShootData> = ({
  name, // last name of couple
  weddingId,
  photoList,
  guests,
  changeView
}) => {

	// State //
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [textBody, setTextBody] = useState('')
	const [view, setView] = useState('notify')
	const [carousel, setCarousel] = useState(0)

	// Submission Functions //
	const sendNotifications = (event: React.FormEvent) => {
		event.preventDefault();
		guests.forEach((guest: any) => {
			const guestPhotos = createGuestPhotoList(guest.id)
			const photos = guestPhotos.toString().split(",").join(", ")
			const message = `Hello ${guest.name}, Thank you for attending the ${name} wedding.
			The lovely couple would like you to meet them for photos ${time} ${location}
			You will be participating in photo numbers ${photos}`
			const phoneNumber = `+1${guest.phone}`
			// POST request to Twilio to send message
		})
		clearInputs();
		setView('shoot')
	};

	// Display Functions //
	const displayCarousel = () => {
		if(carousel === 0) {
			return (
				<StyledCard contents="shoot">
					<img src={start} className="carouselImg" alt="click the next button to get started"/>
				</StyledCard>
			)
		}
		if(carousel > photoList.length) {
			return (
				<StyledCard contents="shoot">
					<img src={done} className="carouselImg" alt="Good work! You're all done!"/>
				</StyledCard>
			)
		}
		const currentPhoto = photoList.find((photo: any) => photo.number === carousel)
		if(currentPhoto) {
			const participants:string[] = []
			const filtered = currentPhoto.guest.forEach((num:any) => {
				const match = guests.find((person: any) => person.id === num)
				if (match) {
					participants.push(match.name)
				}
			})
			if(participants.length > 0) {
				return (
					<StyledCard contents="shoot">
						<article className="photoShootCard">
							<Photo
							id={currentPhoto.id}
							photoNumber={currentPhoto.number}
							guests={participants}
							description={currentPhoto.description}
							location={'shoot'}
							/>
							<div>{`${photoList.length - currentPhoto.number} Photos left`}</div>
						</article>
					</StyledCard>
				)
			}
		} else {
			return "Great job! You're done!"
		}
	};

	// Helper Functions //
	const createGuestPhotoList = (guestId:number) => {
		const filtered = photoList.filter((photo:any) => photo.guest.includes(guestId))
		if(filtered.length > 0) {
			return filtered.map((pic:any) => pic.number)
		} else {
			return [0]
		}
	};

  const clearInputs = () => {
    setTime('')
    setLocation('')
  };

	// Render //
  return (
    <section className="photoShootWrapper">
		{view === "notify" &&
			<>
			<article className="instructionWrap">
				<h1 id="shootTitle" className="weddingTitle">Ready, Set, Click.</h1>
				<h2 id="shootBlurb" className="weddingDate">Clicking the <span style={{color: '#6f896d', fontWeight: 'bold'}}>{` 'Notify Guests'`}</span> button below will:</h2>
				<h2 id="shootDirections" className="weddingDate">1. Text message all photo participants.<br></br><br></br>2. Display the details for each photo.</h2>
			</article>
			<section className="instructions">Sample Message:<br></br><br></br>
				<p className="textBody">{`Hello [Guest's Name], Thank you for attending the ${name} wedding. The lovely couple would like you to meet them for photos ${time !== "" ? time : '[when]'} ${location !== "" ? location : '[where]'}. You will be participating in photo numbers...`}
				</p>
			</section>
			<form className="shootFormWrapper">
				<label htmlFor="when">When should guests meet? (ex: "after the ceremony")</label>
				<input
				id="shootInput"
				type='text'
				placeholder='When?'
				name='when'
				value={time}
				onChange={event => setTime(event.target.value)}
				/>
				<label htmlFor="where">Where should guests meet? (ex: "at the ceremony site")</label>
				<input
				id="shootInput"
				type='text'
				placeholder='Where?'
				name='where'
				value={location}
				onChange={event => setLocation(event.target.value)}
				/>
				<StyledButton onClick={event => sendNotifications(event)}>
					<div id="translate"></div>
					<h3 className="link">Notify Guests</h3>
				</StyledButton>
			</form>
			</>}
			{view === "shoot" &&
				<>
				<article className="carouselWrap">
					<h1 id="shootTitle2" className="weddingTitle">Ready, Set, Click.</h1>
						{displayCarousel()}
					<section className="buttonWrapper">
					{(carousel > 0 && carousel <= photoList.length + 1) &&
						<BackButton onClick={() => setCarousel(carousel-1)}>
							<div id="arrow">{"<<"}</div>
							<h3 className="link">{"< Prev"}</h3>
						</BackButton>
					}
					{(carousel >= 0 && carousel < photoList.length + 1) &&
						<BackButton onClick={() => setCarousel(carousel+1)}>
							<div id="arrow">{">>"}</div>
							<h3 className="link">{"Next >"}</h3>
						</BackButton>
					}
					</section>
				</article>
				</>}
    </section>
  )
};

export default PhotoShootView;
