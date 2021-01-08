import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../components/App/App';

describe('App', () => {
  it('renders App elements', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    screen.debug()
    expect(true).toEqual(true)
  })
})