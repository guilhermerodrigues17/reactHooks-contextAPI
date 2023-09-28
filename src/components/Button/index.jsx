import p from 'prop-types';

export const Button = ({ text, onButtonClick, disabled = false }) => {
  return (
    <button onClick={onButtonClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: p.string.isRequired,
  onButtonClick: p.func.isRequired,
  disabled: p.bool,
};
