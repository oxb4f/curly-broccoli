import './Form.css';
import useReactiveForm from './hooks/useReactiveForm';
import { useImperativeHandle, useMemo } from 'react';
import FormField from './components/Field';

const Form = ({ innerRef, fields, onSubmit }) => {
  const getInitialValues = (fields) =>
    fields.flat().reduce((result, field) => {
      if (field.type !== 'submit' && field.type !== 'button' && !field.element) {
        result[field.name] = field.value ?? '';
      }
      return result;
    }, {});

  const initialValues = useMemo(() => getInitialValues(fields), []);

  const { values, errors, isSubmitDisabled, handleChange, handleSubmit } = useReactiveForm(
    initialValues,
    onSubmit
  );

  const renderFields = (fields, isFragmented = false) => {
    return fields.map((field) => {
      if (Array.isArray(field)) return renderFields(field, true);

      return (
        <FormField
          key={field.name}
          field={field}
          isFragmented={isFragmented}
          value={values[field.name]}
          error={errors[field.name]}
          isSubmitDisabled={isSubmitDisabled}
          onFieldChange={handleChange}
        />
      );
    });
  };

  useImperativeHandle(innerRef, () => ({
    getValues: () => values
  }));

  return (
    <form ref={innerRef} className="form" onSubmit={handleSubmit}>
      {renderFields(fields)}
    </form>
  );
};

export default Form;
