import './Form.css';
import useReactiveForm from './hooks/useReactiveForm';
import FormFields from './components/Fields';

const Form = ({ fields, onSubmit, className = '', allFieldsRequired = false }) => {
  const { values, errors, isSubmitDisabled, handleChange, handleSubmit } = useReactiveForm(
    fields,
    onSubmit
  );

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit}>
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
