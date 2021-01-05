import './WeddingDetails.css';
import { individualWedding } from '../../weddingData'

type IndividualWedding = {
		weddingId: number;
  name: string;
  image: string;
  date: string;
  email: string;
  familyPhotoList: {name: string, photos: number[], phone: number}[] 
  photoList: {photoId: number, guests: string[], description: string}[]
}

const WeddingDetails: React.FC<IndividualWedding> = ({
	weddingId, 
	name,
	image, 
	date, 
	email, 
	familyPhotoList, 
	photoList
}) {
	
    return (
        <section className="detailsWrapper">
            <div>WeddingDetails</div>
        </section>
    )
}
export default WeddingDetails;

// we need:
	// name of wedding
	//date
	//email
	//status
	//image - same as on vendor wedding page
	// request list/photo list button -conditional rendering?
	// create my guest list button
	// back button 
