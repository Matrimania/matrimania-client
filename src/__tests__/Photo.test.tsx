import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Photo from '../components/Photo/Photo';

describe('WeddingCard', () => {
  it('renders WeddingCard card', () => {
    render(
      <MemoryRouter>
        <Photo
        id={1}
        photoNumber={1}
        guests={["Gary", "Jim", "Mary", "Bob"]}
        description={"Rebellious Bunch"}
      />
      </MemoryRouter>
      
    );
    expect(screen.getByText("Jim & Pam Wedding")).toBeInTheDocument();
    expect(screen.getByText("10/08/2009")).toBeInTheDocument();
    expect(screen.getByAltText("Photo of couple: Jim & Pam")).toBeInTheDocument();
  });

});