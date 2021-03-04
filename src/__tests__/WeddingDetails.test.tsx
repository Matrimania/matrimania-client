import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { individualWedding } from '../weddingData'
import WeddingDetails from '../components/WeddingDetails/WeddingDetails';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';


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

  it('should display an "Start Photo Session" button if the wedding takes place on the current day', () => {
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

  it('should render the PhotoListForm', () => {
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
    expect(screen.getByText('Photos >')).toBeInTheDocument();

    userEvent.click(screen.getByText('Photos >'));

    expect(screen.getByRole('heading', {name: /let's build your photo list/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: `To add a photo: 1. Add a description 2. Pick guests to include in the photo 3. Click Submit button Tip: Don't forget to include yourselves!`})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
  });
});
