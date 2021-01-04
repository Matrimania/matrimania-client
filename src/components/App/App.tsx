import './App.css';
import logo from '../../assets/FinalMatrimaniaLogo.png'
import {Route, Switch, NavLink} from 'react-router-dom'
// Components
import VenderDashboard from '../VenderDashboard/VenderDashboard'
import WeddingDetails from '../WeddingDetails/WeddingDetails'
import WeddingPhotoList from '../WeddingPhotoList/WeddingPhotoList'
import LandingPage from '../LandingPage/LandingPage'



function App() {
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
        <Route path='/:weddingId'>
          <WeddingDetails />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
