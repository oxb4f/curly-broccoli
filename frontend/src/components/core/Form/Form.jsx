import './Form.css';
import useReactiveForm from './hooks/useReactiveForm';
import { useImperativeHandle } from 'react';
import FormFields from './components/Fields';

const Form = ({ innerRef, fields, onSubmit, className = '', allFieldsRequired = false }) => {
  const { values, errors, isSubmitDisabled, handleChange, handleSubmit } = useReactiveForm(
    fields,
    onSubmit
  );

  useImperativeHandle(innerRef, () => ({
    getValues: () => values
  }));

  return (
    <form ref={innerRef} className={`form ${className}`} onSubmit={handleSubmit}>
      <FormFields
        fields={fields}
        values={values}
        errors={errors}
        isSubmitDisabled={allFieldsRequired && isSubmitDisabled}
        onFieldChange={handleChange}
      />
    </form>
  );
};

export default Form;
