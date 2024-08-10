import { reactive } from 'vue';

export function useForm(fields) {
  fields = reactive(fields);

  const errors = reactive({ ...fields });

  function clear(object) {
    for (const field of Object.keys(object)) {
      object[field] = '';
    }
  }

  function clearFields() {
    clear(fields);
  }

  function clearErrors() {
    clear(errors);
  }

  function clearForm() {
    clearFields();
    clearErrors();
  }

  return {
    fields,
    errors,
    clearFields,
    clearErrors,
    clearForm
  };
}
