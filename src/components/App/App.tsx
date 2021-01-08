import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, NavLink} from 'react-router-dom'
import { weddings, individualWedding } from '../../weddingData'
// Components
import VendorDashboard from '../VendorDashboard/VendorDashboard'
import WeddingDetails from '../WeddingDetails/WeddingDetails'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList'
import LandingPage from '../LandingPage/LandingPage'
import GuestListForm from '../GuestList/GuestList'

const App = () => {
  return (
    <div className="appWrap">
      <header className="headerWrap">
        <img src={logo} className="logo" alt="Matrimania Logo"/>
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
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/create-guest-list'>
          <GuestListForm />
        </Route>
      </Switch>
    </div>
  );
}
export default App;


















