import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PhotoListForm from '../components/PhotoListForm/PhotoListForm';

describe('PhotoListForm', () => {
  it('renders PhotoList Form with guests', () => {
		const mockChangeView = jest.fn()
	
    render(
      <MemoryRouter>
        <PhotoListForm
        guests={[
            {isChecked: true, name: 'Bacob', phone: 5555551234, photos: [1, 2, 3, 4, 6]},
            {isChecked: true, name: 'Bohn', phone: 1111151234, photos: [1, 2, 3, 4, 6]},
            {isChecked: true, name: 'Bamy', phone: 2222221234, photos: [1, 2, 3, 4, 6]}
        ]}
        changeView={mockChangeView}
      />
      </MemoryRouter> 
    );
	
		expect(screen.getByRole('heading', {  name: /let's start with your photo list/i})).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: "To add a photo: 1. Add a description (optional) 2. Pick guests to include in the photo 3. Click Submit button Tip: Don't forget to include yourselves!"})).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
		expect(screen.getByText("Bacob")).toBeInTheDocument();
		expect(screen.getByText("Bohn")).toBeInTheDocument();
		expect(screen.getByText("Bamy")).toBeInTheDocument();
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

});