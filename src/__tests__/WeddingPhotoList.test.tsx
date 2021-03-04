import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import WeddingPhotoList from '../components/WeddingPhotoList/WeddingPhotoList';

describe('WeddingPhotoList', () => {

	it('should render the WeddingPhotoList page', () => {
		const photoList = [{id: 1, number: 1, guest:[1, 2, 3], description: 'Rowdy'}];
		const guestList = [
			{id: 1, name: 'Clarence', phoneNumber: "555-555-5555", wedding: 1},
			{id: 2, name: 'Schmidt', phoneNumber: "555-555-5555", wedding: 1},
			{id: 3, name: 'Cher', phoneNumber: "555-555-5555", wedding: 1}
		];

		render(
			<MemoryRouter>
				<WeddingPhotoList
					name='Jumbalaya Smithers'
					weddingId={1}
					photoList={photoList}
					guestList={guestList}
				/>
			</MemoryRouter>
		);

		expect(screen.getByText('PHOTO 1')).toBeInTheDocument();
		expect(screen.getByText('• Clarence • Schmidt • Cher •')).toBeInTheDocument();
		expect(screen.getByText('Description: Rowdy')).toBeInTheDocument();
	});

	it('should render the multiple Wedding Photos', () => {
		const photoList = [
			{id: 1, number: 1, guest:[1, 2, 3], description: 'Rowdy'},
			{id: 2, number: 2, guest:[4, 5, 6], description: 'Docile'}
		];
		const guestList = [
			{id: 1, name: 'Clarence', phoneNumber: "555-555-5555", wedding: 1},
			{id: 2, name: 'Schmidt', phoneNumber: "555-555-5555", wedding: 1},
			{id: 3, name: 'Cher', phoneNumber: "555-555-5555", wedding: 1},
			{id: 4, name: 'Catepillar', phoneNumber: "555-555-5555", wedding: 1},
			{id: 5, name: 'Sleepy', phoneNumber: "555-555-5555", wedding: 1},
			{id: 6, name: 'Eyore', phoneNumber: "555-555-5555", wedding: 1}
		];

		render(
			<MemoryRouter>
				<WeddingPhotoList
					name='Jumbalaya Smithers'
					weddingId={1}
					photoList={photoList}
					guestList={guestList}
				/>
			</MemoryRouter>
		);

		expect(screen.getByText('PHOTO 1')).toBeInTheDocument();
		expect(screen.getByText('• Clarence • Schmidt • Cher •')).toBeInTheDocument();
		expect(screen.getByText('Description: Rowdy')).toBeInTheDocument();
		expect(screen.getByText('PHOTO 2')).toBeInTheDocument();
		expect(screen.getByText('• Catepillar • Sleepy • Eyore •')).toBeInTheDocument();
		expect(screen.getByText('Description: Docile')).toBeInTheDocument();
	});
});
