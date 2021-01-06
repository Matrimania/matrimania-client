import React from 'react';

type Props = {
  id: number;
  guestName: string;
  phoneNumber: number;
  deleteGuest(): void
}
const Guest: React.FC<Props> = ({
  guestName,
  id,
  phoneNumber,
  deleteGuest
}) => {
  return (
    <article className="guestCard">
      <h1>{guestName}</h1>
      <h2>{phoneNumber}</h2>
      <button
        onClick={() => deleteGuest()}>
        Delete 🗑
      </button>
    </article>
  )
}

export default Guest;