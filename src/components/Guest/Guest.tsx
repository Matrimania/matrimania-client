import React from 'react';
import './Guest.css'

type Props = {
  id: number;
  guestName: string;
  phoneNumber: string;
  deleteGuest(id: number, wedding: number): void;
  weddingId: number
}
const Guest: React.FC<Props> = ({
  guestName,
  id,
  phoneNumber,
  deleteGuest,
  weddingId
}) => {
  return (
    <article className="guestCard">
      <h1 className="guestInfo">{guestName}</h1>
      <h2 className="guestInfo">{phoneNumber}</h2>
      <button
        className="deleteButton"
        onClick={() => deleteGuest(id, weddingId)}>
        X
      </button>
    </article>
  )
}

export default Guest;
