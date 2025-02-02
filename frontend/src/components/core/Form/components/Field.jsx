import '../Form.css';
import FormItem from './Item';
import Input from '../../Input/Input';
import { useCallback, useMemo, memo } from 'react';

const FormField = memo(
  ({ field, isFragmented, value, error, isSubmitDisabled, onFieldChange }) => {
    if (field.element) {
      return <FormItem isFragmented={isFragmented}>{field.element}</FormItem>;
    }

    const handleChange = useCallback((event) => {
      field.onChange?.(event.target.value);
      onFieldChange(field.name, event.target.value);
    }, []);

    const commonProps = useMemo(
      () => ({
        ...field,
        className: `form__${field.type}-input form__input`
      }),
      [field]
    );

    if (field.type === 'submit') {
      return (
        <FormItem isFragmented={isFragmented}>
          <Input {...commonProps} disabled={isSubmitDisabled} />
        </FormItem>
      );
    }

    if (field.type === 'button') {
      return (
        <FormItem isFragmented={isFragmented}>
          <Input {...commonProps} />
        </FormItem>
      );
    }

    return (
      <FormItem isFragmented={isFragmented}>
        <Input {...commonProps} value={value ?? ''} error={error ?? ''} onChange={handleChange} />
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

export default FormField;
