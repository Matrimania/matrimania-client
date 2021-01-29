import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '../components/App/App';
import { getWeddings, postAWedding, deleteWedding } from '../apiCalls';

jest.mock('../apiCalls.tsx');

describe('App', () => {
  beforeEach(() => {
    getWeddings.mockResolvedValue([
      {
        "id": 31,
        "name": "Bueller",
        "email": "saveferris@netscape.com",
        "date": "01/28/2021",
        "image": "https://imagelink.com"
      }
    ])
  })

  it('renders all App elements', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    const appLogo = screen.getByAltText("Matrimania Logo");
    const addWeddingLink = screen.getByText("Add A Wedding");
    const filterLink = screen.getByText("Filter By :");
    expect(appLogo).toBeInTheDocument();
    expect(addWeddingLink).toBeInTheDocument();
    expect(filterLink).toBeInTheDocument();

    await waitFor(() => {})

    const weddingName2 = screen.getByText("Bueller Wedding");
    const weddingDate2 = screen.getByText("01/28/2021");
    const weddingImage2 = screen.getByAltText("The happy Bueller couple");

    expect(weddingName2).toBeInTheDocument();
    expect(weddingDate2).toBeInTheDocument();
    expect(weddingImage2).toBeInTheDocument();
  });

  it('can add a wedding', async () => {
    postAWedding.mockResolvedValue({
      "id": 33,
      "name": "Matthews",
      "email": "cooldude69@aol.com",
      "date": "01/27/2021",
      "image": "https://image2.org"
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 

    const addWeddingLink = screen.getByText("Add A Wedding");
    userEvent.click(addWeddingLink);

    const formHeader = screen.getByText("Enter The Wedding Details");
    const nameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const dateInput = screen.getByPlaceholderText("Wedding Date");
    const imageInput = screen.getByPlaceholderText("Image Link");
    const submitButton = screen.getByText("Submit Wedding");
    
    expect(formHeader).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument()
    userEvent.type(nameInput, 'Banks')
    userEvent.type(emailInput, 'philNviv@belair.com')
    userEvent.type(dateInput, '2021-02-22')
    userEvent.type(imageInput, 'www.image.com/image.jpg')
    userEvent.click(submitButton)

    await waitFor(() => {})
    screen.debug()
    const weddingName1 = screen.getByText("Matthews Wedding");
    const weddingDate1 = screen.getByText("01/27/2021");
    const weddingImage1 = screen.getByAltText("The happy Matthews couple");
    expect(weddingName1).toBeInTheDocument();
    expect(weddingDate1).toBeInTheDocument();
    expect(weddingImage1).toBeInTheDocument();
  });

  it()
});