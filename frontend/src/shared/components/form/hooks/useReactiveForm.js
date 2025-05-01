import { useState, useMemo, useCallback } from 'react';

const useReactiveForm = (fields, onSubmit) => {
  const flattenObject = useCallback(
    (object) =>
      Object.entries(object).reduce((result, [key, value]) => {
        if (value.type === 'submit' || value.type === 'button') return result;

        if (value.fields) {
          return {
            ...result,
            ...flattenObject(value.fields)
          };
        }

        if (value.type || value.element) {
          return {
            ...result,
            [key]: value.value ?? ''
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
    handleChange,
    handleSubmit,
    resetForm
  };
};

export default useReactiveForm;
