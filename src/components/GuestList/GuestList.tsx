import React, { useState } from 'react';
import Guest from '../Guest/Guest';
import './GuestList.css'
import { StyledButton } from '../App/styledComponents.styles'


type NewGuest = {
  id: number,
  guestName: string,
  phoneNumber: number
}

const GuestList: React.FC = () => {

  const [guestName, setGuestName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [guests, setGuests] = useState<NewGuest[]>([])

  const submitGuest = (event: React.FormEvent) => {
    event.preventDefault();
    const newGuest: NewGuest = {
      id: Date.now(),
      guestName,
      phoneNumber
    }
    setGuests([...guests, newGuest])
    // should be a POST request + adding card to UI
    clearInputs();
  }

  const clearInputs = () => {
    setGuestName('')
    setPhoneNumber(0)
  }

  const deleteGuest = (id: number) => {
    const filteredGuestList = guests.filter(guest => guest.id !== id)
    setGuests (filteredGuestList)
  }

	return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your guest list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>For each person included in your family photos, please include: <br></br><br></br>1. Their first and last name<br></br>2. A mobile phone number that accepts text messages<br></br> <br></br>Don't forget yourselves!</h2>
        </article>
        <input
          type='text'
          placeholder='Guest Name'
          name='guestName'
          value={guestName}
          onChange={event => setGuestName(event.target.value)}
        />
        <input
          type='tel'
          placeholder='Phone Number'
          name='phoneNumber'
          maxLength={10}
          value={phoneNumber !== 0 ? phoneNumber : ''}
          onChange={event => setPhoneNumber(parseInt(event.target.value))}
        />
        <StyledButton onClick={event => submitGuest(event)}>
          <div id="translate"></div>
            <a className="link" id="addListButton">Add To Guest List</a>
        </StyledButton>
      </form>
      <section className="guestListWrap">
        <h2 className="weddingTitle" style={{fontSize: '1.75em', paddingLeft: '3%', paddingBottom: '2%', width:'40%', textAlign: 'center', opacity: '80%'}}>- Your Guest List -</h2>
        <section className="guestCards">
          {guests.length === 0 &&
            <h2 className="weddingDate" style={{fontSize: '1vw', padding: '2% 10%', textAlign: 'left'}}>You have no guests in your photo list yet!<br></br><br></br>Guests will show up here as you add them to your list.</h2>
          }
          {guests.length > 0 && guests.map(guest => (<Guest
          guestName={guest.guestName}
          id={guest.id}
          phoneNumber={guest.phoneNumber}
          key={guest.id}
          deleteGuest={deleteGuest}>
          </Guest>))}
        </section>
      </section>
    </>
	)
}

export default GuestList;
