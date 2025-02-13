import { useState, useMemo, useCallback } from 'react';

const useReactiveForm = (fields, onSubmit) => {
  const flattenObject = useCallback(
    (object) =>
      Object.entries(object).reduce((result, [key, value]) => {
        if (value.element) return result;

        if (value && typeof value === 'object' && value.type) {
          return {
            ...result,
            [key]: value.value ?? ''
          };
        }

        if (value && typeof value === 'object') {
          return {
            ...result,
            ...flattenObject(value)
          };
        }

        return {
          ...result,
          [key]: value
        };
      }, {}),
    []
  );

  const initialValues = useMemo(() => flattenObject(fields), [flattenObject, fields]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const isSubmitDisabled = Object.values(values).some((value) => !value);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReject = (error) => {
    const errors = flattenObject({ ...(error?.details ?? {}) });
    setErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit(values);

      setErrors({});
    } catch (error) {
      handleReject(error);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
    resetForm
  };
};

export default useReactiveForm;
