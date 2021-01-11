import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Checkbox from '../components/Checkbox/Checkbox';

describe('Checkbox', () => {
	it('should display checkboxes next to a guest', () => {
		render(
			<Checkbox
				name={'Mayer Hawthorne'}
				isChecked={false}
				toggleCheckMark={jest.fn()}
			/>
		);

		const checkbox = screen.getByRole('checkbox')
		expect(checkbox).toBeInTheDocument();
	});
});