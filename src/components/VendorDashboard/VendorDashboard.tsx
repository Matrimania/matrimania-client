import './VendorDashboard.css';
import React, { useEffect, useState } from 'react';
import WeddingCard from '../WeddingCard/WeddingCard'
import { getWeddings } from '../../apiCalls'
import { Link } from 'react-router-dom';
import { StyledButton } from '../App/styledComponents.styles'
import './VendorDashboard.css';
import dayjs from 'dayjs';

type Wedding = {
  id: number;
  name: string;
  email: string;
  date: any;
  image: string;
}

function VendorDashboard() {
  const [weddings, setWeddings] = useState<Wedding[]>([])

  useEffect(() => {
  const allWeddings = async () => {
    const result = await getWeddings()
    if(result.length) {
      result.forEach((wed: any) => {
        wed.date = new Date(wed.date)
      })
    }
    const sortedResult = result.sort((a: any, b: any) => a.date - b.date)
    setWeddings(sortedResult)
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
export default VendorDashboard;
