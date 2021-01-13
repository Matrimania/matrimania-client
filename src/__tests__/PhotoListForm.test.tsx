import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

import PhotoListForm from '../components/PhotoListForm/PhotoListForm';

describe('PhotoListForm', () => {
  it('renders PhotoList Form with guests', () => {
		const mockChangeView = jest.fn()
	
    render(
      <MemoryRouter>
        <PhotoListForm
					loading={false}
					weddingId={1}
					guests={[
							{id: 1, name: 'Bacob', phone: 5555551234, wedding: 1 },
							{id: 2, name: 'Bohn', phone: 1111151234, wedding: 1},
							{id: 3, name: 'Bamy', phone: 2222221234, wedding: 1}
					]}
					updateGuests
					updatePhotos
					changeView={mockChangeView}
					photoList={[
							{id: 1, photoNumber: 1, guest: ['Bacob, Bohn, Bamy'], desciption: 'Rowdy'},
							{id: 2, photoNumber: 2, guest: ['Bacob, Bohn, Bamy'], desciption: 'Old'},
							{id: 3, photoNumber: 3, guest: ['Bacob, Bohn, Bamy'], desciption: 'Fun'}
					]}
      />
      </MemoryRouter> 
    );
	
		expect(screen.getByRole('heading', {name: /let's build your photo list/i})).toBeInTheDocument();
		expect(screen.getByRole('heading', {name: `To add a photo: 1. Add a description 2. Pick guests to include in the photo 3. Click Submit button Tip: Don't forget to include yourselves!`})).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
		expect(screen.getByText('Submit Photo')).toBeInTheDocument();
		expect(screen.getByText("Bacob")).toBeInTheDocument();
		expect(screen.getByText("Bohn")).toBeInTheDocument();
		expect(screen.getByText("Bamy")).toBeInTheDocument();
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
	});
	
	it('renders PhotoList Form if there are no guests guests', () => {
		const mockChangeView = jest.fn()
	
    render(
      <MemoryRouter>
        <PhotoListForm
        loading={false}
				weddingId={1}
				guests={[]}
				updateGuests
				updatePhotos
				changeView={mockChangeView}
				photoList={[]}
      />
      </MemoryRouter> 
    );
	
		expect(screen.getByRole('heading', {name: /let's build your photo list/i})).toBeInTheDocument();
		expect(screen.getByRole('heading', {name: `To add a photo: 1. Add a description 2. Pick guests to include in the photo 3. Click Submit button Tip: Don't forget to include yourselves!`})).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
		expect(screen.getByText('Submit Photo')).toBeInTheDocument();
	});

	it('should allow the user to check guests', () => {
		const mockChangeView = jest.fn()
		const mockGetGuestNames = jest.fn().mockImplementation
    render(
      <MemoryRouter>
        <PhotoListForm
					loading={false}
					weddingId={1}
					guests={[
						{id: 1, name: 'Bacob', phone: 5555551234, wedding: 1 },
						{id: 2, name: 'Bohn', phone: 1111151234, wedding: 1},
						{id: 3, name: 'Bamy', phone: 2222221234, wedding: 1}
					]}
					updateGuests
					updatePhotos
					changeView={mockChangeView}
					photoList={[
						{id: 1, photoNumber: 1, guest: ['Bacob, Bohn, Bamy'], desciption: 'Rowdy'},
						{id: 2, photoNumber: 2, guest: ['Bacob, Bohn, Bamy'], desciption: 'Old'},
						{id: 3, photoNumber: 3, guest: ['Bacob, Bohn, Bamy'], desciption: 'Fun'}
				]}
      />
      </MemoryRouter> 
    );
				
		const checkbox = screen.getAllByRole('checkbox')

		expect(screen.getByRole('heading', {name: /let's build your photo list/i})).toBeInTheDocument();
		expect(screen.getByRole('heading', {name: `To add a photo: 1. Add a description 2. Pick guests to include in the photo 3. Click Submit button Tip: Don't forget to include yourselves!`})).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
		expect(screen.getByText('Submit Photo')).toBeInTheDocument();
		expect(screen.getByText("Bacob")).toBeInTheDocument();
		expect(screen.getByText("Bohn")).toBeInTheDocument();
		expect(screen.getByText("Bamy")).toBeInTheDocument();
		expect(checkbox).toHaveLength(3);

		userEvent.click(checkbox[0]);

		expect(checkbox[0]).toBeChecked()
		expect(checkbox[1]).not.toBeChecked()
		expect(checkbox[2]).not.toBeChecked()
	});
	//user submits form? integration? 
	// api call mockimplementation or toHaveReturned(data)
});