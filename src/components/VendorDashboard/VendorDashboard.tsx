import './VendorDashboard.css';
import WeddingCard from '../WeddingCard/WeddingCard'
import { getWeddings } from '../../apiCalls'
import { StyledButton } from '../App/styledComponents.styles'
import './VenderDashboard.css';


function VendorDashboard() {
  const weddingCards = weddings.map((wedding, index) => {
    return (
      <WeddingCard
        key={singleWedding.id}
        id={singleWedding.id}
        name={singleWedding.name}
        image={singleWedding.image}
        date={singleWedding.date}
      />
    )
  })
    return (
        <section className="dashboardWrapper">
          <section className="optionsWrap">
          <StyledButton>
            <div id="translate"></div>
            <Link to={`/add-wedding`} className="link">Add A Wedding</Link>
          </StyledButton>
            <section className="filterWrap">
            <label className="label">Filter By :</label>
            <select className="dropdown">
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
export default VendorDashboard;
