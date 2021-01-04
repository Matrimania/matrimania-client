import './VenderDashboard.css';
import WeddingCard from '../WeddingCard/WeddingCard'



function VenderDashboard() {
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
          </section>
          <button className="addWeddingButton">+</button>
        </section>
    )
}
export default VenderDashboard;
