import { render, screen } from '@testing-library/react';
import React from 'react';
import Spinner from './Spinner';

describe('Spinner', () => {
    test('spinner should have class lds-hourglass', () => {
        render(<Spinner />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        spinner.getAttribute("className", "lds-hourglass");
    });
});
