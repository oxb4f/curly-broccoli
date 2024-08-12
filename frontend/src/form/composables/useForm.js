import { reactive, computed } from 'vue';

export function useForm(inputs) {
  inputs = reactive(inputs);

  const errors = reactive({ ...inputs });

  const isSubmitDisabled = computed(() => {
    for (const value of Object.values(inputs)) {
      if (value) return false;
    }
    return true;
  });

  function _clear(object) {
    for (const field of Object.keys(object)) {
      object[field] = '';
    }
  }

  function clearFields() {
    _clear(inputs);
  }

  function clearErrors() {
    _clear(errors);
  }

  function clearForm() {
    clearFields();
    clearErrors();
  }

  function submitForm(callback, inputs) {
    callback(inputs)
      .then(() => {
        clearErrors();
      })
      .catch((error) => {
        {
          for (const field in errors) {
            errors[field] = error.details[field];
          }
        }
      });
  }

  return {
    inputs,
    errors,
    isSubmitDisabled,
    clearFields,
    clearErrors,
    clearForm,
    submitForm
  };
}
