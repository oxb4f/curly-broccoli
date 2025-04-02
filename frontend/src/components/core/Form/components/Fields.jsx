import FormField from './Field';
import FormGroup from './Group';
import FormHint from './Hint';
import FormItem from './Item';

const FormFields = ({ fields, values, errors, isSubmitDisabled, onFieldChange }) => {
  return Object.entries(fields).map(([name, params]) => {
    if (params.fields) {
      return (
        <FormGroup key={name} className={params.className}>
          {
            <FormFields
              fields={params.fields}
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
      <FormItem key={name}>
        <FormField
          field={{ name, ...params }}
          value={values[name]}
          error={errors[name]}
          isSubmitDisabled={isSubmitDisabled}
          onFieldChange={onFieldChange}
        />
        <FormHint value={params.hint} inputValue={values[name]} inputError={errors[name]} />
      </FormItem>
    );
  });
};

export default FormFields;
