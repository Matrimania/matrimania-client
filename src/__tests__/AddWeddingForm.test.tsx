import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AddWeddingForm from '../components/AddWeddingForm/AddWeddingForm';

describe('Add Wedding Form', () => {
  it('renders all Add Wedding Form elements', () => {
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
  });

  it('prevents form submission without required fields filled', () => {
    const mockAddNewWedding = jest.fn()

    render(
      <MemoryRouter>
        <AddWeddingForm
          addNewWedding={mockAddNewWedding} />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("Submit Wedding");

    userEvent.click(submitButton)

    const errorMessage = screen.getByText("Please makes sure to include your name, email, and wedding date");
    expect(errorMessage).toBeInTheDocument();
  });
});