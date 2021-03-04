import './WeddingCard.css';
import React from 'react';
import { Link } from 'react-router-dom'
import { StyledCard } from '../App/styledComponents.styles'
import dayjs from 'dayjs';


// Types //
type Wedding = {
  id: number;
  name: string;
  image: string;
  date: string;
}

const WeddingCard: React.FC<Wedding> = ({
  id,
  name,
  image,
  date}) => {
    return (
      <StyledCard contents="wedding">
        <Link 
          to={`/wedding/${id}`}
          data-testid={`${name}-link`}
        >
            <h1 className="weddingTitle">{name} Wedding</h1>
            <h2 className="weddingDate" data-testid="weddingDate">{dayjs(date).format("MM/DD/YYYY")}</h2>
            <section className="couplePhotoWrap">
              <img className="couplePhoto" src={image} alt={`The happy ${name} couple`}/>
            </section>
        </Link>
      </StyledCard>
    )
}
export default WeddingCard;
