<script setup>
import BasicForm from '../components/BasicForm.vue'
import ModalWindow from '../components/ModalWindow.vue'
</script>

<template>
  <ModalWindow>
    <BasicForm>
      <template #header><h1>Вхід</h1></template>
      <template #content>
        <input type="email" class="form__email-field" placeholder="Ел. пошта" />
        <span class="form__error"></span>
        <input type="password" class="form__password-field" placeholder="Пароль" />
        <span class="form__error"></span>
      </template>
      <template #footer>
        <input type="submit" value="Увійти" class="form__submit-button" />
        <span>Вперше на сайті? <RouterLink to="/register">Зареєструватись</RouterLink></span>
      </template></BasicForm
    >
  </ModalWindow>
</template>
