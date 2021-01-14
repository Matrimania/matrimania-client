import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { individualWedding } from '../weddingData'
import userEvent from '@testing-library/user-event'

import GuestList from '../components/GuestList/GuestList';


describe("GuestList",() => {
	it('should render a guestlist page', () => {
		const mockChangeView = jest.fn()
		const mockUpdateGuests = jest.fn()
		render(
			<MemoryRouter>
				<GuestList
					loading={false}
					guestList={[]}
					changeView={mockChangeView}
					weddingId={1}
					updateGuests={mockUpdateGuests}
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
		expect(screen.getByText('Photos >')).toBeInTheDocument();
		expect(screen.getByAltText('your guest list is empty')).toBeInTheDocument();
	});

	it('should allow the user to add a guest to the guest list', () => {
		const mockChangeView = jest.fn()
		const mockUpdateGuests = jest.fn()
		render(
			<MemoryRouter>
				<GuestList
					loading={false}
					guestList={[]}
					changeView={mockChangeView}
					weddingId={1}
					updateGuests={mockUpdateGuests}
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
		// issue has to do with formating phone number. Can't expect it to have the full value because function checks each value independently
	});

	it('should render an error message if a user does not fill out the form completely', () => {
		const mockChangeView = jest.fn()
		const mockUpdateGuests = jest.fn()
		render(
			<MemoryRouter>
				<GuestList
					loading={false}
					guestList={[]}
					changeView={mockChangeView}
					weddingId={1}
					updateGuests={mockUpdateGuests}
					/>
			</MemoryRouter>
		);
		const guestNameInput = screen.getByPlaceholderText('Guest Name');
		const guestPhoneInput = screen.getByPlaceholderText('Phone (XXX-XXX-XXXX)')
		const submitButton = screen.getByText('Add To Guest List')
		const errorMessage = 'Name and Phone Number Required'

		expect(submitButton).toBeInTheDocument();
		expect(guestNameInput).toBeInTheDocument();
		expect(guestPhoneInput).toBeInTheDocument();
		userEvent.type(guestNameInput, '')
		userEvent.type(guestPhoneInput, '')
		expect(guestNameInput).toHaveValue('')
		expect(guestPhoneInput).toHaveValue('')
		userEvent.click(submitButton)
		expect(screen.getByText(errorMessage)).toBeInTheDocument()
	});

	it('should render a phone number error message if a user does not fill out the phone number input on the form', () => {
		const mockChangeView = jest.fn()
		const mockUpdateGuests = jest.fn()
		render(
			<MemoryRouter>
				<GuestList
					loading={false}
					guestList={[]}
					changeView={mockChangeView}
					weddingId={1}
					updateGuests={mockUpdateGuests}
					/>
			</MemoryRouter>
		);
		const guestNameInput = screen.getByPlaceholderText('Guest Name');
		const guestPhoneInput = screen.getByPlaceholderText('Phone (XXX-XXX-XXXX)')
		const submitButton = screen.getByText('Add To Guest List')
		const errorMessage = 'Phone Number Required'

		expect(submitButton).toBeInTheDocument();
		expect(guestNameInput).toBeInTheDocument();
		expect(guestPhoneInput).toBeInTheDocument();
		userEvent.type(guestNameInput, 'Jackles Monsoon')
		userEvent.type(guestPhoneInput, '')
		expect(guestNameInput).toHaveValue('Jackles Monsoon')
		expect(guestPhoneInput).toHaveValue('')
		userEvent.click(submitButton)
		expect(screen.getByText(errorMessage)).toBeInTheDocument()
	});

	// need to figure out how to type phone number
	// then can test if only phone number input is complete-name error message
})
