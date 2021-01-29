import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AddWeddingForm from '../components/AddWeddingForm/AddWeddingForm';

describe('Add Wedding Form', () => {
  it('renders all Add Wedding Form elements', async () => {
    const mockAddNewWedding = jest.fn()
    
    render(
      <MemoryRouter>
        <AddWeddingForm
          addNewWedding={mockAddNewWedding} />
      </MemoryRouter>
    );

    const formHeader = screen.getByText("Enter The Wedding Details");
    const nameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const dateInput = screen.getByPlaceholderText("Wedding Date");
    const imageInput = screen.getByPlaceholderText("Image Link (optional)");
    const submitButton = screen.getByText("Submit Wedding");

    expect(formHeader).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    screen.debug()
  });
});