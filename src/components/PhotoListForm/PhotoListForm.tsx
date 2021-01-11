import Guest from '../Guest/Guest';
import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import Checkbox from '../Checkbox/Checkbox';


type NewPhoto = {
  id: number;
  photoNumber: string;
  guests: string[];
  description: string;
}

type WeddingData = {
  guests: any;
  changeView: any;
}

const PhotoListForm: React.FC<WeddingData> = ({guests}) => {
  const [description, setDescription] = useState('');
  const [guestsInPhoto, setGuestsInPhoto] = useState<any[]>([]);

  useEffect(() => {
    const allGuests = guests.map((guest: any) => {
        return {...guest, isChecked: false}
      })
      setGuestsInPhoto(allGuests)
  }, [guests])

  const toggleCheckMark = (guestName: string) => {
    let toggledList = guestsInPhoto.map(guest => {
      if (guest.name === guestName) {
        guest.isChecked = !guest.isChecked;
      }
      return guest
    })
    setGuestsInPhoto(toggledList)

    // if (target) {
    //   setGuestsInPhoto([...guestsInPhoto, ])
    // }
    // guest.isChecked = !guest.isChecked
    // if clicked - changed checked
    
  }
  // const allGuests = guests.map((guest: any) => {
  //   return {...guest, isChecked: false}
  // })
  // setGuestsInPhoto(allGuests)

  const submitPhoto = () => {

  }

  return (
    <article>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your photo list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>To add a photo: <br></br><br></br>1. Add a description (optional) <br></br>2. Pick guests to include in the photo<br></br>3. Click Submit button <br></br>Tip: Don't forget to include yourselves!</h2>
        </article>
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        {guestsInPhoto.map((guest: any, i: number) => {
          return (
            <Checkbox
              key={i +1}
              toggleCheckMark={toggleCheckMark}
              {...guest}
            />
          )
          })
        }
        

      </form>
    </ article>
	)
}

export default PhotoListForm;
