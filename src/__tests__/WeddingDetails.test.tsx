import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { individualWedding } from '../weddingData'
import WeddingDetails from '../components/WeddingDetails/WeddingDetails';
import App from '../components/App/App';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import { getWeddings, postAWedding, getSingleWeddingPhotos, getSingleWeddingGuests, deleteWedding, postAGuest, postAPhoto } from '../apiCalls';

window.scrollTo = jest.fn();
jest.mock('../apiCalls.tsx');



describe('WeddingDetails', () => {

  it('renders default WeddingDetails elements', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByText('Delete Wedding')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByAltText('detailImage')).toBeInTheDocument();
  });

  it('should render a "request" and "add" button if no photos exist for this wedding', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByAltText('detailImage')).toBeInTheDocument();
    expect(screen.getByText('Request Photo List')).toBeInTheDocument();
    expect(screen.getByText('Add Photo List')).toBeInTheDocument();
  });

  it('should display an "edit" button if a photo list exists for the current wedding', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
            {id: 1, number: 1, description: "just bob", guest: [1], weddingId: 1}
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByAltText('detailImage')).toBeInTheDocument();
    expect(screen.queryByText('Request Photo List')).not.toBeInTheDocument();
    expect(screen.getByText('Edit Photo Details')).toBeInTheDocument();
  });

  it('should display a "Start Photo Session" button if the wedding takes place on the current day', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();
    const today = dayjs().format("MM/DD/YYYY");

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: today, image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
            {id: 1, number: 1, description: "just bob", guest: [1], weddingId: 1}
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByAltText('detailImage')).toBeInTheDocument();
    expect(screen.getByText('Edit Photo Details')).toBeInTheDocument();
    expect(screen.getByText('Start Photo Session')).toBeInTheDocument();
  });

  it('should display a photo list if a photo list exists for the current wedding', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
            {id: 1, number: 1, description: "just bob", guest: [1], weddingId: 1}
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByText('Wedding Photos')).toBeInTheDocument();
    expect(screen.getByText('PHOTO 1')).toBeInTheDocument();
    expect(screen.getByText('• Bob •')).toBeInTheDocument();
    expect(screen.getByText('Description: just bob')).toBeInTheDocument();
  });

  it('should NOT display a photo list if a photo list does not exist for the current wedding', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.queryByText('Wedding Photos')).not.toBeInTheDocument();
  });

  it('should delete a wedding', async () => {
    getWeddings.mockResolvedValue([
      {
        "id": 31,
        "name": "Bueller",
        "email": "saveferris@netscape.com",
        "date": "01/28/2021",
        "image": "https://imagelink.com"
      }
    ])
    getSingleWeddingPhotos.mockResolvedValue([])
    getSingleWeddingGuests.mockResolvedValue([])
    deleteWedding.mockResolvedValue({
      "id": 31,
      "name": "Bueller",
      "email": "saveferris@netscape.com",
      "date": "01/28/2021",
      "image": "https://imagelink.com"
    });
    await act(getWeddings)

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const wedding2Link = await waitFor(() => screen.getByTestId("Bueller-link"));
    expect(wedding2Link).toBeInTheDocument();
    userEvent.click(wedding2Link);

    const deleteButton = await waitFor(() => screen.getByText("Delete Wedding"));
    userEvent.click(deleteButton);

    const noWeddingsImage = await waitFor(() => screen.getByAltText("No weddings in storage"));
    expect(noWeddingsImage).toBeInTheDocument();
  });

  it('should fire a function to delete the current wedding', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
            {id: 1, number: 1, description: "just bob", guest: [1], weddingId: 1}
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByText('Delete Wedding')).toBeInTheDocument();

    userEvent.click(screen.getByText('Delete Wedding'));
    expect(mockDeleteWedding).toHaveBeenCalled();
  });

  it('should render the GuestListForm', () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
            {id: 1, number: 1, description: "just bob", guest: [1], weddingId: 1}
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByText('Edit Photo Details')).toBeInTheDocument();

    userEvent.click(screen.getByText('Edit Photo Details'));

    const guestListTitle = screen.getByText(`Let's start with your guest list`);
    const guestListInstructions = screen.getByRole('heading', {  name: `For each person included in your family photos, please include: 1. Their first and last name 2. A mobile phone number that accepts text messages Don't forget yourselves!`});

    expect(guestListTitle).toBeInTheDocument();
    expect(guestListInstructions).toBeInTheDocument();
  });

  it('should render the PhotoListForm', async () => {
    const mockDeleteWedding = jest.fn();
    const mockLoadWedding = jest.fn();
    const mockUpdateGuests = jest.fn();
    const mockUpdatePhotos = jest.fn();

    render(
      <MemoryRouter>
        <WeddingDetails
          weddingId={1}
          currentWeddingData={
            {id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
          }
          guests={[
            {id: 1, name: "Bob", phoneNumber: "303-222-8888", wedding: 1}
          ]}
          photos={[
            {id: 1, number: 1, description: "just bob", guest: [1], weddingId: 1}
          ]}
          deleteSingleWedding={mockDeleteWedding}
          loadWeddingData={mockLoadWedding}
          error={{photoError: '', guestError: '', weddingError: ''}}
          updateGuests={mockUpdateGuests}
          updatePhotoList={mockUpdatePhotos}
        />
    </MemoryRouter>
    );

    expect(screen.getByText('Henderson Wedding')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument();
    expect(screen.getByText('Email: email@aol.com')).toBeInTheDocument();
    expect(screen.getByText('Edit Photo Details')).toBeInTheDocument();

    act(() => userEvent.click(screen.getByText('Edit Photo Details')));

    const guestListTitle = screen.getByText(`Let's start with your guest list`);
    const guestListInstructions = screen.getByRole('heading', {  name: `For each person included in your family photos, please include: 1. Their first and last name 2. A mobile phone number that accepts text messages Don't forget yourselves!`});

    expect(guestListTitle).toBeInTheDocument();
    expect(guestListInstructions).toBeInTheDocument();
    expect(screen.getByText('Photos >')).toBeInTheDocument();

    userEvent.click(screen.getByText('Photos >'));

    await waitFor(() => expect(screen.getByText(`Let's build your photo list`)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Guests:')).toBeInTheDocument());
  });
});
