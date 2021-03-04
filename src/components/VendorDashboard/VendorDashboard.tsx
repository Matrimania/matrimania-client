// Assets //
import './VendorDashboard.css';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import noWeddings from '../../assets/NoWeddings.png'
import noCurrent from '../../assets/NoCurrent.png'
import noPast from '../../assets/NoPast.png'
import noUpcoming from '../../assets/NoUpcoming.png'
import arrow from '../../assets/arrow.png'
import loadingText from '../../assets/loadingText.png'

// Components //
import WeddingCard from '../WeddingCard/WeddingCard'
import { StyledButton, StyledCard } from '../App/styledComponents.styles'

// Types //
type Wedding = {
  id: number;
  name: string;
  email: string;
  date: string;
  image: string;
};
type Props = {
  weddings: Wedding[];
  loading: boolean;
};

const VendorDashboard: React.FC<Props> = ({
  weddings,
  loading
}) => {

  // State //
  const [weddingFilter, setWeddingFilter] = useState<Wedding[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [hasError, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(loading)
  useMemo(() => setIsLoading(loading), [loading])

  // Display Functions //
  const filterWeddings = (e: any) => {
    setIsLoading(true)
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
          setIsLoading(false)
        } else {
          setError(true)
          setErrorMessage('No Upcoming Weddings To Show')
          setIsLoading(false)
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
          setIsLoading(false)
        } else {
          setError(true)
          setErrorMessage('No Past Weddings To Show')
          setIsLoading(false)
        }
        break;
      case 3:
        const currentWeddings = weddings.filter((a: any) => {
          return a.date === today
        })
        if(currentWeddings.length > 0) {
          setWeddingFilter(currentWeddings)
          setIsLoading(false)
        } else {
          setError(true)
          setErrorMessage('No Weddings Taking Place Today')
          setIsLoading(false)
        }
        break;
      default:
        if(weddings.length > 0) {
          setWeddingFilter(weddings)
          setIsLoading(false)
        } else {
          setError(true)
          setErrorMessage('No Weddings In Your Schedule')
          setIsLoading(false)
        }
        break;
    }
  };

  const displayErrorImage = () => {
    if (errorMessage === 'No Weddings In Your Schedule') {
      return noWeddings
    } else if (errorMessage === 'No Weddings Taking Place Today') {
      return noCurrent
    } else if (errorMessage === 'No Past Weddings To Show') {
      return noPast
    } else if (errorMessage === 'No Upcoming Weddings To Show') {
      return noUpcoming
    }
  };

  const weddingCards = () => {
    if(hasError) {
      return (
        <img className="noWeddingsError" src={displayErrorImage()} alt={errorMessage}/>
      )
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

  const displayLoading = () => {
    return (
      <div className="loadingWrap" style={{ backgroundImage: `url(${loadingText})`}}>
        <img className="arrow" src={arrow} alt="page is loading"/>
      </div>
    )
  };

  // Render //
  return (
      <section className="dashboardWrapper">
        <section className="optionsWrap">
        <StyledButton>
          <div id="translate"></div>
          <Link to={`/add-wedding`} className="link">Add A Wedding</Link>
        </StyledButton>
          <section className="filterWrap">
          <label className="label">Filter By :</label>
          <select data-testid="dropdown" className="dropdown" onChange={(e) => filterWeddings(e)}>
              <option value="0">All</option>
              <option value="1">Upcoming</option>
              <option value="2">Past</option>
              <option value="3">Today</option>
          </select>
          </section>
        </section>
        <section className="weddingCardWrap">
          {isLoading && displayLoading()}
          {weddings.length === 0 && !isLoading && <img className="noWeddingsError" src={noWeddings} alt={'No weddings in storage'}/>}
          {weddings.length > 0 && !isLoading && weddingCards()}
        </section>
      </section>
  )
};

export default VendorDashboard;
