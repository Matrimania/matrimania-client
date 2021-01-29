import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AddWeddingForm from '../components/AddWeddingForm/AddWeddingForm';

describe('App', () => {
  it('renders all App elements', async () => {
    const mockAddNewWedding = jest.fn()
    render(
      <MemoryRouter>
        <AddWeddingForm
          addNewWedding={mockAddNewWedding} />
      </MemoryRouter>
    );
    screen.debug()
  });
});