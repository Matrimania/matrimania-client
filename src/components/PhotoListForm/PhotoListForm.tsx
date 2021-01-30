import React, { useState, useEffect, useMemo } from 'react';
import Photo from '../Photo/Photo';
import Checkbox from '../Checkbox/Checkbox';
import empty from '../../assets/EmptyPhoto.png';
import { postAPhoto, getSingleWeddingGuests } from '../../apiCalls';
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles';
import '../GuestList/GuestList.css';
import './PhotoListForm.css';
import arrow from '../../assets/arrow.png'
import loadingText from '../../assets/loadingText.png'

type Props = {
  loading: boolean;
  weddingId: number;
  guests: any;
  updateGuests: any;
  updatePhotos: any;
  changeView: any;
  photoList: any;
  updatePhotoList: any;
}

type Guest = {
	id: number;
	name: string;
	phoneNumber: string;
	wedding: number;
}

const PhotoListForm: React.FC<Props> = ({
  loading,
  weddingId,
  guests,
  updateGuests,
  updatePhotos,
  changeView,
  photoList,
  updatePhotoList
 }) => {

  const [description, setDescription] = useState(''); // Description from form
  const [guestsOptions, setGuestsOptions] = useState<any[]>([]); // array of guests with isChecked
  const [photoData, setPhotoData] = useState<any[]>([...photoList]);
  const [guestList, setGuestList] = useState<Guest[]>([...guests])
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(loading);
  
  useMemo(() => setPhotoData(photoList), [photoList])
  
  useEffect(() => {
    setIsLoading(true)
    const individualWeddingGuests = async () => {
      const guestResult = await getSingleWeddingGuests(weddingId)
      if(guestResult === "No guests found") {
        setIsError(true)
        setErrorMessage(guestResult)
      } else {
        setGuestList(guestResult)
      }
      setIsLoading(false)
    }
    individualWeddingGuests()
    buildCheckList()
    setIsLoading(false)
  }, [])

  const buildCheckList = () => {
    const allGuests = guestList.map((guest: any) => {
        return {...guest, isChecked: false, key: guest.id}
      })
      setGuestsOptions(allGuests)
      return allGuests
  }

  const toggleCheckMark = (guestName: string) => {
    let toggledList = guestsOptions.map(guest => {
      if (guest.name === guestName) {
        guest.isChecked = !guest.isChecked;
      }
      return guest
    })
    setGuestsOptions(toggledList)
  }

  const submitPhoto =  (event: React.FormEvent) => {
    setIsLoading(true)
    event.preventDefault()
    const checkedGuests = guestsOptions.filter((guest: any) => guest.isChecked)
    if(checkedGuests.length >= 1) {
      setIsError(false)
      setErrorMessage('')
      const newPhotoData = {
        id: photoData.length + 1,
        photoNumber: photoData.length + 1,
        guests: checkedGuests,
        description: description
      }
      const guestIds = newPhotoData.guests.map((guest:any) => guest.id)
      const postPhoto = {
        number: newPhotoData.photoNumber,
        description: newPhotoData.description,
        guest: guestIds,
        weddingId: weddingId
      }
      setDescription('')
      updatePhotoList(postPhoto)
    } else {
      setIsError(true)
      setErrorMessage('Please select at least one guest for the photo')
    }
    setIsLoading(false)
    // conditional rendering - make sure guestlist,length is at least 1?
  }

  const getGuestNames = (guestIds:any) => {
    return guestIds.map((guest:any) => {
      const match = guestList.find((person:any) => person.id === guest)
      if(match){
        return match.name
      } else {
        return "error"
      }
    })
  }

  const displayGuests = () => {
    const checks = guestsOptions.map((guest: any, i: number) => {
      return (
        <Checkbox
          key={i +1}
          toggleCheckMark={toggleCheckMark}
          {...guest}
        />
      )
    })
    return checks
  }

  return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 id="GLTitle" className="weddingTitle">Let's build your photo list</h1>
          <h2 id="GLInfo" className="weddingDate">To add a photo: <br></br><br></br>1. Add a description <br></br>2. Pick guests to include in the photo<br></br>3. Click Submit button <br></br>Tip: Don't forget to include yourselves!</h2>
        </article>
        <section className="guestFormWrap">
          <input
            id="GLInput"
            type='text'
            placeholder='Description (optional)'
            name='description'
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          { isLoading ? "loading" :
          <section className="checkboxSection">
            <h3 className="sectionHeader">Guests:</h3>
            {displayGuests()}
          </section> }
          {isError && errorMessage}
          <StyledButton onClick={event => submitPhoto(event)}>
            <div id="translate"></div>
            <h3 className="link" id="addListButton">Submit Photo</h3>
          </StyledButton>
          <section className="buttonWrapper">
            <BackButton onClick={() => changeView('editGuestListView')}>
            <div id="arrow">{"<<"}</div>
            <h3 className="link">{"< Back"}</h3>
            </BackButton>
            <BackButton onClick={() => changeView('detailsView')}>
            <div id="arrow" data-testid="done-button">{">>"}</div>
            <h3 className="link">{"Done >"}</h3>
            </BackButton>
          </section>
        </section>
      </form>
      <section className="guestListWrap">
      {isLoading ?
        <StyledCard contents="list">
        <div className="loadingWrap" style={{ backgroundImage: `url(${loadingText})`}}>
          <img className="arrow" src={arrow} alt="page is loading"/>
        </div>
        </StyledCard> :
        <StyledCard contents={photoData.length === 0 ? "empty" : "list"}>
          {photoData.length === 0 &&
            <img className="emptyList" src={empty} alt="your photo list is empty"/> }
          {photoData.length > 0 && photoData.map(item => (
            <Photo
              key={item.id}
              id={item.id}
              photoNumber={item.number}
              guests={getGuestNames(item.guest)}
              description={item.description}
              location={'list'}
            />
          ))}
        </StyledCard> }
      </section>
    </>
	)
}

export default PhotoListForm;
