import React, { useState } from 'react';
import Guest from '../Guest/Guest';

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
      <h1>Add Guest</h1>
        <input
          type='text'
          placeholder='Guest Name'
          name='guestName'
          value={guestName}
          onChange={event => setGuestName(event.target.value)}
        />

        <input
          type='text'
          placeholder='Phone Number'
          name='phoneNumber'
          value={phoneNumber}
          onChange={event => setPhoneNumber(parseInt(event.target.value))}
        />

        <button onClick={event => submitGuest(event)}> SUBMIT
        </button>
      </form>
      <section className="guestCards">
        {guests.length > 0 && guests.map(guest => (<Guest
          guestName={guest.guestName}
          id={guest.id}
          phoneNumber={guest.phoneNumber}
          key={guest.id}
          deleteGuest={deleteGuest}>
        </Guest>))}
      </section>  
    </> 
	)
}

export default GuestList;