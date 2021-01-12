import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { individualWedding } from '../weddingData'
import WeddingDetails from '../components/WeddingDetails/WeddingDetails';

describe('WeddingDetails', () => {
  it('renders default WeddingDetails elements', () => {
    const detailsView = true;
    const photoListView = false;
    const editListView = false;

    render(
      <MemoryRouter>
        <WeddingDetails
        weddingId={individualWedding.weddingId}
        name={individualWedding.name}
        image={individualWedding.image}
        date={individualWedding.date}
        email={individualWedding.email}
        familyPhotoList={individualWedding.familyPhotoList}
        photoList={individualWedding.photoList}
        />
    </MemoryRouter>
    );
    
    expect(detailsView).toEqual(true)
    expect(screen.getByText('Johanessburg Wedding')).toBeInTheDocument();
    
  });

});