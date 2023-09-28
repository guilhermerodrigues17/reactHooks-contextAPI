import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1.png',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img2.png',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img3.png',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img4.png',
        },
        {
          userId: 5,
          id: 5,
          title: 'title 5',
          body: 'body 5',
          url: 'img5.png',
        },
        {
          userId: 6,
          id: 6,
          title: 'title 6',
          body: 'body 6',
          url: 'img6.png',
        },
        {
          userId: 7,
          id: 7,
          title: 'title 7',
          body: 'body 7',
          url: 'img7.png',
        },
        {
          userId: 8,
          id: 8,
          title: 'title 8',
          body: 'body 8',
          url: 'img8.png',
        },
        {
          userId: 9,
          id: 9,
          title: 'title 9',
          body: 'body 9',
          url: 'img9.png',
        },
        {
          userId: 10,
          id: 10,
          title: 'title 10',
          body: 'body 10',
          url: 'img10.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  test('should render search, posts and button in the document', async () => {
    render(<Home />);
    const notFound = screen.getByText('Not Found :(');

    expect.assertions(3);

    await waitForElementToBeRemoved(notFound);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const imagesPosts = screen.getAllByRole('img', { name: /title/i });
    expect(imagesPosts).toHaveLength(9);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  test('should search for posts', async () => {
    render(<Home />);
    const notFound = screen.getByText('Not Found :(');

    expect.assertions(12);

    await waitForElementToBeRemoved(notFound);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 6/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 9/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 10/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, 'title 3');
    });
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 6' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 9' })).not.toBeInTheDocument();

    act(() => {
      userEvent.clear(search);
    });
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 6/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 9/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 10/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, 'abcdefg');
    });
    expect(screen.getByText('Not Found :(')).toBeInTheDocument();
  });

  test('should render new posts when button is clicked', async () => {
    render(<Home />);
    const notFound = screen.getByText('Not Found :(');

    //expect.assertions(3);

    await waitForElementToBeRemoved(notFound);

    const button = screen.getByRole('button', { name: /load more posts/i });

    act(() => {
      userEvent.click(button);
    });
    expect(screen.getByRole('heading', { name: /title 10/i })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
