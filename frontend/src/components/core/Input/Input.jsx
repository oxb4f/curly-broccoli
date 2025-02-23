import './Input.css';

const Input = ({ className = '', ...props }) => {
  return <input className={`input ${className}`} {...props} />;
};

export default Input;
