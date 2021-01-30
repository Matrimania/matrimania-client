import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '../components/App/App';
import { getWeddings, postAWedding, getSingleWeddingPhotos, getSingleWeddingGuests, deleteWedding } from '../apiCalls';

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
    getSingleWeddingGuests.mockResolvedValue([])
    getSingleWeddingPhotos.mockResolvedValue([])
    deleteWedding.mockResolvedValue({
      "id": 64, 
      "name": "Bibb", 
      "email": "lettuce@eat.com", 
      "date": "03/23/2435", 
      "image": "www.img.com/weddingpic.jpg"
    })
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
      "name": "Banks",
      "email": "philNviv@belair.com",
      "date": "02/22/2022",
      "image": "https://image2.org"
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 

    const addWeddingLink = screen.getByText("Add A Wedding");
    userEvent.click(addWeddingLink);

    const nameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const dateInput = screen.getByPlaceholderText("Wedding Date");
    const imageInput = screen.getByPlaceholderText("Image Link (optional)");
    const submitButton = screen.getByText("Submit Wedding");
    
    userEvent.type(nameInput, 'Banks')
    userEvent.type(emailInput, 'philNviv@belair.com')
    userEvent.type(dateInput, '2022-02-22')
    userEvent.type(imageInput, 'www.image.com/image.jpg')
    userEvent.click(submitButton)

    await waitFor(() => {})
    const weddingName1 = screen.getByText("Banks Wedding");
    const weddingDate1 = screen.getByText("02/22/2022");
    const weddingImage1 = screen.getByAltText("The happy Banks couple");
    expect(weddingName1).toBeInTheDocument();
    expect(weddingDate1).toBeInTheDocument();
    expect(weddingImage1).toBeInTheDocument();
  });

  it('can route a user to a wedding details page', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 

    await waitFor(() => {})
    const wedding2Link = screen.getByTestId("Bueller-link")
    expect(wedding2Link).toBeInTheDocument();
    userEvent.click(wedding2Link);

    await waitFor(() => {})
    screen.debug()
    const weddingName = screen.getByText("Bueller Wedding");
    const weddingDate = screen.getByText("01/28/2021");
    const weddingEmail = screen.getByText("Email: saveferris@netscape.com");
    const status = screen.getByText("Status: Pending");
    const deleteButton = screen.getByText("Delete Wedding");
    const requestPhotoListButton = screen.getByText("Request Photo List");
    const addPhotoListButton = screen.getByText("Add Photo List");

    expect(weddingName).toBeInTheDocument();
    expect(weddingDate).toBeInTheDocument();
    expect(weddingEmail).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(requestPhotoListButton).toBeInTheDocument();
    expect(addPhotoListButton).toBeInTheDocument();
  });


});