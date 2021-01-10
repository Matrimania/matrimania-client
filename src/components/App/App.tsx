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

const App = () => {
  return (
    <div className="appWrap">
      <header className="headerWrap">
        <Link to={`/vender-dashboard`}>
          <img src={logo} className="logo" alt="Matrimania Logo"/>
        </Link>
      </header>
      <Switch>
        <Route path='/vendor-dashboard'>
          <VendorDashboard />
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
              weddingId={individualWedding.weddingId}
              name={individualWedding.name}
              image={individualWedding.image}
              date={individualWedding.date}
              email={individualWedding.email}
              familyPhotoList={individualWedding.familyPhotoList}
              photoList={individualWedding.photoList} />
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
