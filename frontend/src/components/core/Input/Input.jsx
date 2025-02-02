import './Input.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Input = ({ className, description, error, ...props }) => {
  return (
    <>
      <input className={`input ${className ?? ''}`} {...props} />
      <div className="input__description description">
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          !props?.value && description && <span>{description}</span>
        )}
      </div>
    </>
  );
};

export default Input;
