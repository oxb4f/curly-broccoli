const FormGroup = ({ className = '', children }) => {
  return <fieldset className={className}>{children}</fieldset>;
};

export default FormGroup;
