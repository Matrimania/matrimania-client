import React, { useState, useEffect } from 'react';
import Guest from '../Guest/Guest';
import './GuestList.css'
import empty from '../../assets/emptyGuestList.png'
import { postAGuest, deleteAGuest } from '../../apiCalls';
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles'



type WeddingData = {
  loading: boolean;
  guestList: any;
	changeView: any;
  weddingId: number;
  updateGuests: any;
}

type NewGuest = {
  id: number,
  name: string,
  phoneNumber: string;
}

const GuestList: React.FC<WeddingData> = ({
  loading,
  guestList,
  changeView,
  weddingId,
  updateGuests
}) => {

  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guests, setGuests] = useState<NewGuest[]>([...guestList]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);
  const [errorMessage, setErrorMessage] = useState('');

  const checkNumber = (event: any) => {
    let value = event.trim().replaceAll( "-", "")
    var reg = /^\d+$/;
    if (reg.test(value)) {
      formatPhoneText(value)
      setHasError(false)
      setErrorMessage('')
    } else {
      setHasError(true)
      setErrorMessage('Phone Number only accepts numerical values')
    }
  }

  const formatPhoneText = (value: string) => {
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0,3) + "-" + value.slice(3);
    } else if(value.length > 6) {
      value = value.slice(0,3) + "-" + value.slice(3,6) + "-" + value.slice(6);
    }
    setPhoneNumber(value)
    setHasError(false)
    setErrorMessage('')
  }

  const submitGuest = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true)
    const guestPost = {
      name: guestName,
      phoneNumber,
      wedding: weddingId
    }
    const newGuest: NewGuest = {
      id: Date.now(),
      name: guestName,
      phoneNumber
    }
    if(guestName !== "" && phoneNumber.length === 12) {
      clearInputs()
      setHasError(false)
      setErrorMessage('')
      const postGuest = async () => {
        const response = await postAGuest(guestPost)
        .then(updateGuests())
      }
      postGuest()
      setGuests([...guests, newGuest])
    } else if (guestName === "" && phoneNumber.length !== 12) {
      setHasError(true)
      setErrorMessage('Name and Phone Number Required')
    } else if (guestName === "") {
      setHasError(true)
      setErrorMessage('Name Required')
    } else if (phoneNumber.length !== 12) {
      setHasError(true)
      setErrorMessage('Phone Number Required')
    }
    setIsLoading(false)
  }

  const clearInputs = () => {
    setGuestName('')
    setPhoneNumber('')
  }

  const deleteGuest = (id: number) => {
    deleteAGuest(id)
    const filteredGuestList = guests.filter(guest => guest.id !== id)
    setGuests(filteredGuestList)
  }

	return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your guest list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>For each person included in your family photos, please include: <br></br><br></br>1. Their first and last name<br></br>2. A mobile phone number that accepts text messages<br></br> <br></br>Don't forget yourselves!</h2>
        </article>
        <section className="guestFormWrap">
        <input
          type='text'
          placeholder='Guest Name'
          name='guestName'
          value={guestName}
          onChange={event => setGuestName(event.target.value)}
        />
        <input
          type='text'
          placeholder='Phone (XXX-XXX-XXXX)'
          name='phoneNumber'
          maxLength={12}
          value={phoneNumber}
          onChange={event => checkNumber(event.target.value)}
        />
        <div className="inputWrap">
          <a className="clearButton" onClick={event => clearInputs()}>Clear</a>
        </div>
        {isError && errorMessage}
        <StyledButton onClick={event => submitGuest(event)}>
          <div id="translate"></div>
          <a className="link" id="addListButton">Add To Guest List</a>
        </StyledButton>
        <section className="buttonWrapper">
          <BackButton onClick={() => changeView('detailsView')}>
          <div id="arrow">{"<<"}</div>
          <a className="link">{"< Back"}</a>
          </BackButton>
          <BackButton onClick={() => changeView('editPhotoListView')}>
          <div id="arrow">{">>"}</div>
          <a className="link">{"Photos >"}</a>
          </BackButton>
        </section>
        </section>
      </form>
      <section className="guestListWrap">
        <StyledCard contents={guests.length === 0 ? "empty" : "list"}>
          { guests.length === 0 &&
            <img className="emptyList" src={empty} alt="your guest list is empty"/> }
          { guests.length > 0 && guests.map(guest => (<Guest
            guestName={guest.guestName}
            id={guest.id}
            phoneNumber={guest.phoneNumber}
            key={guest.id}
            deleteGuest={deleteGuest}>
            </Guest>)) }
        </StyledCard>
      </section>
    </>
	)
}

export default GuestList;
