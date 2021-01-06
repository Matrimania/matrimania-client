import React from 'react';

type NewGuest = {
  id: number,
  guestName: string,
  phoneNumber: number
}
const Guest: React.FC<NewGuest> = ({
  guestName,
  id,
  phoneNumber
}) => {
  return (
    <article className="guestCard">
      <h1>{guestName}</h1>
      <h2>{phoneNumber}</h2>
    </article>
  )
}

export default Guest;