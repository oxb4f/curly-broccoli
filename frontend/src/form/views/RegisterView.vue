<script setup>
import BasicForm from '../components/BasicForm.vue'
import ModalWindow from '../components/ModalWindow.vue'
</script>

<template>
  <ModalWindow>
    <BasicForm>
      <template #header><h1>Реєстрація</h1></template>
      <template #content>
        <input type="text" class="form__nickname-field" placeholder="Ваше ім'я" />
        <span class="form__error"></span>
        <input type="email" class="form__email-field" placeholder="Ел. пошта" />
        <span class="form__error"></span>
        <input type="password" class="form__password-field" placeholder="Пароль" />
        <span class="form__error"></span>
      </template>
      <template #footer>
        <input type="submit" value="Зареєструватись" class="form__submit-button" />
        <span>Вже є акаунт? <RouterLink to="/login">Увійти</RouterLink></span>
      </template>
    </BasicForm>
  </ModalWindow>
</template>
