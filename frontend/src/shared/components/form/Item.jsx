import FormHint from './Hint';

const FormItem = ({ hint, error, isHintVisible, children }) => {
  return (
    <div className="w-full flex flex-col">
      {children}
      <FormHint value={hint} error={error} isVisible={isHintVisible} />
    </div>
  );
};

export default FormItem;
