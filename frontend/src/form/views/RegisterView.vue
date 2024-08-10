<script setup>
import { reactive } from 'vue';
import BaseForm from '@form/components/BaseForm.vue';
import BaseInput from '@form/components/BaseInput.vue';
import BaseModal from '@form/components/BaseModal.vue';
import ValidationError from '@app/services/customErrors/validationError';

const form = reactive({
  username: '',
  password: ''
});

const errors = reactive({
  username: null,
  password: null
});

function clearErrors() {
  for (const field in errors) {
    errors[field] = null;
  }
}

async function _request(method, body = undefined) {
  const response = await fetch('http://localhost:8080/users/', {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  });

  if (response.ok === true) {
    clearErrors();
    return await response.json();
  } else {
    const error = await response.json();
    const validationError = ValidationError.from(error.error);

    for (const field in errors) {
      errors[field] = validationError.details[field];
    }
    // form.username.error = 'new CustomError(error.error.payload)';
    // console.dir(errors);
    // throw error;
  }
}
</script>

<template>
  <BaseModal>
    <template #content>
      <BaseForm>
        <template #header><h1>Реєстрація</h1></template>
        <template #content>
          <BaseInput
            label="Вкажіть ім'я:"
            id="username"
            type="text"
            class="form__username-field"
            placeholder="Ваше ім'я"
            v-model="form.username"
            :error="errors.username"
          />
          <!-- <FormInputItem
            label="Вкажіть електронну пошту:"
            id="email"
            type="email"
            class="form__email-field"
            placeholder="Ел. пошта"
            error="Помилка"
          /> -->
          <BaseInput
            label="Вкажіть пароль:"
            id="password"
            type="password"
            class="form__password-field"
            placeholder="Пароль"
            v-model="form.password"
            :error="errors.password"
          />
        </template>
        <template #footer>
          <input
            type="submit"
            value="Зареєструватись"
            class="form__submit-button"
            @click="
              () => {
                _request('POST', JSON.stringify(form));
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
