const { render, screen } = require('@testing-library/react');
const { Button } = require('.');
const { default: userEvent } = require('@testing-library/user-event');

const fn = jest.fn();

describe('<Button />', () => {
  test('should render de button with the text "Load more posts..."', () => {
    render(<Button children="Load more posts..." onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  test('should call a function on button click', () => {
    render(<Button children="Load more posts..." onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalled();
  });

  test('should be disabled when disabled is true', () => {
    render(<Button children="Load more posts..." disabled={true} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeDisabled();
  });

  test('should be enabled when disabled is false', () => {
    render(<Button children="Load more posts..." disabled={false} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeEnabled();
  });
});
