import React from 'react';

type Props = {
  id: number;
  photoNumber: number;
  guests: string[];
  description: string;
}
const Photo: React.FC<Props> = ({
  id,
  photoNumber,
  guests,
  description,
}) => {
  return (
    <article className="photoCard">
      <h1 className="photoInfo">Photo {photoNumber}</h1>
      <h2 className="photoInfo">Guests: {guests}</h2>
      <p className="photoInfo">Description: {description}</p>
    </article>
  )
}

export default Photo;