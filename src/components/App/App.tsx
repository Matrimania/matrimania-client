import './App.css';
import React, {useState, useEffect} from 'react'
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, NavLink} from 'react-router-dom'
import { weddings, individualWedding } from '../../weddingData'
// Components
import VenderDashboard from '../VenderDashboard/VenderDashboard'
import WeddingDetails from '../WeddingDetails/WeddingDetails'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList'
import LandingPage from '../LandingPage/LandingPage'

const App = () => {
  return (
    <div className="appWrap">
      <header className="headerWrap">
        <img src={logo} className="logo" alt="Matrimania Logo"/>
      </header>
      <Switch>
        <Route path='/vender-dashboard'>
          <VenderDashboard />
        </Route>
        <Route path='/:weddingId/photo-list'>
          <WeddingPhotoList />
        </Route>
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
      </Switch>
    </div>
  );
}
export default App;


















