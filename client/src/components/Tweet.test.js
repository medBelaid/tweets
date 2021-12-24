import { render, screen } from '@testing-library/react';
import Tweet from './Tweet';
import React from 'react';

describe('Tweet', () => {
    test('Tweet should display item', () => {
        const childItem = "tweet 1";
        render(<Tweet>{childItem}</Tweet>);
        const item = screen.getByText(/tweet 1/i);
        expect(item).toBeInTheDocument();
    });
});
