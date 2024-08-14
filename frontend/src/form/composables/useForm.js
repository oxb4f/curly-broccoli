import { reactive, computed } from 'vue';

export function useForm(inputs) {
  inputs = reactive(inputs);

  const errors = reactive({ ...inputs });

  const isSubmitDisabled = computed(() => {
    return Object.values(inputs).some((value) => {
      return !value;
    });
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
          console.log(error);

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
