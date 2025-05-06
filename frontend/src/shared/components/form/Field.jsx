import { memo } from 'react';
import FormPlaceholder from './Placeholder';
import Input from '@shared/components/ui/inputs/Input';
import Textarea from '@shared/components/ui/inputs/Textarea';
import SearchInput from '@shared/components/ui/inputs/Search';
import { mergeCn } from '@shared/utils';

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

    const { placeholderClassName, ...restProps } = field;

    const commonProps = {
      ...restProps,
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
      )
    };

    let InputElement = Input;

    if (field.type === 'textarea') InputElement = Textarea;

    if (field.type === 'search') InputElement = SearchInput;

    return (
      <FormPlaceholder
        value={field.placeholder}
        className={`text-pr-main-soft bg-pr-bg-main ${placeholderClassName ?? ''}`}
      >
        {<InputElement {...commonProps} value={value ?? ''} onChange={handleChange} />}
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
