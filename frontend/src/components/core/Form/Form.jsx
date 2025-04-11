import useReactiveForm from './hooks/useReactiveForm';
import FormFields from './components/Fields';

const Form = ({ fields, onSubmit, className = '', allFieldsRequired = false }) => {
  const { values, errors, handleChange, handleSubmit } = useReactiveForm(fields, onSubmit);
  console.log(values);
  console.log(errors);

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
