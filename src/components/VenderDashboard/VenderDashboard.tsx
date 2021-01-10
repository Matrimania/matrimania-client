import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import WeddingCard from '../WeddingCard/WeddingCard'
import { getWeddings } from '../../apiCalls'
import { StyledButton } from '../App/styledComponents.styles'
import './VenderDashboard.css';


type Wedding = {
  id: number;
  name: string;
  email: string;
  date: string;
  image: string;
}

function VenderDashboard() {
  const [weddings, setWeddings] = useState<Wedding[]>([])

  useEffect(() => {
    const allWeddings = async () => {
      const result = await getWeddings()
      console.log(result)
      setWeddings(result)
    }
    allWeddings()
  }, [])

  const weddingCards = weddings.map((singleWedding, index) => {
    return (
      <WeddingCard
        key={singleWedding.id}
        id={singleWedding.id}
        name={singleWedding.name}
        image={singleWedding.image}
        date={singleWedding.date}
      />
    )
  })
    return (
        <section className="dashboardWrapper">
          <section className="optionsWrap">
          <StyledButton>
            <div id="translate"></div>
            <Link to={`/add-wedding`} className="link">Add A Wedding</Link>
          </StyledButton>
            <section className="filterWrap">
            <label className="label">Filter By :</label>
            <select className="dropdown">
                <option value="0">All</option>
                <option value="1">Upcoming</option>
                <option value="2">Past</option>
                <option value="3">Today</option>
            </select>
            </section>
          </section>
          <section className="weddingCardWrap">
            {weddingCards}
          </section>
        </section>
    )
}
export default VenderDashboard;
