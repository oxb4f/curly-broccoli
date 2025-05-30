import useReactiveForm from './hooks/useReactiveForm';
import FormFields from './Fields';

const Form = ({ fields, onSubmit, className = '', allFieldsRequired = false }) => {
  const { values, errors, handleChange, handleSubmit } = useReactiveForm(fields, onSubmit);

  return (
    <form className={`min-w-64 ${className}`} onSubmit={handleSubmit}>
      <FormFields
        fields={fields}
        values={values}
        errors={errors}
        allFieldsRequired={allFieldsRequired}
        onFieldChange={handleChange}
      />
    </form>
  );
};

export default Form;
