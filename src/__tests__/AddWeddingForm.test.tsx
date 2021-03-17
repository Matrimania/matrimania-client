import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { postAWedding } from '../apiCalls.tsx';
import AddWeddingForm from '../components/AddWeddingForm/AddWeddingForm';
jest.mock('../apiCalls.tsx');


describe('Add Wedding Form', () => {
  it('renders all Add Wedding Form elements', () => {
    const mockAddNewWedding = jest.fn();

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
    const mockAddNewWedding = jest.fn();

    render(
      <MemoryRouter>
        <AddWeddingForm
          addNewWedding={mockAddNewWedding} />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("Submit Wedding");
    userEvent.click(submitButton);

    const errorMessage = screen.getByText("Please makes sure to include your name, email, and wedding date");
    expect(errorMessage).toBeInTheDocument();
  });

  it('should add a new wedding', async () => {
    const mockAddNewWedding = jest.fn(() => postAWedding());
    postAWedding.mockResolvedValue({
      "id": 33,
      "name": "Banks",
      "email": "philNviv@belair.com",
      "date": "02/22/2022",
      "image": "https://image2.org"
    });

    render(
      <MemoryRouter>
        <AddWeddingForm
          addNewWedding={mockAddNewWedding} />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const dateInput = screen.getByPlaceholderText("Wedding Date");
    const imageInput = screen.getByPlaceholderText("Image Link (optional)");
    const submitButton = screen.getByText("Submit Wedding");

    userEvent.type(nameInput, 'Banks');
    userEvent.type(emailInput, 'philNviv@belair.com');
    userEvent.type(dateInput, '2022-02-22');
    userEvent.type(imageInput, 'www.image.com/image.jpg');
    userEvent.click(submitButton);

    await waitFor(() => expect(mockAddNewWedding).toHaveBeenCalled());
    expect(postAWedding).toHaveBeenCalled();
  });

  it('allows form submission without image field filled', async () => {
    const mockAddNewWedding = jest.fn(() => postAWedding());
    postAWedding.mockResolvedValue({
      "id": 33,
      "name": "Banks",
      "email": "philNviv@belair.com",
      "date": "02/22/2022",
      "image": "https://image2.org"
    });

    render(
      <MemoryRouter>
        <AddWeddingForm
          addNewWedding={mockAddNewWedding} />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const dateInput = screen.getByPlaceholderText("Wedding Date");
    const imageInput = screen.getByPlaceholderText("Image Link (optional)");
    const submitButton = screen.getByText("Submit Wedding");

    userEvent.type(nameInput, 'Banks');
    userEvent.type(emailInput, 'philNviv@belair.com');
    userEvent.type(dateInput, '2022-02-22');
    userEvent.click(submitButton);

    await waitFor(() => expect(mockAddNewWedding).toHaveBeenCalled());
    expect(postAWedding).toHaveBeenCalled();
  });
});
