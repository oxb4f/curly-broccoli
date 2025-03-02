import '../Form.css';
import FormItem from './Item';
import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';
import FormHint from './Hint';
import { memo } from 'react';

const FormField = memo(
  ({ field, value, error, isSubmitDisabled, onFieldChange }) => {
    const handleChange = (event) => {
      field.onChange?.(event.target.value);
      onFieldChange(field.name, event.target.value);
    };

    if (field.element) {
      return (
        <FormItem>
          {<field.element value={value ?? ''} error={error ?? ''} onChange={handleChange} />}
        </FormItem>
      );
    }

    const commonProps = {
      ...field,
      className: `form__input form__input_${field.type}`
    };

    if (field.type === 'submit') {
      return (
        <FormItem>
          <Input {...commonProps} disabled={isSubmitDisabled} />
        </FormItem>
      );
    }

    if (field.type === 'button') {
      return (
        <FormItem>
          <Input {...commonProps} />
        </FormItem>
      );
    }

    if (field.type === 'textarea') {
      return (
        <FormItem>
          <Textarea {...commonProps} value={value ?? ''} onChange={handleChange} />
        </FormItem>
      );
    }

    return (
      <FormItem>
        <Input {...commonProps} value={value ?? ''} error={error ?? ''} onChange={handleChange} />
        <FormHint value={field.hint} inputValue={value} inputError={error} />
      </FormItem>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.error === nextProps.error &&
      prevProps.isSubmitDisabled === nextProps.isSubmitDisabled &&
      prevProps.field.element === nextProps.field.element
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
