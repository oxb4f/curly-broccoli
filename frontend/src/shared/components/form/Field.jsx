import { memo } from 'react';
import Input from '@shared/components/ui/inputs/Input';
import Textarea from '@shared/components/ui/inputs/Textarea';
import SearchInput from '@shared/components/ui/inputs/Search';
import { mergeCn } from '@shared/utils';
import Select from '../ui/inputs/Select';
import FormHint from './Hint';

const FormField = memo(
  ({ field, hint, value, onChange }) => {
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
      className: mergeCn(
        `w-full h-10 px-2 rounded-md placeholder:opacity-0 
      ${
        field.type === 'textarea'
          ? 'py-2 border border-pr-main-mute bg-pr-bg-main hover:border-pr-main-soft focus:border-pr-main focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-bg-main focus:ring-pr-main-soft'
          : field.type === 'range'
          ? 'accent-pr-main cursor-pointer'
          : 'border border-pr-main-mute bg-pr-bg-main hover:border-pr-main-soft focus:border-pr-main focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-bg-main focus:ring-pr-main-soft'
      } `,
        field?.className ?? ''
      ),
      labelClassName: mergeCn('text-pr-main-soft bg-pr-bg-main', field?.labelClassName)
    };

    const InputElement =
      field.type === 'textarea'
        ? Textarea
        : field.type === 'search'
        ? SearchInput
        : field.type === 'select'
        ? Select
        : Input;

    console.log('hint.error', hint.error);

    return (
      <div className="w-full flex flex-col">
        <InputElement {...commonProps} value={value ?? ''} onChange={handleChange} />
        <FormHint
          value={hint.value}
          error={hint.error}
          isVisible={hint.isVisible}
          disabled={hint.disabled}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.hint.error === nextProps.hint.error &&
      prevProps.hint.isVisible === nextProps.hint.isVisible &&
      prevProps.hint.disabled === nextProps.hint.disabled &&
      prevProps.field.element === nextProps.field.element
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
