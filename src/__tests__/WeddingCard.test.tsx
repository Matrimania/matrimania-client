import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import WeddingCard from '../components/WeddingCard/WeddingCard';

describe('WeddingCard', () => {
  it('renders WeddingCard card', () => {
    render(
      <MemoryRouter>
        <WeddingCard
        weddingId={1}
        name={"Jim & Pam"}
        image={"fotopail.com/weddingphoto"}
        date={"10/08/2009"}
      />
      </MemoryRouter>
      
    );
    expect(screen.getByText("Jim & Pam Wedding")).toBeInTheDocument();
    expect(screen.getByText("10/08/2009")).toBeInTheDocument();
    expect(screen.getByAltText("Photo of couple: Jim & Pam")).toBeInTheDocument();
  });

});