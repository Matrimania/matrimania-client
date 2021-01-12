import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import Checkbox from '../Checkbox/Checkbox';
import empty from '../../assets/emptyGuestList.png';
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles';
import '../GuestList/GuestList.css';
import './PhotoListForm.css';

// type NewPhoto = {
//   id: number;
//   photoNumber: number;
//   guests: any;
//   description: string;
// }

type WeddingData = {
  guests: any;
  changeView: any;
}

const PhotoListForm: React.FC<WeddingData> = ({guests, changeView}) => {
  const [description, setDescription] = useState('');
  const [guestsOptions, setGuestsOptions] = useState<any[]>([]);
  const [photoData, setPhotoData] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const allGuests = guests.map((guest: any) => {
        return {...guest, isChecked: false}
      })
      setGuestsOptions(allGuests)
  }, [guests, photoData])

  const toggleCheckMark = (guestName: string) => {
    let toggledList = guestsOptions.map(guest => {
      if (guest.name === guestName) {
        guest.isChecked = !guest.isChecked;
      }
      return guest
    })
    setGuestsOptions(toggledList)
  }

  const submitPhoto = (event: React.FormEvent) => {
    event.preventDefault()
    const guestList = guestsOptions.filter((guest: any) => guest.isChecked)
    if (guestList.length >= 1) {
      setIsError(false)
      setErrorMessage('')
      const newPhotoData = {
        id: photoData.length + 1,
        photoNumber: photoData.length + 1,
        guests: guestList,
        description: description
      }
      setPhotoData([...photoData, newPhotoData])
      setDescription('')
    } else {
      setIsError(true)
      setErrorMessage('Please select at least one guest for the photo')
    }

    // conditional rendering - make sure guestlist,length is at least 1?
  }

  return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your photo list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>To add a photo: <br></br><br></br>1. Add a description <br></br>2. Pick guests to include in the photo<br></br>3. Click Submit button <br></br>Tip: Don't forget to include yourselves!</h2>
        </article>
        <section className="guestFormWrap">
          <input
            type='text'
            placeholder='Description (optional)'
            name='description'
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <section className="checkboxSection">
            <h3 className="checkboxHeader">Guests:</h3>
            {guestsOptions.map((guest: any, i: number) => {
              return (
                <Checkbox
                  key={i +1}
                  toggleCheckMark={toggleCheckMark}
                  {...guest}
                />
              )
              })
            }
            {isError && errorMessage}
          </section>
          
          <StyledButton onClick={event => submitPhoto(event)}>
            <div id="translate"></div>
            <a className="link" id="addListButton">Submit Photo</a>
          </StyledButton>
          <section className="buttonWrapper">
            <BackButton onClick={() => changeView('editGuestListView')}>
            <div id="arrow">{"<<"}</div>
            <a className="link">{"< Back"}</a>
            </BackButton>
            <BackButton onClick={() => changeView('detailsView')}>
            <div id="arrow">{">>"}</div>
            <a className="link">{"Done >"}</a>
            </BackButton>
          </section>
        </section>
      </form>  
      <section className="guestListWrap">
        <StyledCard contents={photoData.length === 0 ? "empty" : "list"}>
          { photoData.length === 0 &&
            <img className="emptyList" src={empty} alt="your photo list is empty"/> }
          {photoData.length > 0 && photoData.map(item => (
            <Photo
              key={item.id}
              id={item.id}
              photoNumber={item.photoNumber}
              guests={item.guests}
              description={item.description}
            />
          ))}
        </StyledCard>  
      </section>
    </>
	)
}

export default PhotoListForm;
