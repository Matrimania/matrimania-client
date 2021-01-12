import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

import WeddingPhotoList from '../components/WeddingPhotoList/WeddingPhotoList';

describe('WeddingPhotoList', () => {
	it('should render the WeddingPhotoList page', () => {
		const photoList = [{photoId: 1, guests:['Clarence', 'Schmidt', 'Cher'], description: 'Rowdy'}]
		render(
			<MemoryRouter>
				<WeddingPhotoList 
					name='Jumbalaya Smithers'
					weddingId={1}
					photoList={photoList}
				/>
			</MemoryRouter>
		)
		expect(screen.getByText('Photo: 1')).toBeInTheDocument();
		expect(screen.getByText('Guests: ClarenceSchmidtCher')).toBeInTheDocument();
		expect(screen.getByText('Description: Rowdy')).toBeInTheDocument();
	});
});