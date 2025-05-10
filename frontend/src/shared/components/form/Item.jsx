import FormHint from './Hint';

const FormItem = ({ hint, error, isHintVisible, disableHint, children }) => {
  // FIXME: move hint
  return (
    <div className="w-full flex flex-col">
      {children}
      <FormHint value={hint} error={error} isVisible={isHintVisible} disable={disableHint} />
    </div>
  );
};

export default FormItem;
