import React, { useState } from 'react';

const GuestListForm: React.FC = () => {
  
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
        onChange={event => setPhoneNumber(event.target.value)}
      />

      <button onClick={event => submitIdea(event)}> SUBMIT
      </button>
    </form>
	)
}

export default GuestListForm;