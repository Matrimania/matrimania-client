import React, { useState } from 'react';

const GuestListForm: React.FC = () => {
  
  const [guestName, setGuestName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)



  const clearInputs = () => {
    setGuestName('')
    setPhoneNumber(0)
  }

	return (

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

      <button onClick={event => console.log(event)}> SUBMIT
      </button>
    </form>
	)
}

export default GuestListForm;