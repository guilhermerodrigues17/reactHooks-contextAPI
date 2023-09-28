import './styles.css';

import p from 'prop-types';

export const Button = ({ onClick, children, disabled = false }) => {
  return (
    <button onClick={onClick} className="btn" disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: p.func.isRequired,
  children: p.node.isRequired,
  disabled: p.bool,
};
