import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return message && <span className="error">{message}</span>;
};

export default ErrorMessage;
