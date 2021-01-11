import React from 'react';

type Props = {
  id: number;
  photoNumber: number;
  guests: any;
  description: string;
}
const Photo: React.FC<Props> = ({
  id,
  photoNumber,
  guests,
  description,
}) => {
  return (
    < article className="photoCard">
      <h1 className="photoInfo">Photo {photoNumber}</h1>
      <h2 className="photoInfo">Guests:</h2>
      <p>
        {guests.length > 0 && guests.reduce(    (names:string, guest: any) => {
        names += ` ${guest.name} •`
        return names
        }, '•')
      }
      </p>
      
      
      <p className="photoInfo">Description: {description}</p>
    </article>
  )
}

export default Photo;