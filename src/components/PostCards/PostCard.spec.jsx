import { render, screen } from '@testing-library/react';
import { PostCards } from '.';

const mock = {
  title: 'title 1',
  body: 'body 1',
  cover: 'img/img.png',
};

describe('<PostCard />', () => {
  test('should be rendered correctly', () => {
    render(<PostCards {...mock} />);

    expect(screen.getByRole('img', { name: mock.title })).toHaveAttribute('src', mock.cover);
    expect(screen.getByRole('heading', { name: mock.title })).toBeInTheDocument();
    expect(screen.getByText(mock.body)).toBeInTheDocument();
  });

  test('should match snapshot', () => {
    const { container } = render(<PostCards {...mock} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
