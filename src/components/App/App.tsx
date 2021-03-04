// Assets
import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, Link} from 'react-router-dom'
import { postAGuest, postAPhoto, getWeddings, deleteWedding, getSingleWeddingGuests, getSingleWeddingPhotos } from '../../apiCalls'
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
type Guest = {
	id: number;
	name: string;
	phoneNumber: string;
	wedding: number;
}
type Photo = {
	id: number;
	number: number;
	description: string;
	guest: number[];
	weddingId: number;
}

const App = () => {
  const [weddings, setWeddings] = useState<Wedding[]>([])
  const [errorMessage, setErrorMessage] = useState({photoError: '', guestError: '', weddingError: ''})
	const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [currentWeddingGuests, setCurrentWeddingGuests] = useState<Guest[]>([])
  const [currentWeddingPhotos, setCurrentWeddingPhotos] = useState<Photo[]>([])
  const [currentWeddingData, setCurrentWeddingData] = useState({id: 0, name: "", email: "", date: "", image: ""});



  useEffect(() => {
    setIsLoading(true)
    const allWeddings = async () => {
      const result = await getWeddings()
      if(typeof result !== 'string' && result.length > 0) {
        result.forEach((wed: any) => {
          wed.date = dayjs(wed.date)
        })
        let sortedResult = result.sort((a: any, b: any) => a.date - b.date)
        sortedResult.forEach((wedding: any) => {
          wedding.date = dayjs(wedding.date).format('MM/DD/YYYY')
        })
        setWeddings(sortedResult)
        setIsLoading(false)
      } else {
        setHasError(true)
        setErrorMessage(result)
        setIsLoading(false)
      }
    }
    allWeddings()
  }, [])

  const addNewWedding = (newWedding: any) => {
    setWeddings([...weddings, newWedding])
  };

  const deleteSingleWedding = async (weddingId: number) => {
    let deletedWedding = await deleteWedding(weddingId);
		if (deletedWedding !== 'Not Deleted') {
      const remainingWeddings = weddings.filter(wedding => wedding.id !== weddingId)
      setWeddings(remainingWeddings)
		} else {
			alert('Wedding Not Deleted')
		}
	};

  const loadSingleWedding = (weddingId: number) => {
    let weddingResult
    if(weddings) {
      weddingResult = weddings.find((wedding: Wedding) => wedding.id === weddingId)
    }
    if(!weddingResult) {
      setHasError(true)
      setErrorMessage({...errorMessage, weddingError: "No weddings found"})
    } else {
      setCurrentWeddingData(weddingResult)
    }
    getGuests(weddingId)
    getPhotos(weddingId)
  }

  const getGuests = async (weddingId: number) => {
    const guestResult = await getSingleWeddingGuests(weddingId)
    if(guestResult === "No guests found") {
      setHasError(true)
      setErrorMessage({...errorMessage, guestError: guestResult})
    } else {
      let sortedResult = guestResult.sort((a: Guest, b: Guest) => {
        let aName = a.name.toLowerCase()
        let bName = b.name.toLowerCase()
        if(aName < bName) {
          return -1
        }
        if(aName > bName) {
          return 1
        }
        return 0
      })
      let finalResult = sortedResult.map((person: Guest) => {
        person.name = person.name.charAt(0).toUpperCase() + person.name.slice(1)
        return person
      })
      console.log(sortedResult);

      setCurrentWeddingGuests(finalResult)
    }
  }

  const getPhotos = async (weddingId: number) => {
    const photoResult = await getSingleWeddingPhotos(weddingId)
		if(photoResult === "No photos found") {
			setHasError(true)
			setErrorMessage({...errorMessage, weddingError: photoResult})
		} else {
			setCurrentWeddingPhotos(photoResult)
		}
  }

  const updateGuests = async (newGuest: any) => {
    let postedGuest = await postAGuest(newGuest)
    setCurrentWeddingGuests([...currentWeddingGuests, postedGuest])
  }

  const updatePhotoList = async (newPhoto: any) => {
    let postedPhoto = await postAPhoto(newPhoto);
    setCurrentWeddingPhotos([...currentWeddingPhotos, postedPhoto]);
  }


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
              currentWeddingData={currentWeddingData}
              guests={currentWeddingGuests}
              photos={currentWeddingPhotos}
              deleteSingleWedding={deleteSingleWedding}
              loadWeddingData={loadSingleWedding}
              error={errorMessage}
              updateGuests={updateGuests}
              updatePhotoList={updatePhotoList}
            />
          }}
        />
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
