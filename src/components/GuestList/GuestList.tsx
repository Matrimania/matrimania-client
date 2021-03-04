import React, { useMemo, useState } from 'react';
import Guest from '../Guest/Guest';
import './GuestList.css'
import empty from '../../assets/emptyGuestList.png'
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles'



type WeddingData = {
  loading: boolean;
  guestList: any;
	changeView: any;
  weddingId: number;
  updateGuests: any;
  deleteGuest: any;
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
  updateGuests,
  deleteGuest
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
    setIsLoading(true)
    event.preventDefault();
    if(guestName !== "" && phoneNumber.length === 12) {
      const guestPost = {
        name: guestName.charAt(0).toUpperCase() + guestName.slice(1),
        phoneNumber,
        wedding: weddingId
      }
      clearInputs()
      setHasError(false)
      setErrorMessage('')
      updateGuests(guestPost, weddingId)
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

  const changeToPhotoList = () => {
    if (guests.length === 0){
      alert("Please add at least one guest before moving on to photos")
    } else {
      changeView('editPhotoListView')
    }
  }

  useMemo(() => setGuests(guestList), [guestList])

	return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 id="GLTitle" className="weddingTitle">Let's start with your guest list</h1>
          <h2 id="GLInfo" className="weddingDate">
            For each person included in your family photos, please include: <br></br><br></br>
            1. Their first and last name<br></br>
            2. A mobile phone number that accepts text messages<br></br> <br></br>
            Don't forget yourselves!</h2>
        </article>
        <section className="guestFormWrap">
          <input
            id="GLInput"
            type='text'
            placeholder='Guest Name'
            name='guestName'
            value={guestName}
            onChange={event => setGuestName(event.target.value)}
          />
          <input
            id="GLInput"
            type='text'
            placeholder='Phone (XXX-XXX-XXXX)'
            name='phoneNumber'
            maxLength={12}
            value={phoneNumber}
            onChange={event => checkNumber(event.target.value)}
          />
          <div className="inputWrap">
            <h3 className="clearButton" onClick={event => clearInputs()}>Clear</h3>
          </div>
          {hasError && errorMessage}
          <StyledButton onClick={event => submitGuest(event)}>
            <div id="translate"></div>
            <h3 className="link" id="addListButton">Add To Guest List</h3>
          </StyledButton>
          <section className="buttonWrapper">
            <BackButton onClick={() => changeView('detailsView')}>
              <div id="arrow">{"<<"}</div>
              <h3 className="link">{"< Back"}</h3>
            </BackButton>
            <BackButton onClick={() => changeToPhotoList()}>
              <div id="arrow" data-testid="photo-list-button">{">>"}</div>
              <h3 className="link">{"Photos >"}</h3>
            </BackButton>
          </section>
        </section>
      </form>
      <section className="guestListWrap">
      {isLoading ? "loading" :
        <StyledCard contents={guests.length === 0 ? "empty" : "list"}>
          { guests.length === 0 &&
            <img className="emptyList" src={empty} alt="your guest list is empty"/> }
          { guests.length > 0 && guests.map(guest => (<Guest
            guestName={guest.name}
            id={guest.id}
            phoneNumber={guest.phoneNumber}
            key={guest.id}
            deleteGuest={deleteGuest}
            weddingId={weddingId}>
            </Guest>)) }
        </StyledCard>
      }
      </section>
    </>
	)
}

export default GuestList;
