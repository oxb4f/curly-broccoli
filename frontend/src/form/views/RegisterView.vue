<script setup>
import BaseForm from '../components/BaseForm.vue';
import FormItem from '../components/FormItem.vue';
import FormInput from '../components/FormInput.vue';
import { useForm } from '../composables/useForm';
import BaseModal from '@app/components/BaseModal.vue';
// import ValidationError from '@app/services/customErrors/validationError';

const { inputs, errors, clearErrors } = useForm({ username: '', password: '' });

// async function _request(method, body = undefined) {
//   const response = await fetch('http://localhost:8080/users/', {
//     method: method,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: body
//   });

//   if (response.ok === true) {
//     clearErrors();
//     return await response.json();
//   } else {
//     const error = await response.json();
//     const validationError = ValidationError.from(error.error);

//     for (const field in errors) {
//       errors[field] = validationError.details[field];
//     }
//     // form.username.error = 'new CustomError(error.error.payload)';
//     // console.dir(errors);
//     // throw error;
//   }
// }
</script>

<template>
  <BaseModal>
    <template #content>
      <BaseForm>
        <template #header><h1>Реєстрація</h1></template>
        <template #content>
          <p>{{ inputs.username }}</p>
          <FormItem>
            <FormInput
              label="Вкажіть логін:"
              id="username"
              type="text"
              class="form__username-input"
              placeholder="Логін"
              v-model="inputs.username"
              :error="errors.username"
            />
          </FormItem>
          <FormItem>
            <FormInput
              label="Вкажіть пароль:"
              id="password"
              type="password"
              class="form__password-input"
              placeholder="Пароль"
              v-model="inputs.password"
              :error="errors.password"
            />
          </FormItem>
          <!-- <BaseFormField
            label="Вкажіть логін:"
            id="username"
            type="text"
            class="form__username-input"
            placeholder="Логін"
            v-model="inputs.username"
            :error="errors.username"
          /> -->
          <!-- <FormInputItem
            label="Вкажіть електронну пошту:"
            id="email"
            type="email"
            class="form__email-input"
            placeholder="Ел. пошта"
            error="Помилка"
          /> -->
          <!-- <BaseFormField
            label="Вкажіть пароль:"
            id="password"
            type="password"
            class="form__password-input"
            placeholder="Пароль"
            v-model="inputs.password"
            :error="errors.password"
          /> -->
        </template>
        <template #footer>
          <input
            type="submit"
            value="Зареєструватись"
            class="form__submit-button"
            @click="
              () => {
                _request('POST', JSON.stringify(inputs));
              }
            "
          />
        </template>
      </BaseForm>
    </template>
    <template #footer>
      <span>Вже є акаунт? <RouterLink class="link" to="/login">Увійти</RouterLink></span>
    </template>
  </BaseModal>
</template>
