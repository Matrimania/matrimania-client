import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs';

import VendorDashboard from '../components/VendorDashboard/VendorDashboard';

describe('VendorDashboard', () => {
	it('should render the vendor dashboard', () => {
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();
		expect(screen.getByText('All')).toBeInTheDocument();
	});

	it('should allow the user to select a filter by option', () => {
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Henderson", email: "email@aol.com", date: "01/02/2022", image: "image.coolurl.com"}
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const filterAll = screen.getByText('All');
		const filterUpcoming = screen.getByText('Upcoming')
		const filterPast = screen.getByText('Past')
		const filterToday = screen.getByText('Today')

		userEvent.click(filterAll)
		expect(filterAll).toBeInTheDocument();

		userEvent.click(filterUpcoming)
		expect(filterUpcoming).toBeInTheDocument();

		userEvent.click(filterPast)
		expect(filterPast).toBeInTheDocument();

		userEvent.click(filterToday)
		expect(filterToday).toBeInTheDocument();
	});
	it('should allow the user to filter by upcoming weddings', () => {
		let currentDate = dayjs().format("MM/DD/YYYY")
		let upcomingDate = dayjs().add(7, 'day').format("MM/DD/YYYY")
		let pastDate = dayjs().subtract(7, 'day').format("MM/DD/YYYY")
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Anderson", email: "email@aol.com", date: currentDate, image: "image.coolurl.com"},
						{id: 2, name: "Berthoud", email: "email@aol.com", date: upcomingDate, image: "image.coolurl.com"},
						{id: 3, name: "Carter", email: "email@aol.com", date: pastDate, image: "image.coolurl.com"},
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const dropdown = screen.getByTestId('dropdown');
		const filterAll = dropdown.children[0];
		const filterUpcoming = dropdown.children[1];
		const filterPast = dropdown.children[2];
		const filterToday = dropdown.children[3];

		const wedding1 = screen.queryByText('Anderson Wedding')
		const wedding2 = screen.queryByText('Berthoud Wedding')
		const wedding3 = screen.queryByText('Carter Wedding')

		expect(filterAll).toBeInTheDocument();
		expect(filterUpcoming).toBeInTheDocument();
		expect(filterPast).toBeInTheDocument();
		expect(filterToday).toBeInTheDocument();

		userEvent.selectOptions(dropdown, "1")
		expect(wedding1).not.toBeInTheDocument();
		expect(wedding2).toBeInTheDocument();
		expect(wedding3).not.toBeInTheDocument();
	});
	it('should allow the user to filter by current weddings', () => {
		let currentDate = dayjs().format("MM/DD/YYYY")
		let upcomingDate = dayjs().add(7, 'day').format("MM/DD/YYYY")
		let pastDate = dayjs().subtract(7, 'day').format("MM/DD/YYYY")
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Anderson", email: "email@aol.com", date: currentDate, image: "image.coolurl.com"},
						{id: 2, name: "Berthoud", email: "email@aol.com", date: upcomingDate, image: "image.coolurl.com"},
						{id: 3, name: "Carter", email: "email@aol.com", date: pastDate, image: "image.coolurl.com"},
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const dropdown = screen.getByTestId('dropdown');
		const filterAll = dropdown.children[0];
		const filterUpcoming = dropdown.children[1];
		const filterPast = dropdown.children[2];
		const filterToday = dropdown.children[3];

		const wedding1 = screen.queryByText('Anderson Wedding')
		const wedding2 = screen.queryByText('Berthoud Wedding')
		const wedding3 = screen.queryByText('Carter Wedding')

		expect(filterAll).toBeInTheDocument();
		expect(filterUpcoming).toBeInTheDocument();
		expect(filterPast).toBeInTheDocument();
		expect(filterToday).toBeInTheDocument();

		userEvent.selectOptions(dropdown, "3")
		expect(wedding1).toBeInTheDocument();
		expect(wedding2).not.toBeInTheDocument();
		expect(wedding3).not.toBeInTheDocument();
	});
	it('should allow the user to filter by past weddings', () => {
		let currentDate = dayjs().format("MM/DD/YYYY")
		let upcomingDate = dayjs().add(7, 'day').format("MM/DD/YYYY")
		let pastDate = dayjs().subtract(7, 'day').format("MM/DD/YYYY")
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Anderson", email: "email@aol.com", date: currentDate, image: "image.coolurl.com"},
						{id: 2, name: "Berthoud", email: "email@aol.com", date: upcomingDate, image: "image.coolurl.com"},
						{id: 3, name: "Carter", email: "email@aol.com", date: pastDate, image: "image.coolurl.com"},
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const dropdown = screen.getByTestId('dropdown');
		const filterAll = dropdown.children[0];
		const filterUpcoming = dropdown.children[1];
		const filterPast = dropdown.children[2];
		const filterToday = dropdown.children[3];

		const wedding1 = screen.queryByText('Anderson Wedding')
		const wedding2 = screen.queryByText('Berthoud Wedding')
		const wedding3 = screen.queryByText('Carter Wedding')

		expect(filterAll).toBeInTheDocument();
		expect(filterUpcoming).toBeInTheDocument();
		expect(filterPast).toBeInTheDocument();
		expect(filterToday).toBeInTheDocument();

		userEvent.selectOptions(dropdown, "2")
		expect(wedding1).not.toBeInTheDocument();
		expect(wedding2).not.toBeInTheDocument();
		expect(wedding3).toBeInTheDocument();
	});
	it('should allow the user to filter by all weddings', () => {
		let currentDate = dayjs().format("MM/DD/YYYY")
		let upcomingDate = dayjs().add(7, 'day').format("MM/DD/YYYY")
		let pastDate = dayjs().subtract(7, 'day').format("MM/DD/YYYY")
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Anderson", email: "email@aol.com", date: currentDate, image: "image.coolurl.com"},
						{id: 2, name: "Berthoud", email: "email@aol.com", date: upcomingDate, image: "image.coolurl.com"},
						{id: 3, name: "Carter", email: "email@aol.com", date: pastDate, image: "image.coolurl.com"},
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const dropdown = screen.getByTestId('dropdown');
		const filterAll = dropdown.children[0];
		const filterUpcoming = dropdown.children[1];
		const filterPast = dropdown.children[2];
		const filterToday = dropdown.children[3];

		const wedding1 = screen.queryByText('Anderson Wedding')
		const wedding2 = screen.queryByText('Berthoud Wedding')
		const wedding3 = screen.queryByText('Carter Wedding')

		expect(filterAll).toBeInTheDocument();
		expect(filterUpcoming).toBeInTheDocument();
		expect(filterPast).toBeInTheDocument();
		expect(filterToday).toBeInTheDocument();

		userEvent.selectOptions(dropdown, "0")

		expect(wedding1).toBeInTheDocument();
		expect(wedding2).toBeInTheDocument();
		expect(wedding3).toBeInTheDocument();
	});
	it('should display an error image if no weddings are found', () => {
		let currentDate = dayjs().format("MM/DD/YYYY")
		let upcomingDate = dayjs().add(7, 'day').format("MM/DD/YYYY")
		let pastDate = dayjs().subtract(7, 'day').format("MM/DD/YYYY")
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const dropdown = screen.getByTestId('dropdown');
		const filterAll = dropdown.children[0];
		const filterUpcoming = dropdown.children[1];
		const filterPast = dropdown.children[2];
		const filterToday = dropdown.children[3];

		const noWeddingsImg = screen.getByAltText('No weddings in storage')

		expect(noWeddingsImg).toBeInTheDocument();
	});
	it('should display an error image if no weddings match a filter', () => {
		let currentDate = dayjs().format("MM/DD/YYYY")
		render(
			<MemoryRouter>
				<VendorDashboard
					weddings={[
						{id: 1, name: "Anderson", email: "email@aol.com", date: currentDate, image: "image.coolurl.com"},
					]}
				/>
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const dropdown = screen.getByTestId('dropdown');
		const filterAll = dropdown.children[0];
		const filterUpcoming = dropdown.children[1];
		const filterPast = dropdown.children[2];
		const filterToday = dropdown.children[3];

		const wedding1 = screen.queryByText('Anderson Wedding')
		const noPastImg = screen.queryByAltText('Anderson Wedding')

		expect(filterAll).toBeInTheDocument();
		expect(filterUpcoming).toBeInTheDocument();
		expect(filterPast).toBeInTheDocument();
		expect(filterToday).toBeInTheDocument();

		userEvent.selectOptions(dropdown, "1")
		expect(screen.getByAltText('No Upcoming Weddings To Show')).toBeInTheDocument();

		userEvent.selectOptions(dropdown, "2")
		expect(screen.getByAltText('No Past Weddings To Show')).toBeInTheDocument();
	});
})
