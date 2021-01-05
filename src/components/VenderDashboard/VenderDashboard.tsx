import './VenderDashboard.css';
import WeddingCard from '../WeddingCard/WeddingCard'
import {individualWedding, weddings} from '../../weddingData'


function VenderDashboard() {
  const weddingCards = weddings.map((wedding, index) => {
    return (
      <WeddingCard
        key={wedding.weddingId}
        weddingId={wedding.weddingId}
        name={wedding.name}
        image={wedding.image}
        date={wedding.date}
      />
    )
  })
    return (
        <section className="dashboardWrapper">
          <section className="optionsWrap">
          <div className="button" id="addWeddingButton">
            <div id="translate"></div>
            <a>Add A Wedding</a>
          </div>
            <section className="filterWrap">
            <label className="label">Filter By :</label>
            <select className="button">
                <option value="0">All</option>
                <option value="1">Upcoming</option>
                <option value="2">Past</option>
                <option value="3">Today</option>
            </select>
            </section>
          </section>
          <section className="weddingCardWrap">
            {weddingCards}
          </section>
        </section>
    )
}
export default VenderDashboard;
