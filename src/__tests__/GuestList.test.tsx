import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { individualWedding } from '../weddingData'
import userEvent from '@testing-library/user-event'

import GuestList from '../components/GuestList/GuestList';


describe("GuestList",() => {
	it('should render a guestlist page', () => {
		render(
			<MemoryRouter>
				<GuestList 
					changeView
					/>
			</MemoryRouter>
		);

		const guestListTitle = screen.getByText(`Let's start with your guest list`);
		const guestListInstructions = screen.getByRole('heading', {  name: `For each person included in your family photos, please include: 1. Their first and last name 2. A mobile phone number that accepts text messages Don't forget yourselves!`})

		expect(guestListTitle).toBeInTheDocument();
		expect(guestListInstructions).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Guest Name')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Phone (XXX-XXX-XXXX)')).toBeInTheDocument();
		expect(screen.getByText('Clear')).toBeInTheDocument();
		expect(screen.getByText('Add To Guest List')).toBeInTheDocument();
		expect(screen.getByText('< Back')).toBeInTheDocument();
		expect(screen.getByText('DONE >')).toBeInTheDocument();
		expect(screen.getByAltText('your guest list is empty')).toBeInTheDocument();
	});

	it('should allow the user to add a guest to the guest list', () => {
		render(
			<MemoryRouter>
				<GuestList 
					changeView
					/>
			</MemoryRouter>
		);
		
		const guest = 'Melvin Lamprust'
		const number = '123-456-7890'
		const guestNameInput = screen.getByPlaceholderText('Guest Name');
		const guestPhoneInput = screen.getByPlaceholderText('Phone (XXX-XXX-XXXX)')

		expect(guestNameInput).toBeInTheDocument();
		expect(guestPhoneInput).toBeInTheDocument();
		userEvent.type(guestNameInput, guest)
		expect(guestNameInput).toHaveValue('Melvin Lamprust')
		expect(guestPhoneInput).toHaveValue('')
		// expect(mockCheckNumber).toHaveBeenCalled()
		// expect(guestPhoneInput).toHaveFormValues('34')
	});

	it('should render an error message if a user does not fill out the form completely', () => {
		render(
			<MemoryRouter>
				<GuestList 
					changeView
					/>
			</MemoryRouter>
		);
		const guestNameInput = screen.getByPlaceholderText('Guest Name');
		const guestPhoneInput = screen.getByPlaceholderText('Phone (XXX-XXX-XXXX)')

		expect(guestNameInput).toBeInTheDocument();
		expect(guestPhoneInput).toBeInTheDocument();
		userEvent.type(guestNameInput, '')
		userEvent.type(guestPhoneInput, '')
		expect(guestNameInput).toHaveValue('')
		expect(guestPhoneInput).toHaveValue('')

	});

})

// test display is correct
// test format phone number function 
// userEvent.type 