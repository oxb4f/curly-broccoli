const ErrorMessage = ({ message }) => {
  return message && <span className="text-pr-error">{message}</span>;
};

export default ErrorMessage;
