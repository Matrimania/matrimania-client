import React, { useState } from 'react';
import './AddWeddingForm.css'
import { postAWedding } from '../../apiCalls'
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
    postAWedding(newWedding);
    // should be a POST request + adding card to UI
    clearInputs();
  }

  const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    const capitalized = s.charAt(0).toUpperCase() + s.slice(1)
    setName(capitalized)
    }

  const clearInputs = () => {
    setName('')
    setEmail('')
    setDate('')
    setImage('')
  }

	return (
    <>
      <form autoComplete="off" className="weddingFormWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle" id="weddingFormTitle">Enter The Wedding Details</h1>
        </article>
        <label htmlFor="lastName"></label>
          <input
            id="weddingFormInput"
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={name}
            onChange={event => capitalize(event.target.value)}
          />
        <label htmlFor="emailAddress"></label>
        <input
          id="weddingFormInput"
          type='text'
          placeholder='Email Address'
          name='emailAddress'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="weddingDate"></label>
        <input
          id="weddingFormInput"
          type='date'
          placeholder='Wedding Date'
          name='weddingDate'
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <label htmlFor="image"></label>
        <input
          id="weddingFormInput"
          type='text'
          placeholder='Image Link'
          name='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        <StyledButton onClick={event => submitWedding(event)}>
          <div id="translate"></div>
            <h2 className="link" id="addListButton">Submit Wedding</h2>
        </StyledButton>
      </form>
    </>
	)
}

export default AddWeddingForm;
