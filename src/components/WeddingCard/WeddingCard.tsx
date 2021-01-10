import './WeddingCard.css';
import React from 'react';
import { Link } from 'react-router-dom'
import { StyledCard } from '../App/styledComponents.styles'
import dayjs from 'dayjs';



type Wedding = {
  id: number;
  name: string;
  image: string;
  date: any;
}

const WeddingCard: React.FC<Wedding> = ({
  id,
  name,
  image,
  date}) => {
    return (
      <StyledCard contents="wedding">
        <Link to={`/wedding/${id}`}>
            <h1 className="weddingTitle">{name} Wedding</h1>
            <h2 className="weddingDate">{dayjs(date).format("MM/DD/YYYY")}</h2>
            <section className="couplePhotoWrap">
              <img className="couplePhoto" src={image} alt={`Photo of couple: ${name}`}/>
            </section>
        </Link>
      </StyledCard>
    )
}
export default WeddingCard;
