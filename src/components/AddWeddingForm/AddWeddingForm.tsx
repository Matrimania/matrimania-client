import React, { useState } from 'react';
import './AddWeddingForm.css'
import empty from '../../assets/emptyGuestList.png'
import { StyledButton } from '../App/styledComponents.styles'


type NewWedding = {
  id: number,
  name: string,
  email: string,
  date: string,
  image: string
}

const AddWeddingForm: React.FC = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')

  const submitWedding = (event: React.FormEvent) => {
    event.preventDefault();
    const newWedding: NewWedding = {
      id: Date.now(),
      name,
      email,
      date,
      image
    }

    // should be a POST request + adding card to UI
    clearInputs();
  }

  const clearInputs = () => {
    setName('')
    setEmail('')
    setDate('')
    setImage('')
  }

	return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Enter The Wedding Details</h1>
        </article>
        <label htmlFor="lastName"></label>
          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        <label htmlFor="emailAddress"></label>
        <input
          type='text'
          placeholder='Email Address'
          name='emailAddress'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="weddingDate"></label>
        <input
          type='text'
          placeholder='Wedding Date'
          name='weddingDate'
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <label htmlFor="image"></label>
        <input
          type='text'
          placeholder='Image Link'
          name='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        <StyledButton onClick={event => submitWedding(event)}>
          <div id="translate"></div>
            <a className="link" id="addListButton">Submit Wedding</a>
        </StyledButton>
      </form>
    </>
	)
}

export default AddWeddingForm;
