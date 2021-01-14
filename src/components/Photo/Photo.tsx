import React from 'react';
import './Photo.css';

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
    < article className="photoCard">
      <h4 className="photoHeader">{`PHOTO ${photoNumber}`}</h4>
      <p>
        {guests.length > 0 && guests.reduce((names:string, guest: any) => {
        names += ` ${guest} •`
        return names
        }, '•')
      }
      </p>

      <p className="photoDescription">Description: {description}</p>
    </article>
  )
}

export default Photo;
