import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, NavLink, Link} from 'react-router-dom'
import { weddings, individualWedding } from '../../weddingData'
// Components
import VendorDashboard from '../VendorDashboard/VendorDashboard'
import WeddingDetails from '../WeddingDetails/WeddingDetails'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList'
import LandingPage from '../LandingPage/LandingPage'
import GuestListForm from '../GuestList/GuestList'
import AddWeddingForm from '../AddWeddingForm/AddWeddingForm'
import { getWeddings } from '../../apiCalls'

type Wedding = {
  id: number;
  name: string;
  email: string;
  date: string;
  image: string;
}

const App = () => {
  const [weddings, setWeddings] = useState<Wedding[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [hasError, setError] = useState(false)

  useEffect(() => {
    const allWeddings = async () => {
      const result = await getWeddings()
      if(result.length > 0) {
        result.forEach((wed: any) => {
          wed.date = new Date(wed.date)
        })
        let sortedResult = result.sort((a: any, b: any) => a.date - b.date)
        setWeddings(sortedResult)
      } else {
        setError(true)
        setErrorMessage(result)
      }
    }
    allWeddings()
  }, [])

  return (
    <div className="appWrap">
      <header className="headerWrap">
        <Link to={`/vendor-dashboard`}>
          <img src={logo} className="logo" alt="Matrimania Logo"/>
        </Link>
      </header>
      <Switch>
        <Route path='/vendor-dashboard'>
          <VendorDashboard
            weddings={weddings}
          />
        </Route>
        <Route exact path='/:weddingId/photo-list'
          render={({ match }) => {
            const { weddingId } = match.params
            return <WeddingPhotoList
              name={individualWedding.name}
              weddingId={individualWedding.weddingId}
              photoList={individualWedding.photoList} />
          }} />
        <Route exact path='/wedding/:weddingId'
          render={({ match }) => {
            const { weddingId } = match.params
            return <WeddingDetails
              weddingData={weddings.find((wedding:any) => wedding.id === weddingId)}
              />
          }} />
        <Route path='/add-wedding'>
          <AddWeddingForm />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
