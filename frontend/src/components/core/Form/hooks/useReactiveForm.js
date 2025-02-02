import { useState } from 'react';

const useReactiveForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const isSubmitDisabled = Object.values(values).some((value) => !value);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReject = (error) => {
    setErrors({ ...(error?.details ?? {}) });
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
