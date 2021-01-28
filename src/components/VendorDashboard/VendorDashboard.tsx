import './VendorDashboard.css';
import React, { useState } from 'react';
import WeddingCard from '../WeddingCard/WeddingCard'
import { Link } from 'react-router-dom';
import { StyledButton, StyledCard } from '../App/styledComponents.styles'
import dayjs from 'dayjs'
import noWeddings from '../../assets/NoWeddings.png'


type Wedding = {
  id: number;
  name: string;
  email: string;
  date: any;
  image: string;
}
type Props = {
  weddings: any;
}


const VendorDashboard: React.FC<Props> = ({weddings}) => {
  const [weddingFilter, setWeddingFilter] = useState<Wedding[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [hasError, setError] = useState(false)

  const filterWeddings = (e: any) => {
    setError(false)
    setErrorMessage('')
    let sortedFilter
    const today = dayjs().format('MM/DD/YYYY')
    switch(e.target.options.selectedIndex) {
      case 1:
        const futureWeddings = weddings.filter((a: any) => {
          const compDate = dayjs(a.date)
          return compDate.isAfter(dayjs(today))})
        if(futureWeddings.length) {
          futureWeddings.forEach((wedding:any) => wedding.date = dayjs(wedding.date))
          sortedFilter = futureWeddings.sort((a: any, b: any) => a.date - b.date)
          sortedFilter.forEach((wed:any) => wed.date = dayjs(wed.date).format('MM/DD/YYYY'))
          setWeddingFilter(sortedFilter)
        } else {
          setError(true)
          setErrorMessage('No Upcoming Weddings To Show')
        }
        break;
      case 2:
        const pastWeddings = weddings.filter((a: any) => {
          const compDate = dayjs(a.date)
          return compDate.isBefore(dayjs(today))})
        if(pastWeddings.length) {
          pastWeddings.forEach((wedding:any) => wedding.date = dayjs(wedding.date))
          sortedFilter = pastWeddings.sort((a: any, b: any) => a.date - b.date)
          sortedFilter.forEach((wed:any) => wed.date = dayjs(wed.date).format('MM/DD/YYYY'))
          setWeddingFilter(sortedFilter)
        } else {
          setError(true)
          setErrorMessage('No Past Weddings To Show')
        }
        break;
      case 3:
        const currentWeddings = weddings.filter((a: any) => {
          return a.date === today
        })
        if(currentWeddings.length > 0) {
          setWeddingFilter(currentWeddings)
        } else {
          setError(true)
          setErrorMessage('No Weddings Taking Place Today')
        }
        break;
      default:
        if(weddings.length > 0) {
          setWeddingFilter(weddings)
        } else {
          setError(true)
          setErrorMessage('No Weddings In Your Schedule')
        }
        break;
    }
  }

  const weddingCards = () => {
    if(hasError) {
      return <div>{errorMessage}</div>
    }
    if(weddingFilter.length > 0) {
      return weddingFilter.map((singleWedding:any) => {
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
    } else {
      return weddings.map((singleWedding:any) => {
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
    }
  };

  return (
      <section className="dashboardWrapper">
        <section className="optionsWrap">
        <StyledButton>
          <div id="translate"></div>
          <Link to={`/add-wedding`} className="link">Add A Wedding</Link>
        </StyledButton>
          <section className="filterWrap">
          <label className="label">Filter By :</label>
          <select className="dropdown" onChange={(e) => filterWeddings(e)}>
              <option value="0">All</option>
              <option value="1">Upcoming</option>
              <option value="2">Past</option>
              <option value="3">Today</option>
          </select>
          </section>
        </section>
        <section className="weddingCardWrap">
          {weddings.length ? weddingCards() :
            <StyledCard contents="fullPage">
              <img className="noWeddingsError" src={noWeddings} alt="your wedding list is empty"/>
            </StyledCard>
          }
        </section>
      </section>
  )
}
export default VendorDashboard;
