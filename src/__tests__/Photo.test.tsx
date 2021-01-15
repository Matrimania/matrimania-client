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
            'Bacob',
            'Bohn',
            'Bamy'
          ]}
          description={"Rebellious Bunch"}
          location={'details'}
      />
      </MemoryRouter>
    );

    expect(screen.getByText('PHOTO 1')).toBeInTheDocument();
    expect(screen.getByText('• Bacob • Bohn • Bamy •')).toBeInTheDocument();
    expect(screen.getByText('Description: Rebellious Bunch')).toBeInTheDocument();

  });

});
