import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const FormHint = ({ value, inputValue, inputError }) => {
  const key = inputError || (!inputValue && value ? value : null);

  return (
    key && (
      <small key={key} className="form__hint hint">
        {inputError ? <ErrorMessage message={inputError} /> : <span>{value}</span>}
      </small>
    )
  );
};

export default FormHint;
