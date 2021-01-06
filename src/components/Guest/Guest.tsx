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
    <>
    {guestName}
    {phoneNumber}
    </>
  )
}

export default Guest;