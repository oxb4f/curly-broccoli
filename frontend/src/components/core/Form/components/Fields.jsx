import FormField from './Field';
import FormGroup from './Group';

const FormFields = ({ fields, values, errors, isSubmitDisabled, onFieldChange }) => {
  return Object.entries(fields).map(([name, params]) => {
    if (typeof params === 'object' && !params.type && !params.element) {
      return (
        <FormGroup key={name}>
          {
            <FormFields
              fields={params}
              values={values}
              errors={errors}
              isSubmitDisabled={isSubmitDisabled}
              onFieldChange={onFieldChange}
            />
          }
        </FormGroup>
      );
    }

    return (
      <FormField
        key={name}
        field={{ name, ...params }}
        value={values[name]}
        error={errors[name]}
        isSubmitDisabled={isSubmitDisabled}
        onFieldChange={onFieldChange}
      />
    );
  });
};

export default FormFields;
