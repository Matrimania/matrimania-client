// Assets
import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, Link} from 'react-router-dom'
import { getWeddings } from '../../apiCalls'
import dayjs from 'dayjs'

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

  const addNewWedding = (newWedding: any) => {
    setWeddings([...weddings, newWedding])
  }

  useEffect(() => {
    const allWeddings = async () => {
      const result = await getWeddings()
      console.log(result)
      if(typeof result !== 'string' && result.length > 0) {
        result.forEach((wed: any) => {
          wed.date = dayjs(wed.date)
        })
        console.log(result)
        let sortedResult = result.sort((a: any, b: any) => b.date - a.date)
        sortedResult.forEach((wedding: any) => {
          wedding.date = dayjs(wedding.date).format('MM/DD/YYYY')
        })
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
          <AddWeddingForm
            addNewWedding={addNewWedding}
          />
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
