import './styles.css';
import p from 'prop-types';

export const TextInput = ({ searchValue = '', handleChange }) => {
  return (
    <input
      className="text-input"
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder="Type your search"
    />
  );
};

TextInput.propTypes = {
  searchValue: p.string,
  handleChange: p.func.isRequired,
};
