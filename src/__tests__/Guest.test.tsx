import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Guest from '../components/Guest/Guest';

describe('Guest', () => {
  it('renders Guest card', () => {
    render(
      <Guest
        id={1}
        key={1}
        guestName={"Bob Loblaw"}
        phoneNumber={1234567890}
      />
    );
    expect(screen.getByText("Bob Loblaw")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByRole("button",{name:"Delete 🗑"})).toBeInTheDocument();
  });

});