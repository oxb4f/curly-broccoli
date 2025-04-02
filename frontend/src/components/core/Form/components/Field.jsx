import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';
import { memo } from 'react';

const FormField = memo(
  ({ field, value, error, isSubmitDisabled, onFieldChange }) => {
    const handleChange = (event) => {
      field.onChange?.(event.target.value);
      onFieldChange(field.name, event.target.value);
    };

    if (field.element) {
      return (
        <field.element
          value={value ?? ''}
          error={error ?? ''}
          onChange={handleChange}
          {...field.args}
        >
          {field.args?.children}
        </field.element>
      );
    }

    const commonProps = {
      ...field,
      className: `w-full h-10 px-2 rounded-md ${
        field.type === 'submit'
          ? 'cursor-pointer font-bold bg-pr-main text-pr-bg-main enabled:hover:bg-pr-main-soft enabled:active:bg-pr-main-mute'
          : field.type === 'textarea'
          ? 'py-2 max-h-80 min-h-40 border border-pr-main-mute bg-pr-bg-main hover:border-pr-main-soft focus:border-pr-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-bg-main focus:ring-pr-main-soft'
          : field.type === 'range'
          ? 'accent-pr-main cursor-pointer'
          : 'border border-pr-main-mute bg-pr-bg-main hover:border-pr-main-soft focus:border-pr-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-bg-main focus:ring-pr-main-soft'
      } ${field?.className ?? ''}`
    };

    if (field.type === 'submit') {
      return <Input {...commonProps} disabled={isSubmitDisabled} />;
    }

    if (field.type === 'button') {
      return <Input {...commonProps} />;
    }

    if (field.type === 'textarea') {
      return <Textarea {...commonProps} value={value ?? ''} onChange={handleChange} />;
    }

    return (
      <Input {...commonProps} value={value ?? ''} error={error ?? ''} onChange={handleChange} />
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
