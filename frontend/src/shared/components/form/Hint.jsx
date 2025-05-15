const FormHint = ({ value, error, isVisible, disabled }) => {
  if (disabled) return null;

  const key = error || (isVisible && value ? value : null);

  return (
    <small
      key={key}
      className={`w-full h-4 text-xs -z-10 animate-faded-slide-in-from-top-full ${
        error ? 'text-pr-error' : 'text-pr-text-darker'
      }`}
    >
      {key}
    </small>
  );
};

export default FormHint;
