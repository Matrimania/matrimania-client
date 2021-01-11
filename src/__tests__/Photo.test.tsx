import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Photo from '../components/Photo/Photo';

describe('Photo', () => {
  it('renders Photo page', () => {
    render(
      <MemoryRouter>
        <Photo
        id={1}
        photoNumber={1}
        guests={[
            {isChecked: true, name: 'Bacob', phone: 5555551234, photos: [1, 2, 3, 4, 6]},
            {isChecked: true, name: 'Bohn', phone: 1111151234, photos: [1, 2, 3, 4, 6]},
            {isChecked: true, name: 'Bamy', phone: 2222221234, photos: [1, 2, 3, 4, 6]}
        ]}
        description={"Rebellious Bunch"}
      />
      </MemoryRouter> 
    );
    
    expect(screen.getByText('Photo 1')).toBeInTheDocument();
    expect(screen.getByText('Guests: BacobBohnBamy')).toBeInTheDocument();
    expect(screen.getByText('Description: Rebellious Bunch')).toBeInTheDocument();
    
  });

});