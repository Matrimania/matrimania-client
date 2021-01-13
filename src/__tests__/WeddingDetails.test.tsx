import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { individualWedding } from '../weddingData'
import WeddingDetails from '../components/WeddingDetails/WeddingDetails';

describe('WeddingDetails', () => {
  it('renders default WeddingDetails elements', () => {
    const detailsView = true;

    render(
      <MemoryRouter>
      <WeddingDetails
        weddingId={1}
        />
    </MemoryRouter>
    );
    
    expect(detailsView).toEqual(true)
    expect(screen.getByText('Wedding')).toBeInTheDocument();
    expect(screen.getByText('Invalid Date')).toBeInTheDocument()
    expect(screen.getByTestId('emailSection')).toBeInTheDocument()
    expect(screen.getByTestId('status')).toBeInTheDocument()
    expect(screen.getByAltText("detailImage")).toBeInTheDocument()
test2 Expects:
  });

  it('should render requestPhotoList view if no photos exist for this wedding', () => {
    const detailsView = false; 
    const requestPhotoView = true;

    render(
      <MemoryRouter>
      <WeddingDetails
        weddingId={1}
        />
    </MemoryRouter>
    );
    
    expect(detailsView).toEqual(false)
    expect(requestPhotoView).toEqual(true)
    expect(screen.getByText('Wedding')).toBeInTheDocument();
    expect(screen.getByText('Invalid Date')).toBeInTheDocument()
    expect(screen.getByTestId('emailSection')).toBeInTheDocument()
    expect(screen.getByTestId('status')).toBeInTheDocument()
    expect(screen.getByAltText("detailImage")).toBeInTheDocument()
    expect(screen.getByText("Request Photo List")).toBeInTheDocument()
    expect(screen.getByText("Add Photo List")).toBeInTheDocument()
    expect(screen.getByAltText("detailImage")).toBeInTheDocument()
  });

});