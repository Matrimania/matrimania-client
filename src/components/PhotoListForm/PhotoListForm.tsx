import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import Checkbox from '../Checkbox/Checkbox';
import empty from '../../assets/emptyGuestList.png';
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles'
import '../GuestList/GuestList.css';

type NewPhoto = {
  id: number;
  photoNumber: number;
  guests: any;
  description: string;
}

type WeddingData = {
  guests: any;
  changeView: any;
}

const PhotoListForm: React.FC<WeddingData> = ({guests, changeView}) => {
  const [description, setDescription] = useState('');
  const [guestsOptions, setGuestsOptions] = useState<any[]>([]);
  const [photoData, setPhotoData] = useState<any[]>([])

  useEffect(() => {
    const allGuests = guests.map((guest: any) => {
        return {...guest, isChecked: false}
      })
      setGuestsOptions(allGuests)
  }, [guests])

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
    console.log(guestList)
    const newPhotoData = {
      id: photoData.length + 1,
      photoNumber: photoData.length + 1,
      guests: guestList,
      description: description
    }
    setPhotoData([...photoData, newPhotoData])
  }

  return (
    <article>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your photo list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>To add a photo: <br></br><br></br>1. Add a description (optional) <br></br>2. Pick guests to include in the photo<br></br>3. Click Submit button <br></br>Tip: Don't forget to include yourselves!</h2>
        </article>
        <section className="guestFormWrap">
          <input
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
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
          <StyledButton onClick={event => submitPhoto(event)}>
            <div id="translate"></div>
            <a className="link" id="addListButton">Submit Photo</a>
          </StyledButton>
          <section className="buttonWrapper">
            <BackButton onClick={() => changeView('editGuestListView')}>
            <div id="arrow">{"<<"}</div>
            <a className="link">{"< Back"}</a>
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
                id={item.id}
                photoNumber={item.photoNumber}
                guests={item.guests}
                description={item.description}
              />
            ))}
          </StyledCard>
          
        </section>
    </ article>
	)
}

export default PhotoListForm;
