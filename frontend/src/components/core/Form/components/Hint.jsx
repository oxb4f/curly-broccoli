import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const FormHint = ({ value, inputValue, inputError }) => {
  const key = inputError || (!inputValue && value ? value : null);

  return (
    key && (
      <small
        key={key}
        className="absolute w-full h-4 left-0 -bottom-4 -z-10 animate-faded-slide-in-from-top-full"
      >
        {inputError ? <ErrorMessage message={inputError} /> : <span>{value}</span>}
      </small>
    )
  );
};

export default FormHint;
