import FormButton from './Button';
import FormField from './Field';
import FormGroup from './Group';

const FormFields = ({ fields, values, errors, allFieldsRequired, onFieldChange }) => {
  return Object.entries(fields).map(([name, params]) => {
    if (params.fields) {
      return (
        <FormGroup key={name} className={params.className}>
          {
            <FormFields
              fields={params.fields}
              values={values}
              errors={errors}
              allFieldsRequired={allFieldsRequired}
              onFieldChange={onFieldChange}
            />
          }
        </FormGroup>
      );
    }

    const { hint, disableHint, ...fieldParams } = params;

    return fieldParams.type === 'submit' || fieldParams.type === 'button' ? (
      <FormButton
        key={name}
        button={{ name, ...fieldParams }}
        isDisabled={allFieldsRequired && Object.values(values).some((value) => !value)}
      />
    ) : (
      <FormField
        key={name}
        field={{ name, ...fieldParams }}
        hint={{
          value: hint,
          error: errors[name],
          isVisible: !values[name],
          disabled: disableHint
        }}
        value={values[name]}
        onChange={onFieldChange}
      />
    );
  });
};

export default FormFields;
