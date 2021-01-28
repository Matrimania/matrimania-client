// Assets
import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, Link} from 'react-router-dom'
import { getWeddings,  deleteWedding  } from '../../apiCalls'
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
  const [isLoading, setIsLoading] = useState(false)

  const addNewWedding = (newWedding: any) => {
      setWeddings([...weddings, newWedding])
  }

  useEffect(() => {
    setIsLoading(true)
    const allWeddings = async () => {
      const result = await getWeddings()
      console.log(result)
      if(typeof result !== 'string' && result.length > 0) {
        result.forEach((wed: any) => {
          wed.date = dayjs(wed.date)
        })
        console.log(result)
        let sortedResult = result.sort((a: any, b: any) => a.date - b.date)
        sortedResult.forEach((wedding: any) => {
          wedding.date = dayjs(wedding.date).format('MM/DD/YYYY')
        })
<<<<<<< HEAD
        setWeddings(sortedResult)
        setIsLoading(false)
=======
          setWeddings(sortedResult)
>>>>>>> 5f3e417876c2e9b0207b6c79f7b6eb843989e97d
      } else {
        setError(true)
        setErrorMessage(result)
        setIsLoading(false)
      }
    }
    allWeddings() 
  }, [])

  const deleteSingleWedding = async (weddingId: number) => {
		let deletedWedding = await deleteWedding(weddingId);
		if (deletedWedding !== 'Not Deleted') {
      const remainingWeddings = weddings.filter(wedding => wedding.id !== weddingId)
      setWeddings(remainingWeddings)
		} else {
			alert('Wedding Not Deleted')
		}
	};

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
              deleteSingleWedding={deleteSingleWedding}
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
            loading={isLoading}
          />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
