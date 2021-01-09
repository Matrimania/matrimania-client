import React, { useState } from 'react';
import { StyledButton } from '../App/styledComponents.styles';
import Guest from '../Guest/Guest';
import './GuestList.css'
import empty from '../../assets/emptyGuestList.png'
import { StyledButton, StyledCard } from '../App/styledComponents.styles'


type NewGuest = {
  id: number,
  guestName: string,
  phoneNumber: number
}

const GuestList: React.FC = () => {

<<<<<<< HEAD
  const [guestName, setGuestName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [guests, setGuests] = useState<NewGuest[]>([])
=======
  const organizePhoneInput = () => {
    for(let i = 0; i <= 9; i++) {
      filter.push(i + keypadZero)
      filter.push(i + numpadZero)
    }

    filter.push(8); 
    filter.push(9);
    filter.push(46);
    filter.push(37);
    filter.push(39);
  }

  const onKeyDown = (event) => {
    if(filter.indexOf(event.keyCode) < 0) {
      event.preventDefault()
      return false
    }
  }

  const formatPhoneText = (value: string) => {
    value = this.replaceAll(value.trim(), "-", "");
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0,3) + "-" + value.slice(3);
    } else if(value.length > 6) {
      value = value.slice(0,3) + "-" + value.slice(3,6) + "-" + value.slice(6);
    }

    return value
  }

  const validatePhone = (p) => {
    let phoneRE = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    let digits = p.replace(/\D/g, "");
    return phoneRE.test(digits)
  }
  
>>>>>>> 542d4a89... Create validatePhone function

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
        <StyledButton>
          <div id="translate"></div>
          <a className="link" id="addListButton" onClick={event => submitGuest(event)}>Add To Guest List</a>
        </StyledButton>
      </form>
      <h2 className="weddingName" style={{fontSize: '1.75em', paddingLeft: '3%', paddingBottom: '2%', width: '40%', textAlign: 'center', opacity: '80%'}}>- Your Guest List -</h2>
      <section className="guestCards">
        {guests.length > 0 && guests.map(guest => (<Guest
          guestName={guest.guestName}
          id={guest.id}
          phoneNumber={guest.phoneNumber}
          key={guest.id}
          deleteGuest={deleteGuest}>
          </Guest>))}
        </StyledCard>
      </section>
    </>
	)
}

export default GuestList;
