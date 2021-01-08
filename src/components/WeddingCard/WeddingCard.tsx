import './WeddingCard.css';
import React from 'react';
import { Link } from 'react-router-dom'

type Wedding = {
  weddingId: number;
  name: string;
  image: string;
  date: string;
}

const WeddingCard: React.FC<Wedding> = ({
  weddingId,
  name,
  image,
  date}) => {
    return (
        <Link to={`/wedding/${weddingId}`} className="cardWrapper">
            <h1 className="weddingTitle">{name} Wedding</h1>
            <h2 className="weddingDate">{date}</h2>
            <section className="couplePhotoWrap">
              <img className="couplePhoto" src={image} alt={`Photo of ${name} couple`}/>
            </section>
        </Link>
    )
}
export default WeddingCard;
