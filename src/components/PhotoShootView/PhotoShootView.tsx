import React, { useState } from 'react';
import './PhotoShootView.css'
import { StyledButton } from '../App/styledComponents.styles'

type PhotoShootData = {
	name: string;
	weddingId: number;
	photoList: {photoId: number, guests: string[], description: string}[];
  guests: any;
  changeView: any;
}



const PhotoShootView: React.FC<PhotoShootData> = ({
  name,
  weddingId,
  photoList,
  guests,
  changeView
}) => {

  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [textBody, setTextBody] = useState('')
	const [view, setView] = useState('notify')

  const sendNotifications = (event: React.FormEvent) => {
    event.preventDefault();
    // should be a POST request + call to Twilio
		// should change the view to show cards
    clearInputs();
		setView('shoot')
  }

  const clearInputs = () => {
    setTime('')
    setLocation('')
  }


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
				<article className="instructionWrap">
					<h1 className="weddingTitle" style={{fontSize: '3vw', paddingBottom: '0%'}}>Ready, Set, Click.</h1>
				</article>
				</>}
    </section>
  )
}

export default PhotoShootView;
