import React from 'react';
import './Guest.css'

type Props = {
  id: number;
  guestName: string;
  phoneNumber: number;
  deleteGuest(id: number): void
}
const Guest: React.FC<Props> = ({
  guestName,
  id,
  phoneNumber,
  deleteGuest
}) => {
  return (
    <article className="guestCard">
      <h1 className="guestInfo">{guestName}</h1>
      <h2 className="guestInfo">{phoneNumber}</h2>
      <button
        className="deleteButton"
        onClick={() => deleteGuest(id)}>
        X
      </button>
    </article>
  )
}

export default Guest;
