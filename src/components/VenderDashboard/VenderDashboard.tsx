import './VenderDashboard.css';
import WeddingCard from '../WeddingCard/WeddingCard'
import {individualWedding, weddings} from '../../weddingData'


function VenderDashboard() {
  const weddingCards = weddings.map((wedding, index) => {
    return (
      <WeddingCard
        key={wedding.weddingId}
        name={wedding.name}
        image={wedding.image}
        date={wedding.date}
      />
    )
  })
    return (
        <section className="dashboardWrapper">
          <section>Filter By:
            <select>
                <option value="0">All</option>
                <option value="1">Upcoming</option>
                <option value="2">Past</option>
                <option value="3">Today</option>
            </select>
          </section>
          <section className="weddingCardWrap">
            {weddingCards}
          </section>
          <button className="addWeddingButton">+</button>
        </section>
    )
}
export default VenderDashboard;
