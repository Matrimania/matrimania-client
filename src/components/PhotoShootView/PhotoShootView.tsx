import React, { useState } from 'react';
import './PhotoShootView.css'
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles'
import Photo from '../Photo/Photo';


type PhotoShootData = {
	name: string;
	weddingId: number;
	photoList: any;
	guests: any;
  changeView: any;
}

const PhotoShootView: React.FC<PhotoShootData> = ({
  name, // last name of couple
  weddingId, // weddingId
  photoList, // list of photos for specific wedding
  guests, // list of guests for specific wedding
  changeView // function that changes view in WeddingDetails
}) => {

  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [textBody, setTextBody] = useState('')
	const [view, setView] = useState('notify')
	const [carousel, setCarousel] = useState(0)

  const sendNotifications = (event: React.FormEvent) => {
    event.preventDefault();
		guests.forEach((guest: any) => {
			const photos = guest.photos.toString().split(",").join(", ")
			const message = `Hello ${guest.name}, Thank you for attending the ${name} wedding.
			The lovely couple would like you to meet them for photos ${time} ${location}
			You will be participating in photo numbers ${photos}`
			const phoneNumber = `+1${guest.phone}`
			// POST request to Twilio to send message
		})
    clearInputs();
		setView('shoot')
  }

  const clearInputs = () => {
    setTime('')
    setLocation('')
  }

// Will change the photo with the carousel (need more info from the api to get it to work)
	// const displayCarousel = () => {
	// 	const currentPhoto = photoList.find((photo: any) => photo.photoNumber === carousel + 1)
	// 	const participants = currentPhoto.guests.reduce((guest:any, acc:any) => {
	// 		const match = guests.find((person: any) => person.id === guest)
	// 		acc.push(match.name)
	// 		return acc
	// 	}, [])
	// 	return (
	// 		<StyledCard contents="photoShoot">
	// 			<article className="photoShootCard">
	// 				<Photo
	// 					id={currentPhoto.id}
	// 					photoNumber={currentPhoto.photoNumber}
	// 					guests={participants}
	// 					description={currentPhoto.description}
	// 				/>
	// 			</article>
	// 		</StyledCard>
	// 	)
	// }


  return (
    <section className="photoShootWrapper">
		{view === "notify" &&
			<>
			<article className="instructionWrap">
				<h1 className="weddingTitle" style={{fontSize: '3vw', paddingBottom: '0%'}}>Ready, Set, Click.</h1>
				<h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%'}}>Clicking the <span style={{color: '#6f896d', fontWeight: 'bold'}}>{` 'Notify Guests'`}</span> button below will:</h2>
				<h2 className="weddingDate">1. Text message all photo participants.<br></br><br></br>2. Display the details for each photo.</h2>
			</article>
			<section className="instructions">Sample Message:<br></br><br></br>
				<p className="textBody">{`Hello [Guest's Name], Thank you for attending the ${name} wedding.`}
					<br></br>{`The lovely couple would like you to meet them for photos ${time !== "" ? time : '[when]'} ${location !== "" ? location : '[where]'}.`}
					<br></br>{`You will be participating in photo numbers...`}
				</p>
			</section>
			<form className="weddingFormWrapper">
				<label htmlFor="when">When should guests meet? (ex: "after the ceremony")</label>
				<input
				style={{width: '25%', margin: '0% 0% 1% 0%'}}
				type='text'
				placeholder='When?'
				name='when'
				value={time}
				onChange={event => setTime(event.target.value)}
				/>
				<label htmlFor="where">Where should guests meet? (ex: "at the ceremony site")</label>
				<input
				style={{width: '25%', margin: '0% 0% 1% 0%'}}
				type='text'
				placeholder='Where?'
				name='where'
				value={location}
				onChange={event => setLocation(event.target.value)}
				/>
				<StyledButton onClick={event => sendNotifications(event)}>
					<div id="translate"></div>
					<a className="link">Notify Guests</a>
				</StyledButton>
			</form>
			</>}
			{view === "shoot" &&
				<>
				<article className="carouselWrap">
					<h1 className="weddingTitle" style={{fontSize: '3vw', paddingBottom: '0%'}}>Ready, Set, Click.</h1>
					<StyledCard contents="photoShoot">
						<article className="photoShootCard">
							<Photo
								id={1}
								photoNumber={1}
								guests={["jim", "pam", "michael"]}
								description={"the whole crew"}
							/>
						</article>
					</StyledCard>
					<section className="buttonWrapper">
						<BackButton onClick={() => setCarousel(carousel-1)}>
							<div id="arrow">{"<<"}</div>
							<a className="link">{"< Prev"}</a>
						</BackButton>
						<BackButton onClick={() => setCarousel(carousel+1)}>
							<div id="arrow">{">>"}</div>
							<a className="link">{"Next >"}</a>
						</BackButton>
					</section>
				</article>
				</>}
    </section>
  )
}

export default PhotoShootView;
