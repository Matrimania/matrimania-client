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
            <h1 className="weddingTitle">{name} Wedding</h1>
            <h2 className="weddingDate">{date}</h2>
            <section className="couplePhotoWrap">
              <img className="couplePhoto" src={image}/>
            </section>
        </article>
    )
}
export default WeddingCard;
