import { render, screen, waitFor } from '@testing-library/react';
import { setupServer }from 'msw/node';
import { rest } from 'msw';
import List from './List';
import userEvent from '@testing-library/user-event';

const apiData = { 
    data:[
        {_id:"5e93b4a43af44260882e33b0",firstname:"Michael",lastname:"Scott",__v:0},
        {_id:"5e93b4f03af44260882e33b1",firstname:"Jim",lastname:"Halpert",__v:0},
  ]};

  const server = setupServer(
    rest.get('https://www.officeapi.dev/api/characters/', (req, res, ctx) => res(ctx.json(apiData)))
  );

  beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close);

describe('List', () => {

    it('renders a list of characters', async () => {
        render(
            <List />
        );
        const person = await screen.findByText('Jim Halpert');
        expect(person).toBeInTheDocument();
    })

    it('tests search function', async () => {
        render(
            <List />
        );
        await screen.findByText('Jim Halpert');

        const search = await screen.getByPlaceholderText('Search for a Character');
        userEvent.type(search, 'jim');


        return waitFor(() => {
            const result = screen.getByText('Jim Halpert');
            expect(result).toBeInTheDocument();
        })
    })
})
