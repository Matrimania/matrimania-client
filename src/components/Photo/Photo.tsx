import React from 'react';
import './Photo.css';
import { PhotoCard } from '../App/styledComponents.styles';


type Props = {
  id: number;
  photoNumber: number;
  guests: string[];
  description: string;
  location: string;
}
const Photo: React.FC<Props> = ({
  id,
  photoNumber,
  guests,
  description,
  location
}) => {

  return (
    <PhotoCard contents={location}>
      <h4 className="photoHeader">{`PHOTO ${photoNumber}`}</h4>
      <p className="guestData">
        {guests.length > 0 && guests.reduce((names:string, guest: any) => {
        names += ` ${guest} •`
        return names
        }, '•')
      }
      </p>

      <p className="photoDescription">Description: {description}</p>
    </PhotoCard>
  )
}

export default Photo;
