import './WeddingCard.css';
import React from 'react';

type Wedding = {
  key: number;
  name: string;
  image: string;
  date: string;
}

const WeddingCard: React.FC<Wedding> = ({
  name,
  image,
  date}) => {
    return (
        <article className="cardWrapper">
            <h1>{name} Wedding</h1>
            <h2>{date}</h2>
            <img src={image}/>
        </article>
    )
}
export default WeddingCard;
