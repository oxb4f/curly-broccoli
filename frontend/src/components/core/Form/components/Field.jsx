import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';
import FormPlaceholder from './Placeholder';
import { memo } from 'react';

const FormField = memo(
  ({ field, value, onChange }) => {
    const handleChange = (event) => {
      field.onChange?.(event.target.value);
      onChange(field.name, event.target.value);
    };

    if (field.element) {
      return (
        <field.element value={value ?? ''} onChange={handleChange} {...field.props}>
          {field.props?.children}
        </field.element>
      );
    }

    const commonProps = {
      ...field,
      className: `peer w-full h-10 px-2 rounded-md placeholder:opacity-0 ${
        field.type === 'textarea'
          ? 'py-2 border border-pr-main-mute bg-pr-bg-main hover:border-pr-main-soft focus:border-pr-main focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-bg-main focus:ring-pr-main-soft'
          : field.type === 'range'
          ? 'accent-pr-main cursor-pointer'
          : 'border border-pr-main-mute bg-pr-bg-main hover:border-pr-main-soft focus:border-pr-main focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-bg-main focus:ring-pr-main-soft'
      } ${field?.className ?? ''}`
    };

    let inputElement = <Input {...commonProps} value={value ?? ''} onChange={handleChange} />;

    if (field.type === 'textarea')
      inputElement = <Textarea {...commonProps} value={value ?? ''} onChange={handleChange} />;

    return (
      <FormPlaceholder
        value={field.placeholder}
        className="text-pr-main-soft bg-pr-bg-main peer-focus:text-pr-main"
      >
        {inputElement}
      </FormPlaceholder>
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
