<script setup>
import BasicForm from '../components/BasicForm.vue';
import FormInputItem from '../components/FormInputItem.vue';
import ModalWindow from '../components/ModalWindow.vue';

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
    return await response.json();
  } else {
    console.log(error);

    const error = await response.json();
    throw error;
  }
}

_request('POST', {
  username: '',
  password: ''
});
</script>

<template>
  <ModalWindow>
    <template #content>
      <BasicForm>
        <template #header><h1>Реєстрація</h1></template>
        <template #content>
          <FormInputItem
            label="Вкажіть ім'я:"
            id="username"
            type="text"
            class="form__username-field"
            placeholder="Ваше ім'я"
            error="Помилка"
          />
          <FormInputItem
            label="Вкажіть електронну пошту:"
            id="email"
            type="email"
            class="form__email-field"
            placeholder="Ел. пошта"
            error="Помилка"
          />
          <FormInputItem
            label="Вкажіть пароль:"
            id="password"
            type="password"
            class="form__password-field"
            placeholder="Пароль"
            error="Помилка"
          />
        </template>
        <template #footer>
          <input type="submit" value="Зареєструватись" class="form__submit-button" />
        </template>
      </BasicForm>
    </template>
    <template #footer>
      <span>Вже є акаунт? <RouterLink class="link" to="/login">Увійти</RouterLink></span>
    </template>
  </ModalWindow>
</template>
