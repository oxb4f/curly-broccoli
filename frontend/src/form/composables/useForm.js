import { reactive } from 'vue';

export function useForm(inputs) {
  inputs = reactive(inputs);

  const errors = reactive({ ...inputs });

  function clear(object) {
    for (const field of Object.keys(object)) {
      object[field] = '';
    }
  }

  function clearFields() {
    clear(inputs);
  }

  function clearErrors() {
    clear(errors);
  }

  function clearForm() {
    clearFields();
    clearErrors();
  }

  return {
    inputs,
    errors,
    clearFields,
    clearErrors,
    clearForm
  };
}
