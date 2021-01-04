import './App.css';
import logo from '../../assets/FinalMatrimaniaLogo.png'

function App() {
  return (
    <div className="appWrap">
      <header className="headerWrap">
        <img src={logo} className="logo" alt="Matrimania Logo"/>
      </header>
      <section>Filter By:
        <select>
          <option value="0">All</option>
          <option value="1">Upcoming</option>
          <option value="2">Past</option>
          <option value="3">Today</option>
        </select>
      </section>
      <section className="weddingCardWrap">
      </section>
      <button className="addWeddingButton">+</button>
    </div>
  );
}

export default App;
