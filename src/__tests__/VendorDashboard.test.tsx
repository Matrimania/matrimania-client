import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

import VendorDashboard from '../components/VendorDashboard/VendorDashboard';

describe('VendorDashboard', () => {
	it('should render the vendor dashboard', () => {
		render(
			<MemoryRouter>
				<VendorDashboard />
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();
		expect(screen.getByText('All')).toBeInTheDocument();
	})
})