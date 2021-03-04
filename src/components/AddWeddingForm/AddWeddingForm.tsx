import React, { useState } from 'react';
import './AddWeddingForm.css'
import { StyledButton } from '../App/styledComponents.styles'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

// Types //
type Props = {
  addNewWedding(wedding: NewWedding): void;
};
type NewWedding = {
  name: string;
  email: string;
  date: string;
  image: string;
};

const AddWeddingForm: React.FC<Props> = ({
  addNewWedding
}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  let history = useHistory()

  const submitWedding = async (event: React.FormEvent) => {
    event.preventDefault();
    if (name === '' || email === '' || date === '') {
      setMessage('Please makes sure to include your name, email, and wedding date')
    } else {
      const weddingDate = dayjs(date).format('MM/DD/YYYY')
      const newWedding = {
        name,
        email,
        date: weddingDate,
        image
      }
      if(newWedding.image === '') {
        newWedding.image = 'https://user-images.githubusercontent.com/65047537/106202246-dc00b080-6176-11eb-8067-5c7798af9a1b.jpg'
      }
      addNewWedding(newWedding);
      clearInputs();
      setMessage('')
      history.push('/')
    }
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
          placeholder='Image Link (optional)'
          name='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        {message}
        <StyledButton onClick={event => submitWedding(event)}>
          <div id="translate"></div>
            <h2 className="link" id="addListButton">Submit Wedding</h2>
        </StyledButton>
      </form>
    </>
	)
}

export default AddWeddingForm;
