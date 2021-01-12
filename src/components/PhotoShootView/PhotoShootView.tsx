import React, { useState } from 'react';
import './PhotoShootView.css'
import { StyledButton } from '../App/styledComponents.styles'



const PhotoShootView: React.FC = () => {

  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')

  const sendNotifications = (event: React.FormEvent) => {
    event.preventDefault();
    // should be a POST request + call to Twilio
    clearInputs();
  }

  const clearInputs = () => {
    setTime('')
    setLocation('')
  }


  return (
    <section className="formWrapper">
      <article className="instructionWrap">
        <h1 className="weddingTitle" style={{fontSize: '3vw'}}>Ready, Set, Click.</h1>
        <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%'}}>Clicking the <span style={{color: '#6f896d', fontWeight: 'bold'}}>{` 'Notify Guests'`}</span> button below will:</h2>
        <h2 className="weddingDate" style={{width: '60%', alignSelf: 'center', textAlign: 'left'}}>1. Text message all photo participants.<br></br><br></br>2. Display the details for each photo.</h2>
      </article>
      <form className="weddingFormWrapper">
        <label htmlFor="when">When should guests meet? (ex: "after the ceremony")</label>
          <input
            type='text'
            placeholder='When?'
            name='when'
            value={time}
            onChange={event => setTime(event.target.value)}
          />
        <label htmlFor="where">Where should guests meet? (ex: "at the ceremony site")</label>
        <input
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
      <div>Here's what your text will say:
        <article>Hello (Guest's Name). Thank you for attending the (Name) wedding. The lovely couple would like you to meet them for photos (when)(where). You will be participating in photo numbers (photos)</article>
      </div>
    </section>
  )
}

export default PhotoShootView;
