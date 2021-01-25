import './VendorDashboard.css';
import React, { useState } from 'react';
import WeddingCard from '../WeddingCard/WeddingCard'
import { Link } from 'react-router-dom';
import { StyledButton } from '../App/styledComponents.styles'
import dayjs from 'dayjs';

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
    switch(e.target.options.selectedIndex) {
      case 1:
        const futureWeddings = weddings.filter((a: any) => a.date > Date.now())
        if(futureWeddings.length) {
          sortedFilter = futureWeddings.sort((a: any, b: any) => a.date - b.date)
          setWeddingFilter(sortedFilter)
        } else {
          setError(true)
          setErrorMessage('No Upcoming Weddings To Show')
        }
        break;
      case 2:
        const pastWeddings = weddings.filter((a: any) => a.date < Date.now())
        if(pastWeddings.length) {
          sortedFilter = pastWeddings.sort((a: any, b: any) => a.date - b.date)
          setWeddingFilter(sortedFilter)
        } else {
          setError(true)
          setErrorMessage('No Past Weddings To Show')
        }
        break;
      case 3:
        const currentWeddings = weddings.filter((a: any) => {
          const wedDate = dayjs(a.date).format("MM/DD/YYYY")
          if(wedDate === dayjs().format("MM/DD/YYYY")) {
            return a
          }
        })
        if(currentWeddings.length > 0) {
          sortedFilter = currentWeddings.sort((a: any, b: any) => a.date - b.date)
          setWeddingFilter(sortedFilter)
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
  }

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
          {weddingCards()}
        </section>
      </section>
  )
}
export default VendorDashboard;
