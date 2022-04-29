import { render, screen } from '@testing-library/react';
import List from './List';

describe('List', () => {

    it('renders a list of characters', async () => {
        render(
            <List />
        );
        const person = await screen.findByText('Jim Halpert');
        expect(person).toBeInTheDocument();
    })
})
