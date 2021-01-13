// Assets
import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, Link} from 'react-router-dom'
import { getWeddings } from '../../apiCalls'
// Components
import VendorDashboard from '../VendorDashboard/VendorDashboard'
import WeddingDetails from '../WeddingDetails/WeddingDetails'
import LandingPage from '../LandingPage/LandingPage'
import AddWeddingForm from '../AddWeddingForm/AddWeddingForm'

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
        <Link to={`/`}>
          <img src={logo} className="logo" alt="Matrimania Logo"/>
        </Link>
      </header>
      <Switch>
        <Route exact path='/wedding/:weddingId'
          render={({ match }) => {
            const { weddingId } = match.params
            return <WeddingDetails
              weddingId={+weddingId}
              />
          }} />
        <Route path='/add-wedding'>
          <AddWeddingForm />
        </Route>
        <Route exact path='/'>
        <VendorDashboard
            weddings={weddings}
          />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
