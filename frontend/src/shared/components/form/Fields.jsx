import FormButton from './Button';
import FormField from './Field';
import FormGroup from './Group';
import FormItem from './Item';

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

    return params.type === 'submit' || params.type === 'button' ? (
      <FormButton
        key={name}
        button={{ name, ...params }}
        isDisabled={allFieldsRequired && Object.values(values).some((value) => !value)}
      />
    ) : (
      <FormItem
        key={name}
        hint={params.hint}
        error={errors[name]}
        isHintVisible={!values[name]}
        disableHint={params.disableHint}
      >
        <FormField field={{ name, ...params }} value={values[name]} onChange={onFieldChange} />
      </FormItem>
    );
  });
};

export default FormFields;
