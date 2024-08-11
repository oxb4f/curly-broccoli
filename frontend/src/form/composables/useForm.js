import { reactive } from 'vue';

export function useForm(inputs) {
  inputs = reactive(inputs);

  const errors = reactive({ ...inputs });

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
    clearFields,
    clearErrors,
    clearForm,
    submitForm
  };
}
