import Guest from '../Guest/Guest';
import React, { useState } from 'react';
import Photo from '../Photo/Photo';


type NewPhoto = {
  id: number;
  photoNumber: string;
  guests: string[];
  description: string;
}

type WeddingData = {
	guests: any;
}

const PhotoListForm: React.FC<WeddingData> = ({guests}) => {
  const [description, setDescription] = useState('');
  const [guestsInPhoto, setGuestsInPhoto] = useState([]);

  const guestInputs = () => {
    console.log(guests)
    if (guests.length >= 1) {
      return guests.map((guest: any, i: number) => (
        <div key={guest.name}>
          <label>{guest.name}</label>
          <input type="checkbox" name={`guest ${i+1}`} value={guest.name} />
        </div>
        )
      )
    }
    
  }

  return (
    <article>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your photo list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>To add a photo: <br></br><br></br>1. Add a guest <br></br>2. Add an optional description<br></br>3. Click Submit Photo button <br></br>Tip: Don't forget to include yourselves!</h2>
        </article>
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        {guestInputs()}
        

      </form>
    </ article>
	)
}

export default PhotoListForm;
